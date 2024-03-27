import React from 'react';

import styles from './Report.module.css'


const TopBar = ({ type = 'absolute' }) => {
    const selectedTab = () => {

        let content = <TabPDF />
        return content
    }
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <button>
                    PDF
                </button>
                <button>
                    API
                </button>
                <button>
                    DASH
                </button>
            </div>
            <div className={styles.box}>
                {selectedTab()}
            </div>
        </div>
    )
}


export default TopBar




export const TabPDF = ({ }) => {


    const imageIllustration = require('./assets/report/illustration.webp')

    const list = [{
        title: 'Lorem ipsum 1'
    },{
        title: 'Lorem ipsum 1'
    },{
        title: 'Lorem ipsum 1'
    },{
        title: 'Lorem ipsum 1'
    },{
        title: 'Lorem ipsum 1'
    },{
        title: 'Lorem ipsum 1'
    }]


    return (
        <div className={styles.banner}>
            <div className={styles.left}>
                <div className={styles.top}>
                    <h2>
                        Hello world pdf
                    </h2>
                    <p>
                        Aqui tenemos las ganas de poder
                        Escurecer lo que necesitamos para tener los datos
                    </p>
                    <div className={styles.feature}>
                        {list.map((item, index) => (
                            <div>
                                <svg viewBox="0 0 24 24" ><path d="M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17M12,4.5C7,4.5 2.73,7.61 1,12C2.73,16.39 7,19.5 12,19.5C17,19.5 21.27,16.39 23,12C21.27,7.61 17,4.5 12,4.5Z"></path></svg>
                                {item.title}
                            </div>
                        ))}
                    </div>
                </div>
                <div className={styles.bottom}>
                    <div className={styles.checkout}>
                        <input value={''} type="checkout" />
                        Acepta las condiciones
                    </div>
                    <div className={styles.buttons}>
                        <button className={styles.left}>
                            Un contador
                        </button>
                        <button className={styles.right}>
                            Un contador
                        </button>
                    </div>
                </div>
            </div>
            <div className={styles.right}>
                <div className={styles.bottom}>
                    <img src={imageIllustration} />
                    <div>
                        <p className={styles.author}>
                            KarlVald
                        </p>
                        <p>
                            Aqui opiniones que cambiaran cada 5 segundos
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}