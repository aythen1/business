import { PromptTemplate } from 'langchain/prompts'
import { OpenAI } from 'langchain/llms'
import { LLMChain } from 'langchain/chains'

const template = 'What sound does the {animal} make?'
const prompt = new PromptTemplate({
  template,
  inputVariables: ['animal']
})

const llm = new OpenAI()

const chain = new LLMChain({ llm, prompt })

const response = await chain.call({ animal: 'cat' })
console.log({ response })

// const embedder = new OpenAIEmbeddings({
//   modelName: 'gpt-3.5-turbo'
// })

// const documents = await Promise.all(
//   pages.map((row) => {
//     const splitter = new RecursiveCharacterTextSplitter({
//       chunkSize: 300,
//       chunkOverlap: 20
//     })
//     const docs = splitter.splitDocuments([
//       new Document({
//         pageContent: row.text,
//         metadata: {
//           url: row.url,
//           text: truncateStringByBytes(row.text, 35000)
//         }
//       })
//     ])
//     return docs
//   })
// )

// const limiter = new Bottleneck({
//   minTime: 50
// })

// const rateLimitedGetEmbedding = limiter.wrap(getEmbedding)

// vectors =
//   (await Promise.all(
//     documents.flat().map((doc) => rateLimitedGetEmbedding(doc))
//   )) instanceof Promise
//     ? await Promise.all(
//         documents.flat().map((doc) => rateLimitedGetEmbedding(doc))
//       )
//     : rateLimitedGetEmbedding(documents.flat())

// /*upserting*/
// const sliceIntoChunks = ({ arr = [], chunkSize }) => {
//   const res = []
//   for (let i = 0; i < arr.length; i += chunkSize) {
//     const chunk = arr.slice(i, i + chunkSize)
//     res.push(chunk)
//   }
//   return res
// }

// const chunks = sliceIntoChunks(vectors, 10)

// await Promise.all(
//   chunks.map(async (chunk) => {
//     await index.upsert({
//       upsertRequest: {
//         vectors: chunk
//       }
//     })
//   })
// )

/* db */

//   public async addEntry({ entry, speaker }: { entry: string, speaker: string }) {
//     try {
//       await sequelize.query(`INSERT INTO conversations (user_id, entry, speaker) VALUES (?, ?, ?) ON CONFLICT (created_at) DO NOTHING`, {
//         replacements: [this.userId, entry, speaker],
//       });
//     } catch (e) {
//       console.log(`Error adding entry: ${e}`)
//     }
//   }

//   public async getConversation({ limit }: { limit: number }): Promise<string[]> {
//     const conversation = await sequelize.query(`SELECT entry, speaker, created_at FROM conversations WHERE user_id = '${this.userId}' ORDER By created_at DESC LIMIT ${limit}`);
//     const history = conversation[0] as ConversationLogEntry[]

//     return history.map((entry) => {
//       return `${entry.speaker.toUpperCase()}: ${entry.entry}`
//     }).reverse()
//   }

/* afinando la consulta */

// const templates_inquirerTemplate = `Given the following user prompt and conversation log, formulate a question that would be the most relevant to provide the user with an answer from a knowledge base.
//   You should follow the following rules when generating and answer:
//   - Always prioritize the user prompt over the conversation log.
//   - Ignore any conversation log that is not directly related to the user prompt.
//   - Only attempt to answer if a question was posed.
//   - The question should be a single sentence.
//   - You should remove any punctuation from the question.
//   - You should remove any words that are not relevant to the question.
//   - If you are unable to formulate a question, respond with the same USER PROMPT you got.

//   USER PROMPT: {userPrompt}

//   CONVERSATION LOG: {conversationHistory}

//   Final answer:`

// /*crear cadena*/

// const inquiryChain = new LLMChain({
//   llm,
//   prompt: new PromptTemplate({
//     template: templates_inquirerTemplate,
//     inputVariables: ['userPrompt', 'conversationHistory']
//   })
// })
// const inquirerChainResult = await inquiryChain.call({
//   userPrompt: prompt,
//   conversationHistory
// })

// const inquiry = inquirerChainResult.text

