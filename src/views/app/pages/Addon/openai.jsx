import OpenAI from 'openai';

// const token = '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'

export const useOpenAI = async () => {
  
  try {
    let token = localStorage.getItem('token-gpt')
    if(!token) throw false

    const config = {
      apiKey: token, // This is the default and can be omitted
      dangerouslyAllowBrowser: true
    };

    return new OpenAI(config)

  } catch (err) {
    console.log('err', err)
  }
}

