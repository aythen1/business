import React, { useState, useEffect, useRef } from 'react'

import apiBackend from '@/utils/apiBackend'

import {
    calculateTimeAgo
} from '@/utils'

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
    }, [searchQuery]);

    useEffect(() => {
        const localDeps = localStorage.getItem('listDepsNpm')
        if (localDeps && localDeps.length > 0) {
            setListDepsNpm(JSON.parse(localDeps))
            console.log('wfirfhj', JSON.parse(localDeps))
        }
    }, [])


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
            console.log('data', typeDep, response);

            setDepPip(null)
            setDepNpm(null)
            if (typeDep == 'pip') {
                setDepPip(response.data)
            } else if (typeDep == 'npm') {
                setListDepsNpm(response.data)
                localStorage.setItem('listDepsNpm', JSON.stringify(response.data))
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

    const handleType = () => {
        if (typeDep == 'npm') {
            setTypeDep('pip')
        } else {
            setTypeDep('npm')
        }
    }


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
                        placeholder={'Buscar deps..'}
                        value={searchQuery}
                        onChange={handleChange}
                    />
                    <button
                        className={`${styles.npm} ${typeDep == 'npm' && styles.active}`}
                        onClick={handleType}
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
                    <ListDepsNpm
                        styles={styles}
                        dependencies={listDepsNpm}
                    />
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

const ListDepsNpm = ({ styles, dependencies }) => {
    return (
        <div>
            <ul className={styles.scroll}>
                {dependencies.map((dependency, index) => (
                    <li
                        key={index}
                        className={styles.dependency}
                    >
                        <div className={styles.status}>
                            <div className={styles.score}>
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                        <path fillRule="evenodd" d="M12.006 2a9.847 9.847 0 0 0-6.484 2.44 10.32 10.32 0 0 0-3.393 6.17 10.48 10.48 0 0 0 1.317 6.955 10.045 10.045 0 0 0 5.4 4.418c.504.095.683-.223.683-.494 0-.245-.01-1.052-.014-1.908-2.78.62-3.366-1.21-3.366-1.21a2.711 2.711 0 0 0-1.11-1.5c-.907-.637.07-.621.07-.621.317.044.62.163.885.346.266.183.487.426.647.71.135.253.318.476.538.655a2.079 2.079 0 0 0 2.37.196c.045-.52.27-1.006.635-1.37-2.219-.259-4.554-1.138-4.554-5.07a4.022 4.022 0 0 1 1.031-2.75 3.77 3.77 0 0 1 .096-2.713s.839-.275 2.749 1.05a9.26 9.26 0 0 1 5.004 0c1.906-1.325 2.74-1.05 2.74-1.05.37.858.406 1.828.101 2.713a4.017 4.017 0 0 1 1.029 2.75c0 3.939-2.339 4.805-4.564 5.058a2.471 2.471 0 0 1 .679 1.897c0 1.372-.012 2.477-.012 2.814 0 .272.18.592.687.492a10.05 10.05 0 0 0 5.388-4.421 10.473 10.473 0 0 0 1.313-6.948 10.32 10.32 0 0 0-3.39-6.165A9.847 9.847 0 0 0 12.007 2Z" clipRule="evenodd" />
                                    </svg>
                                    {(dependency.score?.detail.maintenance * 100).toFixed(1)}<br />
                                </div>
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                        <path fillRule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm5.495.93A.5.5 0 0 0 6.5 13c0 1.19.644 2.438 1.618 3.375C9.099 17.319 10.469 18 12 18c1.531 0 2.9-.681 3.882-1.625.974-.937 1.618-2.184 1.618-3.375a.5.5 0 0 0-.995-.07.764.764 0 0 1-.156.096c-.214.106-.554.208-1.006.295-.896.173-2.111.262-3.343.262-1.232 0-2.447-.09-3.343-.262-.452-.087-.792-.19-1.005-.295a.762.762 0 0 1-.157-.096ZM8.99 8a1 1 0 0 0 0 2H9a1 1 0 1 0 0-2h-.01Zm6 0a1 1 0 1 0 0 2H15a1 1 0 1 0 0-2h-.01Z" clipRule="evenodd" />
                                    </svg>
                                    {(dependency.score?.detail.popularity * 100).toFixed(1)}<br />
                                </div>
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M8 3a3 3 0 0 0-1 5.83v6.34a3.001 3.001 0 1 0 2 0V15a2 2 0 0 1 2-2h1a5.002 5.002 0 0 0 4.927-4.146A3.001 3.001 0 0 0 16 3a3 3 0 0 0-1.105 5.79A3.001 3.001 0 0 1 12 11h-1c-.729 0-1.412.195-2 .535V8.83A3.001 3.001 0 0 0 8 3Z" />
                                    </svg>
                                    {(dependency.score?.detail.quality * 100).toFixed(1)}<br />
                                </div>
                            </div>
                            <label className={styles.version}>
                                {dependency.package?.version}
                            </label>
                        </div>


                        <div className={styles.author}>
                            <div>
                                <div className={styles.logo}>
                                    <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                        <path fillRule="evenodd" d="M12 20a7.966 7.966 0 0 1-5.002-1.756l.002.001v-.683c0-1.794 1.492-3.25 3.333-3.25h3.334c1.84 0 3.333 1.456 3.333 3.25v.683A7.966 7.966 0 0 1 12 20ZM2 12C2 6.477 6.477 2 12 2s10 4.477 10 10c0 5.5-4.44 9.963-9.932 10h-.138C6.438 21.962 2 17.5 2 12Zm10-5c-1.84 0-3.333 1.455-3.333 3.25S10.159 13.5 12 13.5c1.84 0 3.333-1.455 3.333-3.25S13.841 7 12 7Z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                {dependency.package?.publisher?.username}
                            </div>
                            <div>
                                <div className={styles.logo}>
                                    <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                        <path fillRule="evenodd" d="M3.559 4.544c.355-.35.834-.544 1.33-.544H19.11c.496 0 .975.194 1.33.544.356.35.559.829.559 1.331v9.25c0 .502-.203.981-.559 1.331-.355.35-.834.544-1.33.544H15.5l-2.7 3.6a1 1 0 0 1-1.6 0L8.5 17H4.889c-.496 0-.975-.194-1.33-.544A1.868 1.868 0 0 1 3 15.125v-9.25c0-.502.203-.981.559-1.331ZM7.556 7.5a1 1 0 1 0 0 2h8a1 1 0 0 0 0-2h-8Zm0 3.5a1 1 0 1 0 0 2H12a1 1 0 1 0 0-2H7.556Z" clipRule="evenodd" />
                                    </svg>
                                </div>

                                {dependency.package?.publisher?.email}
                            </div>
                        </div>
                        <div className={styles.description}>
                            <div className={styles.name}>
                                <b>
                                    {dependency.package?.name}
                                </b>
                                <label className={styles.date}>
                                    {calculateTimeAgo(dependency.package?.date)}
                                </label>
                            </div>
                            <p>
                                {dependency.package?.description}
                            </p>
                        </div>

                        <div className={styles.keywords}>
                            {dependency.flags?.insecure ? (
                                <label className={`${styles.tag} ${styles.insecure}`} >
                                    Insecure
                                </label>
                            ) : (
                                <div className={styles.none}/>
                            )}
                            {dependency.flags?.unstable ? (
                                <label className={`${styles.tag} ${styles.unstable}`}>
                                    Unstable
                                </label>
                            ) : (
                                <div className={styles.none}/>
                            )}
                            {dependency.package?.keywords?.map((keyword, index) => (
                                <div className={styles.tag}>
                                    {keyword}
                                </div>
                            ))}
                        </div>

                        {dependency.package?.links?.bugs && (
                            <div className={styles.link}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.213 9.787a3.391 3.391 0 0 0-4.795 0l-3.425 3.426a3.39 3.39 0 0 0 4.795 4.794l.321-.304m-.321-4.49a3.39 3.39 0 0 0 4.795 0l3.424-3.426a3.39 3.39 0 0 0-4.794-4.795l-1.028.961" />
                                </svg>
                                <span>
                                    {dependency.package?.links?.bugs}
                                </span>
                            </div>
                        )}
                        {dependency.package?.links?.homepage && (
                            <div className={styles.link}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.213 9.787a3.391 3.391 0 0 0-4.795 0l-3.425 3.426a3.39 3.39 0 0 0 4.795 4.794l.321-.304m-.321-4.49a3.39 3.39 0 0 0 4.795 0l3.424-3.426a3.39 3.39 0 0 0-4.794-4.795l-1.028.961" />
                                </svg>
                                <span>
                                    {dependency.package?.links?.homepage}
                                </span>
                            </div>
                        )}
                        {dependency.package?.links?.npm && (
                            <div className={styles.link}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.213 9.787a3.391 3.391 0 0 0-4.795 0l-3.425 3.426a3.39 3.39 0 0 0 4.795 4.794l.321-.304m-.321-4.49a3.39 3.39 0 0 0 4.795 0l3.424-3.426a3.39 3.39 0 0 0-4.794-4.795l-1.028.961" />
                                </svg>
                                <span>
                                    {dependency.package?.links?.npm}
                                </span>
                            </div>
                        )}
                        {dependency.package?.links?.repository && (
                            <div className={styles.link}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.213 9.787a3.391 3.391 0 0 0-4.795 0l-3.425 3.426a3.39 3.39 0 0 0 4.795 4.794l.321-.304m-.321-4.49a3.39 3.39 0 0 0 4.795 0l3.424-3.426a3.39 3.39 0 0 0-4.794-4.795l-1.028.961" />
                                </svg>
                                <span>
                                    {dependency.package?.links?.repository}
                                </span>
                            </div>
                        )}

                        {dependency.package?.links?.maintainers?.map((maintainer, index) => (
                            <div>
                                {maintainer.email}
                                {maintainer.username}
                            </div>
                        ))}


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




const DepNpm = ({ dependency }) => {
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