import OpenAI from 'openai';

export const useOpenAI = async () => {
  
  try {
    let token = localStorage.getItem('token-gpt')
    if(!token) throw false

    const config = {
      apiKey: token, 
      dangerouslyAllowBrowser: true
    };

    return new OpenAI(config)

  } catch (err) {
    console.log('err', err)
  }
}

