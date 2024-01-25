import React from 'react'



/*
 

routes: {
    'path': {
        allowed: [],
        version: '',
        props: {}
        data: {
            'model': {
                reducer: {
                    'name': function()
                },
                required: []
            }

        }
    }
}
*/
const Default = () => {
    return (
        <div >
            <Invoice />
        </div>
    )
}

export default Default;


const Invoice = () => {
    return (
        <div >
            Invoice Date
            09/13/2023
            
            Due Date
            09/13/2023

            Source
            Shop/1511

            Reference
            Shop/1511


            Description
            200 - Alu 30x30cm

            Quantity
            1.00

            Unit Price
            119.00

            Taxes
            IVA 10%

            Amount
            108.18€

            Untaxed Amount
            IVA 10%

            Total
            Paid on 09/13/2023 using Bank

            Amount Due
            0.00€



            Products

            i
            image product
            Taza Personalizada #3
            John Doe
            Store #1
            44.99€

            Summary:
            $179.96
            $0
            $179.96
            

        </div>
    )
}



const Invoice1 = () => {
    return (
        <div >
            Products
            CustomCup Eye #3
            Both Eyes
            $44.99

            Client Info
            
            Name
            John Doe
            
            Address
            123 Fake Street, Springfield, USA

            Phone 
            1234123491123

            Email
            john@doe.com

            Payment Method
            Credit Card - Visa *** *** *** 1058

            Status
            Delivered

            Summary: $179.96
            Delivery: $0
            Total: $179.96

        </div>
    )
}



const Shop = () => {
    return (
        <div >
            Store 1's Settings

            Name
            Tienda #1

            Address
            142 Light St.

            Manager
            Morty Smith

            Created Date
            10/02/2023

            Last Modificated
            10/02/2022 10:15hs

            Facturas
            Pedidos
            Clientes
            Status
            
            Save


            Employees

            Image User
            Jodi Diaz
            Sales - Store 1
            Since 07/23
            Active


            Clientes
            Image User
            Jordi Diaz
            Store1


            Summarys
            December
            Sales - Store

        </div>
    )
}


const Clients = () => {
    return (
        <div >
            Clientes

            Select All
            Download
            Export
            + Nuevo



            Name
            John Doe

            Address
            Barcelona 123

            Phone
            55512376

            Email
            John.doe@gmail.com

            Tienda
            Store 1

            Total
            €35


            Pedidos más populared

            Add
            Edit
            Export



            Archivos subidoss
            Imagenes

            Resultado final
            Imagenes

            Últimos Pedidos
            Image
            Custom Cup Eye #3
            13/03/2023
            $44.99



        </div>
    )
}


const NewClient = () => {
    return (
        <div >
            Nuevo cliente
            
            Upload image
            Añadir imagen

            Nombre
            Input

            Dirección
            
            Ciudad

            Código Postal

            Estado

            País

            Idioma

            Email

            Telefono

            Código de barras

            Tax ID

            Guardar

        </div>
    )

}



const Auth = () => {
    return (
        <div >
            Store

            Administrador de PIN
            John Doe

            Lorem ipsum dolor sit amet consectetut. Et congue venenatis sit erat velit.


            ¿Activar PIN?

            PIN

            Contraseña ADMIN

            Guardar
        </div>
    )
}


const NewEmployeer = () => {
    return (
        <div >
            Nuevo empleado
            Nombre
            Dirección
            Store
            Activar Pin
            Para generar otro PIN, deselecciona y vuelve a 
            seleccionar la creación de un nuevo PIN.
            Teléfono
            Ciudad
            Email

            Guardar

        </div>
    )
}

const NewStore = () => {
    return (
        <div >
            New Store
            Name
            Address
            Manager
            Created Date
            Last Modificated
            Invoices
            Orders
            Users
            Status
            Create
        </div>
    )
}


const Shipping = () => {
    return (
        <div >

            Address
            Nueva direccion

            John's House Home
            129  Harvest Path, Jacksonville
            Contact - (936) 361 - 0310

            Edit Remove


            Shipment Method

            30€ 
            Envio regular
            01 Feb, 2023

            50€
            Envio prioritario 
            28 Jan, 2023

            Gratis
            Seleccionar cliente

            Payment Method
            Add Payment method

            Efectivo



            Order Summary
            Price
            $319.98

            Discount
            $31.9

            Shipping
            Free

            Cuppon Applied 
            $0.00

            Total
            $288.08

            Estimated Delivery by
            01 Feb, 2023

            Coupon 

            Proceed to Buy

        </div>
    )
}


const Home = () => {
    return (
        <div >
             Icon producto  
             Total Franquicias
             40
             1 16% this month

             Icon Usuario
             Usuarios
             100
             1% this month

            Icon Mobile
             Active PIN
             80

             Tiendas
             Icon Search

             Search
             Sort by: Newest 
             Icon array
             +

             Name
             Icon product
             Barcelona 
             Calle luz 321

             Status
             Active

             Since
             Since 07/23

             ..


             Empleados
             Search

             Name
             Avatar
             Jordi Diaz
             Sales - Store 1

             Since 07/23

             PIN 
             True
        </div>
    )
}





const Shipping1 = () => {
    return (
        <div >
            LLM
        </div>
    )
}


const AIEditor = () => {
    return (
        <div >
            AI Editor
            Artificial Intellifence as a way to edit the eye 
            content to generate final orders with PIN or DEMOs 
            with watemark

            Order 
            Export
            Filter


            000216543
            Icon Activate

            Confirmar

            Basic
            Quality 92%
            Max dimensions 
            aspect-ratio
            max-width (px)
            max-width (px)
            Format
            Crop
            Guardar
            Size: 30kb
            jpeg

            Filters
            Contrast
            Brightness
            Grayscale
            Saturate
            Sepia
            Blur
            
            Guardar
            Size 30kb jpeg


            Order
            Choose a style

            Print
            Print DUO
            Print TRIO

            Carrito
            Taza de Ojo personalizada #3
            $44.99

            + agregar producto
            + agregar producto

            Comprar
        </div>
    )
}



const Others = () => {
    return (
        <div >
            Order Created!
            We will send you and email with the details
            Continue

            Choose Size
            20x20 €49.00
            30x30 €49.00
            40x40 €49.00
            50x50 €49.00
            60x60 €49.00
            70x70 €49.00
            80x80 €49.00
        </div>
    )
}