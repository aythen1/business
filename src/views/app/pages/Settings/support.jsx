import React, {useState, useEffect} from 'react'

import styles from './support.module.css'


const Support = () => {

        
    const [listStatus, setListStatus] = useState([])


    const initialStatus= [{
        title: 'Containers', 
        value: 1
    },{
        title: 'Containers', 
        value: 1
    },{
        title: 'Containers', 
        value: 1
    },{
        title: 'Containers', 
        value: 1
    },{
        title: 'Containers', 
        value: 1
    }]

    useEffect( () => {
        setListStatus(initialStatus)
    }, [])



    return (
        <div className={styles.container}>
            <div className={styles.containerQuery}>
                <h2 className={styles.title}>
                    How con we help you?
                </h2>
                <div className={styles.input}>
                    <input
                        placeholder={`Search by keyword, product, subject..`}
                    />
                </div>
            </div>
            <div className={styles.conatinerPopular}>
                <h2 className={styles.title}>
                    Popular topics
                </h2>
                <div className={styles.boxPopular}>
                    <div className={styles.box}>
                        <div>
                            <svg viewBox="0 0 64 64" ><g class="Tutorial"><g className={styles.Square}><path fill="#EEF" d="M.512 16c0-8.837 7.163-16 16-16h32c8.836 0 16 7.163 16 16v32c0 8.837-7.164 16-16 16h-32c-8.837 0-16-7.163-16-16z" class="fillWeak"></path></g><g class="Tutorial"><g class="Icon"><path fill="#4F0599" d="M50.166 15.006c.598-.223 1.227.175 1.328.793l.014.174.004 24.86c0 .349-.172.67-.45.858l-.148.083-18.05 8.169a.974.974 0 0 1-.65.055l-.157-.056L14.11 41.78a1.025 1.025 0 0 1-.582-.769l-.014-.172-.003-24.86c0-.652.577-1.124 1.175-1.012l.163.045 6.476 2.395c.52.192.79.781.603 1.316a.997.997 0 0 1-1.105.667l-.174-.047-5.14-1.902.004 22.727 16.948 7.708 17.05-7.716-.004-22.721-5.08 1.902a.987.987 0 0 1-1.206-.447l-.076-.168a1.043 1.043 0 0 1 .434-1.24l.164-.078 6.422-2.402Z" class="fill"></path><path fill="#4F0599" d="M44.704 21.547a.99.99 0 0 0-1.3-.571l-11.22 4.634-.16.084c-.402.26-.578.785-.395 1.254a.991.991 0 0 0 1.3.57l11.219-4.633.16-.085c.402-.26.578-.785.395-1.253Zm0 6.499a.99.99 0 0 0-1.3-.571l-11.219 4.634-.16.084c-.402.26-.578.785-.395 1.254a.991.991 0 0 0 1.3.57l11.219-4.633.16-.085c.402-.26.578-.784.395-1.253" class="fill" clip-rule="evenodd" fill-rule="evenodd"></path><path fill="#A365F6" d="m31.513 20.032-9.525-4.413.002 19.566 9.523 4.542zm.41 22.16-11.352-5.415a1.031 1.031 0 0 1-.58-.933l-.003-21.814c0-.747.75-1.245 1.41-.938l11.141 5.16 11.133-5.16c.661-.307 1.41.191 1.41.938l.003 21.81c0 .4-.226.765-.579.933l-11.36 5.419a.983.983 0 0 1-.61.198.983.983 0 0 1-.612-.198Zm1.635-2.465 9.526-4.544-.002-19.564-9.524 4.414z" class="fillStrong" clip-rule="evenodd" fill-rule="evenodd"></path></g></g></g></svg>
                            Get started
                        </div>
                        <button>
                         <svg viewBox="0 0 24 24" ><path d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z"></path></svg>
                        </button>
                    </div>
                </div>
            </div>
            <div className={styles.containerTrid}>
                <div className={styles.boxStatus}>
                    <h2 className={styles.title}>
                        Status
                    </h2>
                    <div className={styles.box}>
                        {listStatus.map( (item, index) => {
                            return (
                                <div className={styles.item}>
                                    <div>
                                        <span>
                                            Jan 8, 2024
                                        </span>
                                        <div className={styles.title}>
                                            <div className={styles.dot}>

                                            </div>
                                            <b>
                                                [AMS|WAW2/ASM3] Debian Aws console lerem
                                            </b>
                                        </div>
                                    </div>
                                    <button>
                                    <svg viewBox="0 0 24 24"><path d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z"></path></svg>
                                    </button>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className={styles.boxContact}>
                    <h2 className={styles.title}>
                        Contact us
                    </h2>
                    <div className={styles.box}>
                        <div className={styles.item}>
                            <b>
                                Open a support ticket
                            </b>
                            <span>
                                Get direct assistence from our team.
                            </span>
                        </div>
                        <div className={styles.item}>
                            <b>
                                Manage tickets
                                <label>
                                    2
                                </label>
                            </b>
                            <span>
                                Manage ticket, abuse reports and your support plan.
                            </span>
                        </div>
                    </div>
                </div>
                <div className={styles.boxGoing}>
                    <h2 className={styles.title}>
                        Going further
                    </h2>
                    <div className={styles.box}>
                        <div className={styles.item}>
                            <div>
                                <b>
                                    Join our Slack Community
                                </b>
                                <span>
                                    Get in touch with tech enthisiasts and make the most a Scaleway.
                                </span>
                            </div>
                            <button>
                            <svg viewBox="0 0 24 24"><path d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z"></path></svg>

                            </button>
                        </div>
                        <div className={styles.item}>
                            <div>
                                <b>
                                    Request a feature 
                                </b>
                                <span>
                                    Let us kenow whic features you
                                    would like as to develop
                                </span>
                            </div>
                            <button>
                            <svg viewBox="0 0 24 24"><path d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z"></path></svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.footer}>
                <ul className={styles.footerUl}>
                    <li>
                        Blog
                        <svg viewBox="0 0 24 24" ><path d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z"></path></svg>
                    </li>
                    <li>
                        Pricing
                        <svg viewBox="0 0 24 24" ><path d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z"></path></svg>
                    </li>
                    <li>
                        Careers
                        <svg viewBox="0 0 24 24" ><path d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z"></path></svg>
                    </li>
                    <li>
                        Privacy
                        <svg viewBox="0 0 24 24" ><path d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z"></path></svg>
                    </li>
                    <li>
                        Cookies
                        <svg viewBox="0 0 24 24" ><path d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z"></path></svg>
                    </li>
                    <li>
                        API
                        <svg viewBox="0 0 24 24" ><path d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z"></path></svg>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Support