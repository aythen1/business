import React from 'react'


import styles from'./ModalBlockElements.module.css'

const initial = [
    {
    href: 'embed',
    icon: require('./assets/block/embed.jsx').default,
    title: `Código incrustado`,
    description: `Integra fácilmente widgets, herramientas o contenido de terceros utilizando código incrustado.`
}, {
    href: `faq`,
    icon: require('./assets/block/faq.jsx').default,
    title: `Preguntas frecuentes (FAQs)`,
    description: `Organiza y presenta información importante de manera clara y accesible para tus usuarios.`
}, {
    href: `cta`,
    icon: require('./assets/block/cta.jsx').default,
    title: `Call to action`,
    description: `Crea botones llamativos y persuasivos para guiar a tus visitantes hacia acciones específicas.`
}, {
    href: `list`,
    icon: require('./assets/block/list.jsx').default,
    title: `Listado de características`,
    description: `Destaca las características clave de tus productos o servicios para captar la atención de tus clientes potenciales.`
}, {
    href: `pricing-table`,
    icon: require('./assets/block/pricing-table.jsx').default,
    title: `Precios`,
    description: `Exhibe tus planes y precios de manera transparente para que los usuarios puedan elegir la opción que mejor se ajuste a sus necesidades.`
}, {
    href: `reviews`,
    icon: require('./assets/block/reviews.jsx').default,
    title: `Reseñas`,
    description: `Muestra las opiniones y comentarios de tus clientes para generar confianza y credibilidad.`
}, {
    href: `location`,
    icon: require('./assets/block/location.jsx').default,
    title: `Mapas`,
    description: `Proporciona a tus visitantes la ubicación exacta de tu empresa o evento con mapas interactivos.`
}, {
    href: `contact`,
    icon: require('./assets/block/contact.jsx').default,
    title: `Contacto`,
    description: `Facilita que tus usuarios se pongan en contacto contigo mediante formularios de contacto o información de contacto directo.`
}, {
    href: `team list`,
    icon: require('./assets/block/team-list.jsx').default,
    title: `Tu equipo`,
    description: `Presenta a tu equipo de trabajo para humanizar tu marca y generar conexión con tus clientes.`
}, {
    href: `video`,
    icon: require('./assets/block/video.jsx').default,
    title: `Video`,
    description: `Incorpora videos para contar historias, demostrar productos o explicar conceptos de manera visual y atractiva.`
}, {
    href: `image-grid`,
    icon: require('./assets/block/image-grid.jsx').default,
    title: `Carrusel de imágenes`,
    description: `Crea presentaciones visuales dinámicas para mostrar múltiples imágenes de tus productos o servicios.`
}, {
    href: `image-carrousel`,
    icon: require('./assets/block/image-carousel.jsx').default,
    title: `Galería de imágenes`,
    description: `Organiza y exhibe tus imágenes en atractivas galerías para cautivar a tus visitantes.`
}, {
    href: `quote`,
    icon: require('./assets/block/quote.jsx').default,
    title: `Testimonios`,
    description: `Destaca las experiencias positivas de tus clientes para fortalecer la confianza en tu marca.`
}, {
    href: `service-list`,
    icon: require('./assets/block/service-list.jsx').default,
    title: `Servicios`,
    description: `Detalla tus servicios de manera clara y concisa para que los usuarios comprendan lo que ofreces.`
}, {
    href: `hero`,
    icon: require('./assets/block/hero.jsx').default,
    title: `Texto + Imagen`,
    description: `Combina texto e imágenes de manera creativa para comunicar mensajes efectivos y atractivos.`
}, {
    href: `image`,
    icon: require('./assets/block/image.jsx').default,
    title: `Imagen`,
    description: `Inserta imágenes de alta calidad para mejorar la estética y el impacto visual de tu sitio web.`
}, {
    href: `banner`,
    icon: require('./assets/block/banner.jsx').default,
    title: `Banner`,
    description: `Utiliza banners llamativos para promocionar ofertas especiales, eventos próximos o contenido destacado.`
}, {
    href: `text`,
    icon: require('./assets/block/text.jsx').default,
    title: `Nuevo texto`,
    description: `Agrega contenido fresco y relevante para mantener a tus usuarios comprometidos y actualizados.`
}
]






const ModalBlockElements = () => {
    return (
        <div className={styles.modal}>
            <div className={styles.header}>
                <h2>
                    Add section
                </h2>
            </div>
            <div className={styles.filter}>
                <div className={styles.input}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" />
                    </svg>
                    <input
                        type="text"
                        spellCheck="false"
                        placeholder={'Search component'}
                        />
                </div>
                <div className={styles.select}>
                    <input
                        type="text"
                        spellCheck="false"
                        placeholder={'Search component'}
                    />
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 9-7 7-7-7" />
                    </svg>
                </div>
            </div>
            <div className={styles.list}>
            {initial.map((item, index) =>
                <div
                key={index}
                className={styles.item}
                >
                    <div className={styles.content}>
                        <b>
                            {item.title}
                        </b>
                        <p>
                            {item.description}

                        </p>
                        <span>
                            by Aythen
                        </span>
                    </div>
                    <div className={styles.logo}>
                        {item.icon && <item.icon />}
                    </div>
                </div>
            )}
            </div>
        </div>
    )
}


export default ModalBlockElements