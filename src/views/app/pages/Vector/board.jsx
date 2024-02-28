import React, { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { v4 as uuidv4 } from 'uuid';
import * as xlsx from 'xlsx';

import styles from './board.module.css'


import VectorBoard from './board/'
import VectorTable from './table'
import VectorFlow from './flow'
import VectorAddon from './addon'

import components from '@components'



import {
    addVector,
    addVectorData,
    updateVector,
    deleteVector,
    removeAllVector,
    fetchsVector,
    getAllVector
} from '@/actions/vector'

import {
    setVector,
    setDimension
} from '@/slices/vectorSlice'


import {
    setModal
} from '@/slices/iamSlice'


import {
    ModalVector,
    ModalAddVector
} from './ModalVector'
import { iniVector } from '../../../../actions/vector';


const Board = ({ }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const boardContainerRef = useRef(null);


    const [dataSheets, setDataSheets] = useState([]);
    const [dataSheet, setDataSheet] = useState({})


    const [show, setShow] = useState('table')


    const { user } = useSelector((state) => state.iam)
    const {
        dimension,
        vectors,
        vector
    } = useSelector((state) => state.vector)
    // -----------------------------------------------------------------------------

    const handleClickReturn = () => {
        dispatch(setVector(null))
        navigate(`/${'es'}/app/vector`)
    }

    const handleClickPreview = () => {
        setShow('addon')
    }

    const handleClickVector = () => {
        setShow('flow')
    }

    const handleClickImport = (e) => {
        e.stopPropagation()
        setShow('import')
    }


    const handleClickGraph = () => {
        setShow('board')
    }


    const handleLoadData = (item) => {
        console.log('data', item)
        setDataSheet(item)
        setShow('flow')
        dispatch(setDimension(item))
    }

    // ----------------------------------------------------------------------------

    const handleClickOption = () => {
        console.log('vector', vector)
        dispatch(setModal(<ModalVector vector={vector} />))
    }


    const handleAddVector = () => {
        // alert(1)
        dispatch(setModal(<ModalAddVector />))
    }


    const handleAddData = () => {
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = '.xlsx, .xls';
        fileInput.style.display = 'none';
        fileInput.addEventListener('change', handleDrop);  // Asignar handleDrop directamente al evento change

        // Agregar el elemento input al body
        document.body.appendChild(fileInput);

        // Simular un clic en el nuevo elemento input
        fileInput.click();
    }

    const handleDrop = (e) => {
        e.preventDefault();

        const file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
        const reader = new FileReader();


        const fileSizeInBytes = file.size;
        const fileSizeInKilobytes = fileSizeInBytes / 1024;
        const fileSizeInMegabytes = fileSizeInKilobytes / 1024;

        reader.onload = (e) => {
            const arrayBuffer = e.target.result;
            const workbook = xlsx.read(new Uint8Array(arrayBuffer), { type: 'array' });
            const firstSheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[firstSheetName];
            const title = `${file.name.replace(/\.[^/.]+$/, '')}_name`;
            const header = xlsx.utils.sheet_to_json(worksheet, { header: 1 })[0];
            const data = xlsx.utils.sheet_to_json(worksheet).map(row => {
                const rowData = {};
                header.forEach(column => {
                    rowData[column] = row[column];
                });
                return rowData;
            });

            const table = {
                title,
                header,
                data,
                size: fileSizeInMegabytes,
                error: false,
                date: new Date(),
            };

            console.log('table', table)

            const nodes = JSON.parse(vector.nodes)
            const lastNode = nodes[nodes.length - 1]

            let newY = 0
            let newX = 0

            if (lastNode) {
                newX = lastNode.position.x;
                newY = lastNode.position.y + lastNode.height + 20;
            }

            const newNode = {
                id: uuidv4(),
                type: 'selectorVector',
                data: table,
                position: { x: newX, y: newY }
            };

            nodes.push(newNode)


            let _vector = JSON.parse(JSON.stringify(vector))
            // _vector.nodes = nodes
            _vector.nodes = JSON.stringify(nodes)

            console.log('vector nodes', _vector)
            console.log('vector _vector', JSON.parse(_vector.nodes))


            let id = iniVector({
                workspaceId: user.id,
                projectId: 'vector'
            })

            dispatch(updateVector({
                id,
                name: 'vectors',
                data: _vector
            }))


            // setDataVector((prevData) => [...prevData, table]);
            // const lastNode = nodes[nodes.length - 1];
            // let newY = 0;
            // let newX = 0;
            // // Verificar si hay nodos existentes
            // if (lastNode) {
            //     newX = lastNode.position.x;
            //     newY = lastNode.position.y + lastNode.height + 20;
            // }
            // // Crear un nuevo nodo
            // const newNode = {
            //     id: uuidv4(),
            //     type: 'selectorVector',
            //     data: table,
            //     position: { x: newX, y: newY }
            // };
            // // Actualizar el estado de los elementos para incluir el nuevo nodo
            // setNodes((prevElements) => [...prevElements, newNode]);
        };

        reader.readAsArrayBuffer(file);
    }

    // ------------------------------------------------------------------------------

    useEffect(() => {
        const nodes = JSON.parse(vector.nodes)

        const filteredNodes = nodes.filter(node => node.type === 'selectorVector').map(data => {
            return {
                id: data.id,
                header: data.data.header,
                title: data.data.title,
                size: data.data.size,
                date: data.data.date,
                cells: data.data.data.length,
                cols: data.data.header.length,
                data: data.data.data,
                position: data.position
            }
        });

        setDataSheets(filteredNodes);
    }, [vector])





 


    return (
        <div className={styles.container}>
            <div className={styles.TopBar}>
                <div className={styles.filter}>
                    <button
                        className={styles.TopBack}
                        onClick={() => handleClickReturn()}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m15 19-7-7 7-7" />
                        </svg>
                        Home
                    </button>
                    <div>
                        {/* <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M18.8 4H5.2a1 1 0 0 0-.7 1.7l5.3 6 .2.7v4.8c0 .2 0 .4.2.4l3 2.3c.3.2.8 0 .8-.4v-7.1c0-.3 0-.5.2-.7l5.3-6a1 1 0 0 0-.7-1.7Z" />
                        </svg> */}
                        {/* PONER ICONO seleccionables del util (vector) */}
                        <components.SearchList
                            icon={`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M18.8 4H5.2a1 1 0 0 0-.7 1.7l5.3 6 .2.7v4.8c0 .2 0 .4.2.4l3 2.3c.3.2.8 0 .8-.4v-7.1c0-.3 0-.5.2-.7l5.3-6a1 1 0 0 0-.7-1.7Z" />
                        </svg>`}
                            // data={vectors}
                            data={['', '']}
                        />

                        <button
                            className={styles.ButtonAdd}
                            onClick={() => handleAddVector()}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14m-7 7V5" />
                            </svg>
                        </button>
                    </div>
                </div>
                <div className={styles.buttons}>
                    <label onClick={() => handleClickPreview()}>
                        Connected (2) DB
                    </label>
                    <button
                        onClick={() => handleClickGraph()}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeWidth="2" d="M21 12c0 1.2-4 6-9 6s-9-4.8-9-6c0-1.2 4-6 9-6s9 4.8 9 6Z" />
                            <path stroke="currentColor" strokeWidth="2" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        </svg>
                        Dashboard
                        <label>
                            New
                        </label>
                    </button>
                    <button
                        onClick={() => handleClickVector()}
                    >
                        Vector
                    </button>
                    <button
                        onClick={() => handleClickOption()}
                    >
                        <svg
                            onClick={(e) => handleClickImport(e)}
                            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                        >
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 15v2a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-2M12 4v12m0-12 4 4m-4-4L8 8" />
                        </svg>
                        Option
                    </button>
                </div>
            </div>
            <div className={styles.TopVectors}>
                <div className={styles.team}>
                    <div className={styles.avatar}>
                        <div className={styles.initial}>
                            {vector.title.slice(0, 1) || '-'}
                        </div>
                    </div>
                    <div className={styles.info}>
                        <div className={styles.title}>
                            {vector.title || 'Not found'}
                            {/* Matthew Frankina's Team */}
                        </div>
                        <div className={styles.subtitle}>
                            {vector.description || 'No description..'}
                            {/* Manager Commercial Sites */}
                        </div>
                    </div>
                </div>
                {dataSheets.map((data, index) => (
                    <div
                        key={index}
                        className={`${styles.vector} ${dataSheet.id == data.id && styles.active}`}
                        onClick={() => handleLoadData(data)}
                    >
                        <label className={styles.title}>
                            {data.title}
                        </label>
                        <div className={styles.current}>
                            {data.size}
                            <div>
                                ({`${data.cols}x${data.cells}`})
                            </div>
                        </div>
                        <div className={styles.info}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7.6 8.5h8m-8 3.5H12m7.1-7H5c-.2 0-.5 0-.6.3-.2.1-.3.3-.3.6V15c0 .3 0 .5.3.6.1.2.4.3.6.3h4l3 4 3-4h4.1c.2 0 .5 0 .6-.3.2-.1.3-.3.3-.6V6c0-.3 0-.5-.3-.6a.9.9 0 0 0-.6-.3Z" />
                            </svg>
                            {data.date}
                        </div>
                    </div>
                ))}
                <div
                    className={styles.ButtonAddData}
                    onClick={() => handleAddData()}
                >
                    <svg c xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9V4c0-.6-.4-1-1-1H9a1 1 0 0 0-.8.3l-4 4a1 1 0 0 0-.2.6V20c0 .6.4 1 1 1h4M9 3v4c0 .6-.4 1-1 1H4m11 6v4m-2-2h4m3 0a5 5 0 1 1-10 0 5 5 0 0 1 10 0Z" />
                    </svg>
                    Insertar datos
                </div>
            </div>
            <div className={styles.BoardFlow}>
                <div
                    ref={boardContainerRef}
                    className={styles.board}
                >
                    {show == 'flow' ? (
                        <VectorFlow />
                    ) : show == 'addon' ? (
                        <VectorAddon />
                    ) : show == 'board' ? (
                        <VectorBoard />
                    ) : ( // data
                        <VectorTable data={dataSheet} />
                    )}
                </div>
            </div>
        </div>
    )
}


export default Board

































