import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import styles from './contract.module.css'

import Table from './iam/table'


const Contract = ({ }) => {
    const navigate = useNavigate()

    const [stateTable, setStateTable] = useState('')


    const [contracts, setContracts] = useState([{
        title: 'Data Processing Agreement',
        status: 200,
        date: new Date(2021, 0, 1),
        download: 'contract1.pdf'
    }, {
        title: 'General Terms of Service',
        status: 200,
        date: new Date(2021, 0, 1),
        download: 'contract2.pdf'
    }])

    const fetchsContract = () => {
        console.log('fetch contracts')
    }


    useEffect(() => {
        if (stateTable.startsWith('download-file')) {
            const [, fileName] = stateTable.split(':');
            const downloadLink = document.createElement('a');
            downloadLink.href = `/assets/${fileName}`;
            downloadLink.download = fileName;
            downloadLink.click();
        }

    }, [stateTable])

    const onClickSupport = () => {
        navigate(`/${'es'}/app/support`)
    }

    return (
        <div>
            <h2 className={styles.title}>
                Organization: Aythen
            </h2>
            <div className={styles.box}>
                <Table
                    fetchs={fetchsContract}
                    items={contracts}
                    setStateTable={setStateTable}
                >
                    <header>
                        Account Contracts
                    </header>
                    <item filter="title">
                        Name
                    </item>
                    <item>
                        Status
                    </item>
                    <item filter="date" name="date">
                        End At
                    </item>
                    <item size="100" filter="download">
                        Download
                    </item>
                </Table>
            </div>
            <div className={styles.footer}>
                Learn more about
                <a onClick={() => onClickSupport()}>
                    How to change the account language
                    <svg viewBox="0 0 24 24"><path d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z"></path></svg>
                </a>
            </div>
        </div>
    )
}

export default Contract