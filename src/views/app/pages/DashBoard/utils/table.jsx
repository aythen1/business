import React from 'react';

const RenderTicketID = ({ items }) => {
    return (
        <div>
            {items && items.map((item, index) => (
                <div key={index}>
                    ticket ID render aquí va
                    <b>
                        {item}
                    </b>
                </div>
            ))}
        </div>
    );
};

const RenderDefault = ({ items }) => {
    return (
        <div>
            {items && items.map((item, index) => (
                <div key={index}>
                    basic
                    <b>
                        {item}
                    </b>
                </div>
            ))}
        </div>
    );
};

export const renderModule = (moduleName, items = []) => {
    // Lógica para renderizar el módulo según el nombre
    // Puedes implementar esto según tus necesidades específicas
    if(items.length == 0) return false

    switch (moduleName) {
        case 'TicketID':
            return <RenderTicketID items={items} />
        default:
            return <RenderDefault items={items} />
    }
};