// /*Incrustar la cadena*/

// const embedder = new OpenAIEmbeddings({
//   modelName: 'text-embedding-ada-002'
// })

// const embeddings = await embedder.embedQuery(inquiry)

// /*metadata */
// const getMatchesFromEmbeddings = async (embeddings, pinecone, topK) => {
//   const index = pinecone.Index('crawler')
//   const queryRequest = {
//     vector: embeddings,
//     topK,
//     includeMetadata: true
//   }

//   try {
//     const queryResult = await index.query({
//       queryRequest
//     })

//     return (
//       queryResult.matches?.map((match) => ({
//         ...match,
//         metadata: match.metadata
//       })) || []
//     )
//   } catch (e) {
//     console.log('Error querying embeddings: ', e)
//     throw new Error(`Error querying embeddings: ${e}`)
//   }
// }

// /*resumidor */

// const summarizeLongDocument = async (document, inquiry, onSummaryDone) => {
//   try {
//     if (document.length > 3000) {
//       const chunks = chunkSubstr(document, 4000)
//       let summarizedChunks = []

//       for (const chunk of chunks) {
//         const result = await summarize(chunk, inquiry, onSummaryDone)
//         summarizedChunks.push(result)
//       }

//       const result = summarizedChunks.join('\n')

//       if (result.length > 4000) {
//         return await summarizeLongDocument(result, inquiry, onSummaryDone)
//       } else {
//         return result
//       }
//     } else {
//       return document
//     }
//   } catch (e) {
//     throw new Error(e)
//   }
// }

// const summarize = async (document, inquiry, onSummaryDone) => {
//   const chain = new LLMChain({
//     prompt: promptTemplate,
//     llm
//   })

//   try {
//     const result = await chain.call({
//       prompt: promptTemplate,
//       document,
//       inquiry
//     })

//     onSummaryDone(result.text)
//     return result.text
//   } catch (e) {
//     console.log(e)
//   }
// }

// /*final */

// //   `Shorten the text in the CONTENT, attempting to answer the INQUIRY. You should follow the following rules when generating the summary:
// //   - Any code found in the CONTENT should ALWAYS be preserved in the summary, unchanged.
// //   - Code will be surrounded by backticks (\`) or triple backticks (\`\`\`).
// //   - Summary should include code examples that are relevant to the INQUIRY, based on the content. Do not make up any code examples on your own.

// //   - If the INQUIRY cannot be answered, the final answer should be empty.
// //   - The summary should be under 4000 characters.

// //   INQUIRY: {inquiry}
// //   CONTENT: {document}

// //   Final answer:
// //   `;

// /*callbackmanager */

// // const chat = new ChatOpenAI({
// //   streaming: true,
// //   verbose: true,
// //   modelName: 'gpt-3.5-turbo',

// //   callbackManager: CallbackManager.fromHandlers({
// //     async handleLLMNewToken(token) {
// //       // stream the token to the user
// //       console.log('websocket connected')
// //     }
// //   })
// // })

// /* actualizar */

// const updateChatbotMessage = (conversation, message) => {
//   const interactionId = message.data.interactionId

//   const updatedConversation = conversation.reduce(
//     (acc, e) => [
//       ...acc,
//       e.id === interactionId
//         ? { ...e, message: e.message + message.data.token }
//         : e
//     ],
//     []
//   )

//   return conversation.some((e) => e.id === interactionId)
//     ? updatedConversation
//     : [
//         ...updatedConversation,
//         {
//           id: interactionId,
//           message: message.data.token,
//           speaker: 'bot',
//           date: new Date()
//         }
//       ]
// }

// /*Actualizar bot*/

// const submit = async () => {
//   setConversation((state) => [
//     ...state,
//     {
//       message: text,
//       speaker: 'user',
//       date: new Date()
//     }
//   ])
//   try {
//     setBotIsTyping(true)
//     const response = await fetch('/api/chat', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({ prompt: text, userId: visitorData?.visitorId })
//     })

//     await response.json()
//   } catch (error) {
//     console.error('Error submitting message:', error)
//   } finally {
//     setBotIsTyping(false)
//   }
//   setText('')
// }
