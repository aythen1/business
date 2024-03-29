// import { Edge, Node } from "reactflow"
// import { IChat } from "type"


export const nodeChainTransformer = (
  nodes,
  edges,
  targetNodeId
) => {
  const chain = []
  const incomingEdges = edges.reduce((map, edge) => {
    if (!map.has(edge.target)) {
      map.set(edge.target, [])
    }
    map.get(edge.target).push(edge)
    return map
  }, new Map())
  let currentNodes = [nodes.find((node) => node.id === targetNodeId)]
  while (currentNodes.length > 0) {
    const nextNodes = []
    for (const currentNode of currentNodes) {
      const { question, answer } = currentNode?.data ?? {}
      if (answer !== undefined) {
        chain.push({
          content: answer,
          role: "assistant",
        })
      }
      if (question !== undefined) {
        chain.push({
          content: question,
          role: "user",
        })
      }
      const incoming = incomingEdges.get(currentNode?.id)
      if (incoming) {
        for (const edge of incoming) {
          const sourceNode = nodes.find((node) => node.id === edge.source)
          if (sourceNode) {
            nextNodes.push(sourceNode)
          }
        }
      }
    }
    currentNodes = nextNodes
  }
  return chain.reverse()
}

export const askAI = async (
  messages,
  question
) => {
  const openai = useOpenAI()

  let response = ""

  await openai
    .createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [...messages, { content: question, role: "user" }],
    })
    .then((res) => {
      response =
        res.data.choices.map((choice) => choice.message)[0]?.content ?? ""
    })
    .catch((err) => {
      console.error(err)
    })

  return response
}