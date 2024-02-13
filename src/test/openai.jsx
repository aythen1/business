import OpenAI from 'openai';


const token = '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'

export const useOpenAI = async () => {
//   const config = new Configuration({
//     apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
//   })

try{
    
      const config = {
        apiKey: token, // This is the default and can be omitted
        dangerouslyAllowBrowser: true 
      };
    //   const chatCompletion = await openai.chat.completions.create({
    //     messages: [{ role: 'user', content: 'Say this is a test' }],
    //     model: 'gpt-3.5-turbo',
    //   });
    
      return new OpenAI(config)

}catch(err){
    console.log('err', err)
}
}

