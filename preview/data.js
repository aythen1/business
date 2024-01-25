/*
Langchain (python | javascript)

- Appliction (chains, agents, executors)

- Integrations (models, retrieval, agent tooling)

* models I/O
Model, Prompt, Example Selector, Output Parser

* retrieval
Retriever, Document Loader, Vector Store, Text Split, Embeding Model

* protocol (LCEL)
Parallelization, Fellbacks, Tracing, Batching, Straming, Async, Compoisiton



Lenguaje de expresión LangChain (LCEL)

LCEL, es una forma declarativa de componer cadenas fácilmente. Permite interactuar con cadenas simples y cadenas permitiendo
añadir cientos de pasos en producción. Estas sona algunas de las formas de integración.

Soporte de transmisión: Cuando construyes tus cadenas con LCEL, obtienes el mejor tiempo posible para generar el primer token 
(tiempo transcurrido hasta que sale el primer fragmento de salida). Transmitimos tokens directamente desde un LLM a una nalizador 
de salida de streaming, y obtenemos fragmentos de salida analizados al mismo ritmo que el proveedor de LLM genera los tokens sin procesar.

Soporte asíncrono: Cualquier cadena creada con LCEL puede llamar tanto con la API asincrona/sincrona. Esto permite utilizar el mismo código
para prototipos y en producción, con un gran rendimiento y la capacidad de manejar muchas solicitudes simultáneas en el mismo servidor.

Ejecución paralela optimizada: Siempe que sus cadenas LCEL tengan pasos que se pueden ejecutar en paralelo, se hace automaticamente, tanto 
en las interfaces de transmision para reintentos/alternaciones, para que pueda obtener confiabilidad adicional sin coste en latencia.

Acceder a resultados intermedios: Para cxadaneas más complejas, suele ser muy útil acceder a los resultados de los pasos intermedios
incuso antes de que se produzca el resultado final. Esto se peue utilizar para informario a los usuarios finales que algo
está sucediendo o incluso simplemente depurar una cade.a

Esquemas de entrada y salida: Los esquemas de entrada y salida proporcionan a cada cadena LCEL esuqemas Pydanti y JSONSchemna inferios de
la estructura de su cadena. Esto se puede utilizar para la validación de entradas y salidas.

Integración perfecta del seguimiento LangSmith: A medida que sus cadenas dse vuelven cada vez más complejas, resulta cada vez más importante comprender
qué sucede exactamente en cada paso. Con LCEL, todos los pasos de entradas y salidas es una parte integral.

Integración perfecta del seguimient de LangSmith: A medida que sus cadenas se vuelven acada vez más complejas, resulta cada vez más importante
comprender qué sucede exactamente en cada paso. Todos los pasos se registran automáticamente para una máxima observabiliad y depuración.

INTERFAZ

stream: transmite fragmentos de la respuesta
invoke: llama a la cadena en una entrada
batch: llama a la cadena en una lista de entradas

Métodos asíncronos.

asteam: tranmisite fragmentos de la respuesta asíncrona
ainvoke: llama a la cadena a entrada asíncrona
abatch: llama a la cadena en una lista de entradas asíncronas
astream_log: transmite los pasos intermedios a medida que ocurren.







*/