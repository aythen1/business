import React, { useState, useEffect } from 'react'

import MonacoEditor from './MonacoEditor'


const LibraryModel = ({ }) => {

    const [dimensions, setDimensions] = useState([])
    const [logs, setLogs] = useState([])
    const [dependencies, setDependencies] = useState([])
    const [codes, setCodes] = useState([])

    return (
        <div>
            En library Model vamos a poder crear tiempos para leer toda esa información
            y ordernar en código, dimension y version todo el model.
            <div>
                <div>
                    Poder ver las dimensiones del vector poder buscar aqui que recursos hay y
                    en que posición están
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" />
                        </svg>
                        <input
                            type="text"
                        />
                        <ul>
                            {dimensions.map((dimension, index) => (
                                <li key={index}> 
                                    Este es el vector
                                    20kb
                                    Usar
                                    delete
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div>
                    <div>
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" />
                            </svg>
                            <input
                                type="text"
                            />
                            <ul>
                                <li>
                                    Este es el vector
                                </li>
                            </ul>
                        </div>
                        <ul>
                            {logs.map((log, index) => (
                                <li key={index}>
                                    Este es el log1
                                    hace 12 minutos

                                    Editar y cambiar
                                    1x1
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div>
                    <div>
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" />
                            </svg>
                            <input
                                type="text"
                            />
                        </div>
                        <ul>
                            {dependencies.map((dependencie, index) => (
                                <li key={index}>
                                    Dependeneica1
                                    20bkb
                                    usando
                                    no usando
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div>
                    <ul>
                        {codes.map((code, index) => (
                            <li key={index}>
                                #32451 conectado
                                Codigo 1
                                hace 2
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div>
                <MonacoEditor />
            </div>
        </div>
    )
}

export default LibraryModel