const { catchedAsync, response } = require('../utils/err')
import { connect, OpenAIEmbeddingFunction } from 'vectordb'

import { OpenAIStream, StreamingTextResponse } from 'ai'
import { Configuration, OpenAIApi } from 'openai-edge'
import { createPrompt } from './prompt'



const { connect, OpenAIEmbeddingFunction } = require('vectordb');
const { getDomObjects } = require('./scrape');
const crypto = require('crypto');


// You need to provide an OpenAI API key, here we read it from the OPENAI_API_KEY environment variable
const apiKey = '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'



// Create an OpenAI API client (that's edge friendly!)
const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
})
const openai = new OpenAIApi(config)

// IMPORTANT! Set the runtime to edge
export const runtime = 'edge'


async function retreiveContext(req, res) {
  const db = await connect('/tmp/website-lancedb')
  // The embedding function will create embeddings for the 'context' column
  const embedFunction = new OpenAIEmbeddingFunction('context', apiKey)
  const tbl = await db.openTable(table, embedFunction)
  console.log('Query: ', query)

  // return await tbl
  const data = await tbl
    .search(query)
    .select(['link', 'text', 'context'])
    .limit(3)
    .execute()

  response(res, 200, { data: data })
}


async function createEmbeddingsTable(req, res) {

  const { url, pages } = req.body;


  const db = await connect('/tmp/website-lancedb');
  const apiKey = process.env.OPENAI_API_KEY || '';

  const randomBytes = crypto.randomBytes(10);
  const hash = crypto.createHash('sha256').update(randomBytes).digest('hex');

  const embedFunction = new OpenAIEmbeddingFunction('context', apiKey);
  const data = contextualize(await getDomObjects(url, pages), 5, 'link');
  const batchSize = 500;
  console.log('Vectors inserted: ', data.slice(0, Math.min(batchSize, data.length)).length);
  const tbl = await db.createTable(`website-${hash}`, data.slice(0, Math.min(batchSize, data.length)), embedFunction);
  for (let i = batchSize; i < data.length; i += batchSize) {
    await tbl.add(data.slice(i, Math.min(i + batchSize, data.length)));
  }


  // return tbl.name;
  response(res, 200, { name: tbl.name })
}

function contextualize(rows, contextSize, groupColumn) {
  const grouped = {};
  rows.forEach(row => {
    if (!grouped[row[groupColumn]]) {
      grouped[row[groupColumn]] = [];
    }
    grouped[row[groupColumn]].push(row);
  });

  const data = [];
  Object.keys(grouped).forEach(key => {
    for (let i = 0; i < grouped[key].length; i++) {
      const start = i - contextSize > 0 ? i - contextSize : 0;
      grouped[key][i].context = grouped[key].slice(start, i + 1).map(r => r.text).join(' ');
    }
    data.push(...grouped[key]);
  });
  return data;
}





export function createPrompt(query, context) {
  let prompt =
    'The context that follows is pulled from a website. Respond based on the website information below, acting as an agent guiding someone through the website.\n\n' +
    'Context:\n'

  // need to make sure our prompt is not larger than max size
  prompt = prompt + context.map(c => c.context).join('\n\n---\n\n').substring(0, 3750)
  prompt = prompt + `\n\nQuestion: ${query}\nAnswer:`
  return prompt
}




async function chatStream(req, res) {
  // Extract the `messages` from the body of the request
  const { messages, table } = req.body

  const baseUrl = process.env.VERCEL_URL ? 'https://' + process.env.VERCEL_URL : 'http://localhost:3000'
  const context = await fetch(`${baseUrl}/api/retrieve`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query: messages[messages.length - 1].content, table })
  })
  // messages[messages.length - 1].content = createPrompt(messages[messages.length - 1].content, (await context.json()) as EntryWithContext[])
  // Ask OpenAI for a streaming chat completion given the prompt
  const response = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    stream: true,
    messages
  })
  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response)
  // Respond with the stream
  //  return new StreamingTextResponse(stream)
  const data = new StreamingTextResponse(stream)

  response(res, 200, { data: data })
}


module.exports = {
  chatStream: catchedAsync(chatStream),
  retreiveContext: catchedAsync(retreiveContext),
  createEmbeddingsTable: catchedAsync(createEmbeddingsTable)
}