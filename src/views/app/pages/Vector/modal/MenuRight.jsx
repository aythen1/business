import React, { useState, useEffect, useRef } from 'react'

import apiBackend from '@/utils/apiBackend'


const MenuRight = ({ styles }) => {

    const [listDepsNpm, setListDepsNpm] = useState([]);

    const [typeDep, setTypeDep] = useState('npm');
    const [depNpm, setDepNpm] = useState(null);
    const [depPip, setDepPip] = useState(null);

    const [searchQuery, setSearchQuery] = useState('');

    const [dependencies, setDependencies] = useState([])
    const searchTimeoutRef = useRef(null);

    let searchTimeout


    useEffect(() => {
        if (searchQuery.length >= 3) {
            delayedSearch();
        }
    }, [searchQuery]); // Ejecutar cuando searchQuery cambie

    const handleSearch = async () => {

        if (searchQuery.length >= 3) {
            const token = localStorage.getItem("token");
            const response = await apiBackend.post(
                "/sys/search",
                {
                    type: typeDep,
                    query: searchQuery,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log('data', response);

            setDepPip(null)           
            setDepNpm(null)           
            if (typeDep == 'pip') {
                setDepPip(response.data.data)
            } else if (typeDep == 'npm'){
                setListDepsNpm(response.data.data)
            }
        }
    };

    const delayedSearch = () => {
        clearTimeout(searchTimeoutRef.current);
        searchTimeoutRef.current = setTimeout(() => {
            handleSearch();
        }, 500); // Esperar 500 milisegundos antes de ejecutar la búsqueda
    };



    const handleChange = (e) => {
        setSearchQuery(e.target.value);
    };



    // --------------------------------------------------------

    const handleInstall = (packageName) => {
        // Lógica para instalar la dependencia
        // Podrías utilizar un servidor Node.js con npm-install-package para manejar esto
        // Ejemplo básico:
        fetch('/api/install', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ packageName }),
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    onInstall(packageName);
                } else {
                    console.error('Error al instalar la dependencia');
                }
            });
    };

    return (
        <div>
            <div>
                <div className={styles.search}>
                    <svg className={styles.icon} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" />
                    </svg>
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={handleChange}
                    />
                    <button
                    className={styles.npm}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3.87H4v16h8v-13h5v13h3v-16h-8Z" />
                        </svg>
                    </button>

                    <ul>
                        <li>
                            hello
                        </li>
                    </ul>
                </div>
                {listDepsNpm.length > 0 ? (
                    <ListDepsNpm dependencies={listDepsNpm}/>
                ) : (
                    <div>
                        {depNpm && (
                            <DepNpm dependency={depNpm} />
                        )}
                        {depPip && (
                            <DepPip dependency={depPip} />
                        )}
                    </div>
                )}

            </div>
        </div>
    )
}


export default MenuRight







// -------------------------------------------------------------------------

const ListDepsNpm = ({ dependencies }) => {
    return (
        <div>
            <ul>
                {dependencies.map((dependency, index) => (
                    <li key={index}>
                        {dependency.flags?.insecure}
                        {dependency.flags?.unstable}

                        {dependency.package?.date}
                        {dependency.package?.version}
                        {dependency.package?.name}
                        {dependency.package?.description}
                        {dependency.package?.keywords.map((keyword, index) => (
                            <div>
                                {keyword}
                            </div>
                        ))}

                        {dependency.package?.links?.bugs}
                        {dependency.package?.links?.homepage}
                        {dependency.package?.links?.npm}
                        {dependency.package?.links?.repository}

                        {dependency.package?.links?.publisher?.email}
                        {dependency.package?.links?.publisher?.username}

                        {dependency.package?.links?.maintainers.map((maintainer, index) => (
                            <div>
                                {maintainer.email}
                                {maintainer.username}
                            </div>
                        ))}

                        {dependency.score?.final}
                        {dependency.score?.detail.maintenance}
                        {dependency.score?.detail.popularity}
                        {dependency.score?.detail.quality}
                    </li>
                ))}
            </ul>
        </div>
    )
}




const DepPip = ({ dependency }) => {
    return (
        <div>
            hello world
            {dependency.author}
            <div dangerouslySetInnerHTML={{ __html: dependency.description }} />
            {dependency.project_url}
            {dependency.name}
            {dependency.maintainer_email}
            {dependency.package_url}
            {dependency.release_url}
            {dependency.requires_python}
            {dependency.version}
        </div>
    )
}




const DepNpm = ({dependency}) => {
    return (
        <div>
            hello world
            {dependency.author}
            <div dangerouslySetInnerHTML={{ __html: dependency.description }} />
            {dependency.project_url}
            {dependency.name}
            {dependency.maintainer_email}
            {dependency.package_url}
            {dependency.release_url}
            {dependency.requires_python}
            {dependency.version}
        </div>
    )
}