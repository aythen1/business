import React, { useEffect, useState } from 'react'


import Table from './iam/table'


const Contract = ({ }) => {
    const [stateTable, setStateTable] = useState('')

    const openPDF = () => {
        window.open('./assets/pdf', '_blank')
    }


    const [contracts, setContracts] = useState([{
        title: 'Data Processing Agreement',
        status: 200,
        date: '09/2021',
        download: 'contract1.pdf'
    },{
        title: 'General Terms of Service',
        status: 200,
        date: '09/2021',
        download: 'contract2.pdf'
    }])

     const fetchsContract = () => {
        console.log('fetch contracts')
     }


     useEffect(() => {
        console.log('ss', stateTable)

        if(stateTable.startsWith('download-file')){
            const [, fileName] = stateTable.split(':');
            // console.log('file name', `./public/${fileName}`, process.env.PUBLIC_URL)
            // Crear el enlace de descarga dinámico
            const downloadLink = document.createElement('a');
            downloadLink.href = `/assets/${fileName}`;
            downloadLink.download = fileName;

            // Simular el clic en el enlace
            downloadLink.click();

        }

     }, [stateTable])


    return (
        <div>

            <div>
                <Table
                    fetchs={fetchsContract}
                    items={contracts}
                    setStateTable={setStateTable}
                >
                    <header>
                        Account Contracts
                    </header>
                    <item>
                        Name
                    </item>
                    <item>
                        Status
                    </item>
                    <item>
                        Version
                    </item>
                    <item>
                        Download
                    </item>
                </Table>
            </div>
            <div>
                Learn more about
                How to change the account language
            </div>
        </div>
    )
}

export default Contract