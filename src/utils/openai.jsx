import OpenAI from 'openai';

const token = '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'

export const useOpenAI = async () => {
  try {

    const config = {
      apiKey: token, 
      dangerouslyAllowBrowser: true
    };

    return new OpenAI(config)

  } catch (err) {
    console.log('err', err)
  }
}

