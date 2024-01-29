const listItem = [{
    title: `Code documentation Q&A bot with LangChain`,
    description: `use LanceDB's LangChain integration to build
a Q&A bot for your documentation`
}, {
    title: `Image multimodal search`,
    description: `Search through an image dataset using natural 
    language, full text and SQL`
}, {
    title: `Serverless LanceDB`,
    description: `Store your data on S3 and use Lambda to compute
    embeddings and retrieve queris in production easly`
}, {
    title: `Serverless QA Bot with Modal and LangChain`,
    description: `use LanceDB's LangChain integration with Modal to run 
    a serverless app`
}, {
    title: `Vector embedding search using TransformersJS`,
    description: `Embed and query data from LanceDB using TransformerJS`
}, {
    title: `Youtube transcript search`,
    description: `Search through youtube transcripts using natural language
    with LanceDB`
}, {
    title: `Youtube QA bot with NodeJS`,
    description: `Use LanceDB's Javascript API and OpenAI to build a QA
    bot for Youtube transcripts`
}]


export const Template = () => {
    return (
        <div>
            {listItem.map((item, index) => {
                
                return (
                    <div key={index}>
                        <h3>{item.title}</h3>
                        <p>{item.description}</p>
                    </div>
                )
            })}

        </div>
    )
}




export const HelloWorld =  () => {
    return (
        <div>
            INEFIWI
        </div>
    )
}