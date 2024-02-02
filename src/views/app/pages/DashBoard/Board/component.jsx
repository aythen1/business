import React from 'react'


import * as Graphs from '@/views/graphs/render'


const Component = ({ component }) => {

    const Component = Graphs[component.type];

    if (!Component) {
        console.error(`Component type "${component.type}" not found or not exported.`);
        return <div>Error: Component not found</div>;
    }



    return (
        <div>
            {JSON.stringify(component)}
            <Component />
        </div>
    )
}

export default Component

