import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'



import styles from './Vector.module.css'

const Vector = ({
    position,
    setCenter,
}) => {
    const navigate = useNavigate()
    const [listVector, setListVector] = useState([{

    }, {}, {}])


    const handleVector = (index) => {
        const newX = position.x - 20
        const newY = position.y + (index * 40)

        setCenter(newX, newY, { zoom: 4, duration: 2000 });
        // alert(`Posición del ratón: (${mouseX}, ${mouseY})`);

        setTimeout(function(){
            navigate(`/${'es'}/app/vector/3f6376b1-8e12-4870-8833-4307348b3db9`)
        }, 1800)
    };

    return (
        <div className={styles.panel}>
            {listVector.map((vector, index) => (
                <div
                    key={index}
                    className={styles.vector}
                    onClick={(e) => handleVector(index)}
                >
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M17.5 12.6a4.4 4.4 0 0 0 2.7 4c-.3 1-.8 2-1.4 3-.8 1.1-1.7 2.3-3 2.4-1.4 0-1.8-.8-3.3-.8-1.6 0-2 .7-3.3.8-1.3 0-2.3-1.3-3.2-2.5-1.7-2.5-3-7-1.2-10.1a4.9 4.9 0 0 1 4.1-2.5c1.3 0 2.5.9 3.3.9.8 0 2.3-1.1 3.8-1a4.7 4.7 0 0 1 3.7 2 4.5 4.5 0 0 0-2.2 3.8M15 5.2c.8-.9 1.1-2 1-3.2a4.5 4.5 0 0 0-3.7 3c-.2.5-.3 1-.2 1.6a3.7 3.7 0 0 0 3-1.4Z" />
                        </svg>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Vector