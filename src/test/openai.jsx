import OpenAI from 'openai';


const token = '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'

export const useOpenAI = async () => {
  //   const config = new Configuration({
  //     apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  //   })

  try {

    const config = {
      apiKey: token, // This is the default and can be omitted
      dangerouslyAllowBrowser: true
    };
    //   const chatCompletion = await openai.chat.completions.create({
    //     messages: [{ role: 'user', content: 'Say this is a test' }],
    //     model: 'gpt-3.5-turbo',
    //   });

    return new OpenAI(config)

  } catch (err) {
    console.log('err', err)
  }
}

