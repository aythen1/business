import React, { useState } from 'react'

import styles from './index.module.css'


import Table from '../iam/table'


import BankCard from './assets/card.svg'


const Bank = ({ }) => {

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




    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.box}>
                    <div className={styles.icon}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" stroke-width="2" d="M12 19V5m0 14-4-4m4 4 4-4" />
                        </svg>
                    </div>
                    <div className={styles.info}>
                        <b className={styles.title}>
                            Total income
                        </b>
                        <div className={styles.subtitle}>
                            <b>
                                $632.000
                            </b>
                            <label>
                                +1.29%
                            </label>
                        </div>
                    </div>
                </div>
                <div className={styles.box}>
                    <div className={styles.icon}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v13m0-13 4 4m-4-4-4 4" />
                        </svg>
                    </div>
                    <div className={styles.info}>
                        <b className={styles.title}>
                            Total Outcome
                        </b>
                        <div className={styles.subtitle}>
                            <b>
                                $630.00
                            </b>
                            <label>
                                +1.29%
                            </label>
                        </div>
                    </div>
                </div>
                <div className={styles.box}>
                    <div>
                        <div className={styles.title2}>
                            Gestiona tus accesos
                        </div>
                        <div className={styles.access}>
                            {['A', 'B'].map((user, index) => {
                                return (
                                    <div>
                                        A
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.board}>
                <div className={styles.left}>
                    <div className={styles.filters}>
                        <div className={styles.inputs}>
                            <div>
                                <input
                                    type="text"
                                    placeholder="Search for anything"
                                />
                                <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" />
                                </svg>
                            </div>
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 10h16M8 14h8m-4-7V4M7 7V4m10 3V4M5 20h14c.6 0 1-.4 1-1V7c0-.6-.4-1-1-1H5a1 1 0 0 0-1 1v12c0 .6.4 1 1 1Z" />
                                </svg>
                                <input
                                    type="text"
                                    placeholder="Search for anything"
                                />
                                <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m8 10 4 4 4-4" />
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div className={styles.table}>
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
                </div>
                <div className={styles.right}>
                    <div className={styles.card}>
                        <h3>
                            My Card
                        </h3>
                        <div className={styles.balance}>
                            <div>
                                <span>
                                    Card Balance
                                </span>
                                <b>
                                    $15,594.015
                                </b>
                            </div>
                            <div>
                                <span>
                                    Status
                                </span>
                                <button>
                                    Active
                                </button>
                            </div>
                        </div>
                        <div className={styles.photo}>
                            <img src={BankCard} />
                        </div>
                        <div className={styles.buttons}>
                            <button className={styles.manage}>
                                Manage
                            </button>
                            <button>
                                Transfer
                            </button>
                        </div>
                    </div>
                    <div className={styles.security}>
                        <h3>
                            Security
                        </h3>
                        <div className={styles.item}>
                            <div>
                                <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                    <path fillRule="evenodd" d="M11.6 3h.8l7 2.7c.3.2.6.6.6 1a17.7 17.7 0 0 1-7.4 14.1 1 1 0 0 1-1.2 0A17.4 17.4 0 0 1 4 6.7c0-.4.3-.8.6-1l7-2.6Zm4 7.3a1 1 0 0 0-1.3-1.6l-3.3 3-.8-1a1 1 0 0 0-1.4 1.5l1.5 1.5c.4.4 1 .4 1.4 0l4-3.4Z" clipRule="evenodd" />
                                </svg>

                            </div>
                            <span>
                                Tarjeta activa
                            </span>
                            <div className={styles.toggle}>
                                checbox
                            </div>
                        </div>
                        <div className={styles.item}>
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                    <path fillRule="evenodd" d="M8 10V7a4 4 0 1 1 8 0v3h1a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7c0-1.1.9-2 2-2h1Zm2-3a2 2 0 1 1 4 0v3h-4V7Zm2 6c.6 0 1 .4 1 1v3a1 1 0 1 1-2 0v-3c0-.6.4-1 1-1Z" clipRule="evenodd" />
                                </svg>

                            </div>
                            <span>
                                Key
                            </span>
                            <button>
                                change
                            </button>
                        </div>
                    </div>
                    <div className={styles.information}>
                        <div className={styles.top}>
                            <h3>
                                Information
                            </h3>
                            <button>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                    <path fillRule="evenodd" d="M14 4.2a4.1 4.1 0 0 1 5.8 0 4 4 0 0 1 0 5.7l-1.3 1.3-5.8-5.7L14 4.2Zm-2.7 2.7-5.1 5.2 2.2 2.2 5-5.2-2.1-2.2ZM5 14l-2 5.8c0 .3 0 .7.3 1 .3.3.7.4 1 .2l6-1.9L5 13.8Zm7 4 5-5.2-2.1-2.2-5.1 5.2 2.2 2.1Z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </div>
                        <div className={styles.items}>
                            <div className={styles.item}>
                                <div className={styles.label}>
                                    <div>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                            <path fillRule="evenodd" d="M12 2a8 8 0 0 1 6.6 12.6l-.1.1-.6.7-5.1 6.2a1 1 0 0 1-1.6 0L6 15.3l-.3-.4-.2-.2v-.2A8 8 0 0 1 11.8 2Zm3 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    Localidad
                                </div>
                                <div className={styles.content}>
                                    Sta. Perpetua
                                </div>
                            </div>
                            <div className={styles.item}>
                                <div className={styles.label}>
                                    <div>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                            <path fillRule="evenodd" d="M7 2a2 2 0 0 0-2 2v1a1 1 0 0 0 0 2v1a1 1 0 0 0 0 2v1a1 1 0 1 0 0 2v1a1 1 0 1 0 0 2v1a1 1 0 1 0 0 2v1c0 1.1.9 2 2 2h11a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H7Zm3 8a3 3 0 1 1 6 0 3 3 0 0 1-6 0Zm-1 7a3 3 0 0 1 3-3h2a3 3 0 0 1 3 3c0 .6-.4 1-1 1h-6a1 1 0 0 1-1-1Z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    Direccion
                                </div>
                                <div className={styles.content}>
                                    Passatge. Pere 124
                                </div>
                            </div>
                            <div className={styles.item}>
                                <div className={styles.label}>
                                    <div>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                            <path fillRule="evenodd" d="M12 14a3 3 0 0 1 3-3h4a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-4a3 3 0 0 1-3-3Zm3-1a1 1 0 1 0 0 2h4v-2h-4Z" clipRule="evenodd" />
                                            <path fillRule="evenodd" d="M12.3 3.3a1 1 0 0 1 1.4 0L16.4 6h-2.8l-1.3-1.3a1 1 0 0 1 0-1.4Zm.1 2.7L9.7 3.3a1 1 0 0 0-1.4 0L5.6 6h6.8ZM4.6 7A2 2 0 0 0 3 9v10c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2h-4a5 5 0 0 1 0-10h4a2 2 0 0 0-1.5-2h-13Z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    Wallet
                                </div>
                                <div className={styles.content}>
                                    6H46URR8wSR4416c
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}



export default Bank