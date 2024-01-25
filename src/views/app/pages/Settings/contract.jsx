import React from 'react'


const Contract = ({}) => {

    const openPDF = () => {
        window.open('./assets/pdf', '_blank')
    }
    return(
        <div>
        Organization contracts
        1. Name
        2. Status
        3. Version

        https://console.scaleway.com/organization/contracts

        <div>
            Data Processing Agreement
            Active
            09/2021
            09/2021
            <button onClick={() => openPDF()}>
                open
            </button>
            
            Firma electronica en lancedb?¿
        </div>
    </div>
    )
}

export default Contract