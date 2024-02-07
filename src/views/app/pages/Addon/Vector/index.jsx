
import React, { useRef, useState, useEffect } from 'react'



import VectorCustom from './Custom'
import VectorVersion from './Version'

const Vector = () => {
    const [vector, setVector] = useState(null)
    const [modal, setModal] = useState(true)

    return (
        <div>
            {modal ? (
                <VectorCustom setModal={setModal} vector={vector} />
            ) : (
                <VectorVersion />
            )}
        </div>

    )
}


export default Vector








