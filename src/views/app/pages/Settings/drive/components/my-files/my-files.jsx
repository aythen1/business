'use client'
import style from './my-files.module.css'
import { useDispatch, useSelector } from 'react-redux'
// import Image from 'next/image'
import Chevron from '../../assets/Vector 161 (Stroke).svg'
import ArrowDropDown from '../../assets/arrow-drop-down.svg'
// import ArrowUpWard from '../../assets/arrow-upward.svg'
import Folder from '../../assets/FolderFigma.svg'
import Imagen from '../../assets/imagen.svg'
import file1 from '../../assets/File (1).svg'

import { useState, useEffect } from 'react'
import {
  directoriesDB,
  getRootDirectories,
  deleteFolders,
  deleteFolder,
  deleteFile,
  getFile,
  uploadFile,
  obtainFileData,
  moveFile
} from '@/actions/assets'
// import { getElementTag } from '@/actions/component'
import {
  convertToMegabytes,
  calculateFolderSize,
  deleteItemsInDirectory,
  getFilesInDescendingOrder
} from '../../assetsAux'
import { setCurrentFolder } from '@/slices/assetsSlice'
import Menu from '../../assets/Menu-figma.svg'
import FolderOptions from '../FolderOptions'
import FileOptions from '../FileOptions'



export default function Page({ params, setIsNew }) {
  const dispatch = useDispatch()
  // const { driveId } = useParams();
  const { user } = useSelector((state) => state.iam)
  const driveId = '1234'

  console.log('driveId', driveId)

  const [showTypeDrive, setShowTypeDrive] = useState('cloud')

  const { directoriesData, loading, empty, fileToCopy, searchFiles } =
    useSelector((state) => state.assets)

  const [currentPath, setCurrentPath] = useState(driveId + '/')
  const [filteredFolders, setFilteredFolders] = useState([])
  const [folderOptions, setFolderOptions] = useState({})
  const [isDragginFile, setIsDragginFile] = useState(false)
  const [recentFiles, setRecentFiles] = useState([])
  const [filters, setFilters] = useState({})
  const [filtersData, setFiltersData] = useState([
    { name: 'Filter by:', option: 'All files', view: false },
    { name: 'Sort by:', option: 'Last viewed', view: false }
  ])


  // / / / / / / / / / / / / / / / / / / / u s e E F F E C T / / / / / / / / / / / / / / / / / / / / / / / /

  const handleClickFilter = (name) => {
    setFiltersData((prevFilters) => {
      return prevFilters.map((filter) => {
        if (filter.name === name) {
          // Toggle the 'view' property
          return { ...filter, view: !filter.view };
        }
        return filter;
      });
    });
  };

  // / / / / / / / / / / / / / / / / / / / u s e E F F E C T / / / / / / / / / / / / / / / / / / / / / / / /

  const [selectedFolders, setSelectedFolders] = useState([]);
  const [selectAll, setSelectAll] = useState(false);


  const handleCheckboxChange = (directory) => {
    const selectedIndex = selectedFolders.findIndex((selectedId) => selectedId.Key === directory.Key);

    if (selectedIndex !== -1) {
      // Si el directorio ya está seleccionado, lo quitamos de la lista
      setSelectedFolders(selectedFolders.filter((_, index) => index !== selectedIndex));
    } else {
      // Agregamos el directorio a la lista de seleccionados
      setSelectedFolders([...selectedFolders, directory]);
    }
  };

  const handleSelectAllChange = () => {
    if (selectAll) {
      setSelectedFolders([]);
    } else {
      const allFolders = filteredFolders.map((item) => item);
      setSelectedFolders(allFolders);
    }
    setSelectAll(!selectAll);
  };

  const handleDelete = async () => {
    await dispatch(deleteFolders(selectedFolders))

    setSelectedFolders([]);
    setSelectAll(false);
  };


  const handleDB = async () => {
    console.log('selectedFolders', selectedFolders)
    await dispatch(directoriesDB(selectedFolders))

    // setSelectedFolders([]);
    // setSelectAll(false);
  }

  // / / / / / / / / / / / / / / / / / / / u s e E F F E C T / / / / / / / / / / / / / / / / / / / / / / / /

  useEffect(() => {
    dispatch(getRootDirectories({ Prefix: driveId }))
  }, [])

  useEffect(() => {
    setRecentFiles(getFilesInDescendingOrder(directoriesData))
  }, [directoriesData])

  useEffect(() => {
    if (searchFiles !== '' && searchFiles !== undefined) {
      const filtered = directoriesData.filter(
        (folder) =>
          folder.Key.startsWith(currentPath) &&
          folder.Key !== currentPath &&
          folder.Key.toLowerCase().includes(searchFiles.toLowerCase())
      )

      // Ensure strict order based on the search string
      const sortedFiltered = filtered.sort((a, b) => {
        const indexA = a.Key.toLowerCase().indexOf(searchFiles.toLowerCase())
        const indexB = b.Key.toLowerCase().indexOf(searchFiles.toLowerCase())
        return indexA - indexB
      })

      setFilteredFolders(sortedFiltered)
    } else {
      // Reset filteredFolders when uploadSearch is empty
      const filtered = directoriesData.filter(
        (folder) =>
          folder.Key.startsWith(currentPath) &&
          folder.Key !== currentPath &&
          (folder.Size === 6 //cuando es una carpeta
            ? folder.Key.split('/').length ===
            currentPath.split('/').length + 1
            : folder.Key.split('/').length === currentPath.split('/').length)
      )


      setFilteredFolders(filtered)
    }
  }, [currentPath, directoriesData, searchFiles])

  // / / / / / / / / / / / / / / / / / / / / / F U N C I O N E S / / / / / / / / / / / / / / / / / / / /

  const handleFolderClick = (folderName) => {
    setCurrentPath(folderName)

    if (folderName.endsWith('/')) {
      // Si folderName termina con '/', quítalo antes de navegar
      folderName = folderName.slice(0, -1)
    }
    dispatch(setCurrentFolder(folderName))
  }

  const handleToggleFolderOption = (index) => {
    setFolderOptions((prevOptions) => {
      const newOptions = { ...prevOptions }
      newOptions[index] = !newOptions[index]
      return newOptions
    })
  }
  const handleDeleteDirectory = (path) => {
    dispatch(deleteFolder(path))
  }
  const clearStorage = (path) => {
    deleteItemsInDirectory(path, handleDeleteDirectory, directoriesData)
    dispatch(deleteFolder(path))
  }
  const sendFileToTrash = (path) => {
    dispatch(deleteFile({ path, VersionId: '' }))
  }

  const handleFolderClickBack = (folderName) => {
    if (folderName === driveId + '/') {
      dispatch(setCurrentFolder(folderName))
      setCurrentPath(folderName)
      return
    }
    const arr = currentPath.split('/')
    const index = arr.indexOf(folderName)
    if (index !== -1) {
      const newPath = arr.slice(0, index + 1)
      setCurrentPath(newPath.join('/') + '/')
      dispatch(setCurrentFolder(newPath.join('/')))
    }
  }
  const handleFileClick = (fileName) => {
    dispatch(getFile({ fileName }))
  }
  // / / / / / / / / / / / / / / / D R A G & D R O P / / / / / / / / / / / / / / / /

  const handleDragOver = (event) => {
    event.preventDefault()
  }
  const dropAndUpload = (directory, e, isFile) => {
    if (!isFile && isDragginFile) {
      const { directoryCopied, folderNameCopied, file } = fileToCopy

      const destinationKey = directory + folderNameCopied

      dispatch(moveFile({ sourceKey: directoryCopied, destinationKey, file }))

      dispatch(obtainFileData(''))
    } else if (!isFile) {
      e.preventDefault()
      let path = directory
      const file = e.dataTransfer.files[0]
      if (path.endsWith('/')) {
        path = directory.slice(0, -1)
      }

      dispatch(uploadFile({ file, path }))
    }
  }
  const handleDragStart = (directory, isFile, folderName) => {
    if (isFile) {
      setIsDragginFile(true)

      dispatch(
        obtainFileData({
          directoryCopied: directory.Key,
          folderNameCopied: folderName,
          file: directory
        })
      )
      dispatch(
        getFile({
          fileName: directory.Key
        }))
      dispatch(
        getElementTag({
          type: 'image',
          tag: 'img',
          tagName: 'img',
          rol: 'default'
        })
      )
    }
  }

  // / / / / / / / / / / / / / / / / M E T O D O S / / / / / / / / / / / / / /
  const isGettingFolder = loading?.GET_ALL_DIRECTORIES === true
  const renderFolders = (folders) => {
    // console.log('fgooold', isGettingFolder,folders, empty)

    if (isGettingFolder && folders.length === 0 && empty !== true) {
      return (
        <p className={style.emptyFolderMessage}>
          Un momento, por favor...
        </p>
      )
    }


    const handleDrop = (event) => {
      event.preventDefault();
      const file = event.dataTransfer.files[0];

      if (file) {
        dispatch(
          uploadFile({
            file,
            // path: currentFolder === '' ? id : currentFolder
            path: ''
          })
        );
      }
      // setNewPopup(false);
    };

    const handleDragOver = (event) => {
      event.preventDefault();
    };

    const handleDragStart = () => {
      // Puedes agregar lógica adicional si es necesario
    };



    if (folders.length === 0 && empty === true) {
      return (
        <div
          className={style.emptyFolderMessage}
          draggable
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onDragStart={handleDragStart}
        >
          Esta carpeta está vacía
        </div>
      )
    }

    return folders.map((directory, index) => {
      // console.log('ddirr', directory)
      const folderName = directory.Key.split('/').filter(Boolean).pop()
      const isFile = /\.(png|jpg|txt|jfif)$/i.test(folderName)
      const size = isFile
        ? convertToMegabytes(directory.Size)
        : convertToMegabytes(
          calculateFolderSize(directory.Key, directoriesData)
        )


      return (
        <div
          key={index}
          draggable
          onDragOver={handleDragOver}
          onDrop={(e) => dropAndUpload(directory.Key, e, isFile)}
          onDragStart={() => handleDragStart(directory, isFile, folderName)}
          className={style.drive_folder_container}
        >
          <div
            className={style.drive_clickeable_folder_container}
            onClick={() => {
              isFile
                ? handleFileClick(directory.Key)
                : handleFolderClick(directory.Key)
            }}
          >

            <div className={style.drive_folder_title_container}>
              <div>
                <input
                  type="checkbox"
                  className={`${style.input} ${selectedFolders.length > 0 ? '' : style.hidden}`}
                  checked={selectedFolders.some((selectedFolder) => selectedFolder.Key === directory.Key)}
                  onClick={(e) => {
                    e.stopPropagation()
                    handleCheckboxChange(directory)
                  }}
                />
              </div>
              <img src={isFile ? Imagen : Folder} />
              <p className={style.drive_folder_title}>{folderName}</p>
            </div>
            <div className={style.drive_folder_size_container}>
              <span>{size}</span>
            </div>
            <div className={style.drive_folder_lastmodified_container}>1d</div>
          </div>

          <div className={style.fileRightSection}>
            <span
              className={style.fileOption}
              onClick={() => handleToggleFolderOption(index)}
            >
              <img src={Menu} alt="" />
            </span>
          </div>

          {folderOptions[index] &&
            (isFile ? (
              <FileOptions
                setShowFolderOption={(value) =>
                  setFolderOptions((prevOptions) => ({
                    ...prevOptions,
                    [index]: value
                  }))
                }
                handleDeleteFolder={sendFileToTrash}
                folderName={folderName}
                directory={directory}
              />
            ) : (
              <FolderOptions
                setShowFolderOption={(value) =>
                  setFolderOptions((prevOptions) => ({
                    ...prevOptions,
                    [index]: value
                  }))
                }
                handleDeleteFolder={clearStorage}
                folderName={folderName}
                directory={directory.Key}
              />
            ))}
        </div>
      )
    })
  }



  const renderRecentFiles = (recentFilesFiltered) => {
    return recentFilesFiltered.slice(0, 3).map((file, index) => {
      const fileName = file.Key.split('/').filter(Boolean).pop()
      const size = convertToMegabytes(file.Size)
      return (
        <div
          className={style.drive_suggestion_container}
          key={index}
          onDragStart={() => handleDragStart(file.Key, true)}
          draggable
        >
          <div className={style.icon}>
            <div className={style.file}>
              <div className={style.vector}>
                <img src={file1} width={25} height={25} />
              </div>
            </div>
          </div>
          <div className={style.content}>
            <div className={style.title}>
              <div className={style.readmeRm}>{fileName}</div>
              <div className={style.kb}>{size}</div>
            </div>
          </div>
        </div>
      )
    })
  }


  const renderFilesDB = (recentFilesFiltered) => {
    return filteredFolders.slice(0, 3).map((file, index) => {
      const fileName = file.Key.split('/').filter(Boolean).pop()
      const size = convertToMegabytes(file.Size)
      return (
        <div
          className={style.drive_suggestion_container}
          key={index}
          onDragStart={() => handleDragStart(file.Key, true)}
          draggable
        >
          <div className={style.icon}>
            <div className={style.file}>
              <div className={style.vector}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="#4F0599"><g><g><path fill="fillCurrent" d="M12 5.5 14.5 3 17 5.5 14.5 8zm0 9 2.5-2.5 2.5 2.5-2.5 2.5zm-9 0L5.5 12 8 14.5 5.5 17zm0-9L5.5 3 8 5.5 5.5 8z" ></path><path fill="#A365F6" d="m7 10 3-3 3 3-3 3z" ></path></g></g></svg>
              </div>
            </div>
          </div>
          <div className={style.content}>
            <div className={style.title}>
              <div className={style.readmeRm}>{fileName}</div>
            </div>
            <div className={style.progress}>
              <div className={style.bar} />
              <div className={style.loader1}>{size}</div>
            </div>
          </div>
        </div>
      )
    })
  }




  return (
    <div className={style.main_drive_page}>
      <div className={style.drive_header}>
        <div className={style.drive_header_left}>
          <span
            onClick={() => setIsNew('title')}
            className={style.drive_header_left_title_container}
          >
            <p className={style.drive_header_left_title}>Documents</p>
            <img src={ArrowDropDown} />
          </span>
        </div>
        <div className={style.drive_header_right}>
          {filtersData.map((filter, index) => (
            <div key={index} style={{ position: 'relative' }} >
              <div className={style.drive_header_right_filter} onClick={() => handleClickFilter(filter.name)}>
                <p className={style.drive_header_right_filter_text}>
                  {filter.name}
                </p>
                <p className={style.drive_header_right_filter_text}>
                  {filter.option}
                </p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  alt="Chevron"
                >
                  <path
                    fill="currentColor"
                    d="M12 21l-12-18h24z"
                  />
                </svg>
              </div>
              {filter.view && (
                <ul className={style.drive_options}>
                  <li>
                    Name
                  </li>
                  <li>
                    Last modified
                  </li>
                  <li>
                    Last modified by me
                  </li>
                  <li>
                    Last opened by me
                  </li>
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className={style.drive_suggested_main}>
        <div className={style.drive_suggested_header}>
          {showTypeDrive == 'cloud' ? (
            <p className={style.drive_suggested_title}>Recent files</p>
          ) : (
            <p className={style.drive_suggested_title}>LanceDB</p>
          )}
          {showTypeDrive == 'cloud' ? (
            <button onClick={() => setShowTypeDrive('db')}>View db</button>
          ) : (
            <button onClick={() => setShowTypeDrive('cloud')}>View drive</button>
          )}
        </div>
        <div className={style.drive_suggested_container}>
          {showTypeDrive == 'cloud' ? (
            renderRecentFiles(recentFiles)
          ) : (
            renderFilesDB()
          )}
        </div>
      </div>
      <div className={style.drive_folders_main_container}>
        <div className={style.drive_folders_title_container}>
          <span
            onClick={() => handleFolderClickBack(driveId)}
            className={style.drive_folders_title}
          >
            Project
          </span>
          {currentPath
            .split('/')
            .slice(1, -1)
            .map((folder, index) => (
              <div
                key={index}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '9px'
                }}
              >
                <img
                  src={Chevron}
                  style={{ transform: 'rotate(-90deg)' }}
                />
                <span
                  key={index}
                  onClick={() => handleFolderClickBack(folder)}
                  className={style.drive_folders_title}
                >
                  {folder}
                </span>
                <p>
                  {index !== currentPath.split('/').length && (
                    // <Image src={Chevron} priority />
                    <div>
                      e
                    </div>
                  )}
                </p>
              </div>
            ))}
        </div>
        <div className={style.drive_folders_container}>
          <div className={style.drive_folders_filters_container}>
            <div className={style.drive_folders_filters_title_container}>
              <input
                className={`${style.input} ${selectedFolders.length > 0 ? '' : style.hidden}`}
                type="checkbox"
                checked={selectAll}
                onChange={handleSelectAllChange}
              />
              <p className={style.drive_folders_filters_title}>
                Name
              </p>
              <Filters name="name" filters={filters} setFilters={setFilters} />
            </div>
            <div className={style.drive_folder_size_container}>
              <p className={style.drive_folders_filters_title}>
                Tamaño
              </p>
              <Filters name="size" filters={filters} setFilters={setFilters} />
            </div>
            <div className={style.drive_folder_lastmodified_container}>
              <p className={style.drive_folders_filters_title}>
                Último modificado
              </p>
              <Filters name="lastedAt" filters={filters} setFilters={setFilters} />
            </div>
          </div>
          {renderFolders(filteredFolders)}
        </div>
      </div>

      {selectedFolders.length > 0 && (
        <div className={style.drive_banner_data}>
          <div>
            <input type="checkbox" checked={selectAll} onChange={handleSelectAllChange} />
            <p>
              {selectedFolders.length} items selected
            </p>
          </div>
          <div>
            <button
              onClick={handleDB}
              className={style.buttonDB}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="#4F0599" ><g ><g ><path fill="fillCurrent" d="M12 5.5 14.5 3 17 5.5 14.5 8zm0 9 2.5-2.5 2.5 2.5-2.5 2.5zm-9 0L5.5 12 8 14.5 5.5 17zm0-9L5.5 3 8 5.5 5.5 8z" ></path><path fill="#A365F6" d="m7 10 3-3 3 3-3 3z" ></path></g></g></svg>
            </button>
            <button
              onClick={handleDelete}
              className={style.buttonDelete}
            >
              <svg viewBox="0 0 24 24" ><path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z"></path></svg>
            </button>
          </div>
        </div>
      )}



    </div>
  )
}




const Filters = ({ name, filters, setFilters }) => {
  const [isActive, setIsActive] = useState(filters)
  console.log('filters', filters)
  const handleClick = (order) => {
    setFilters({ name, order });
  };

  return (
    <div
      className={`${style.filters} 
      ${filters.name !== name ? '' : filters.order == 'asc' ? style.bottom : style.top}
      `}
      onClick={() => handleClick(filters.order === 'asc' ? 'dsc' : 'asc')}
    >
      <svg
        className={style.top} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19V5m0 14-4-4m4 4 4-4" />
      </svg>
      <svg
        className={style.bottom} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v13m0-13 4 4m-4-4-4 4" />
      </svg>
    </div>
  )

}