// 'use client'
// import { useDispatch, useSelector } from 'react-redux'
// import { useState, useRef, useEffect } from 'react'
// import { updateUser } from '../../../../../../store/redux/actions/user.js'
// import {
//   createNewFolder,
//   addFolderLocal,
//   uploadFile
// } from '@/store/redux/actions/assets'
// import style from './DriveLeftPanel.module.css'
// import Image from 'next/image'
// // import Chevron from '../../../../../../../assets/Vector 161 (Stroke).svg'
// import Search from '../../../../../../../assets/search.svg'
// import Sun from '../../../../../../../assets/SunDim.svg'
// import Info from '../../../../../../../assets/Info.svg'
// import Group from '../../../../../../../assets/Group.svg'
// import Star from '../../../../../../../assets/Star.svg'
// import Trash from '../../../../../../../assets/Trash.svg'
// import Time from '../../../../../../../assets/Time.svg'

// import Folder from '../../../../../../../assets/FolderFigma.svg'
// import file1 from '@/public/assets/editor/assetManager/File-to-upload.svg'
// import MyDocs from '@/public/assets/MyDocs.svg'
// import { setSearchFiles } from '@/store/redux/slices/assetsSlices'
// import Modal from 'react-modal'

// import { useRouter, useParams } from 'next/navigation'

// export default function DriveLeftPanel() {
//   const params = useParams()
//   const router = useRouter()

//   console.log({ params })
//   const { id, driveId, lng } = params

//   const componentRef = useRef(null)
//   const fileInputRef = useRef(null)

//   const dispatch = useDispatch()
//   const { user } = useSelector((state) => state.persistedReducer.user)
//   // const user = JSON.parse(localStorage.getItem('user')).user
//   const { currentFolder, loading, searchFiles } = useSelector(
//     (state) => state.assets
//   )
//   const [nameFolder, setNameFolder] = useState('')
//   const [newPopup, setNewPopup] = useState(false)
//   const [modalIsOpen, setModalIsOpen] = useState(false)
//   const isCreatingFolder = loading?.UPDATE_DIRECTORY === true
//   const handleScreenMode = () => {
//     const body = document.body
//     const newId = body.id === 'dark' ? 'light' : 'dark'
//     body.id = newId
//     const updatedUser = { ...user, theme: newId }
//     dispatch(updateUser(user.id, updatedUser))
//   }
//   const handleCreateNewFolder = async () => {
//     if (!nameFolder.trim()) {
//       return
//     }

//     const folderPath =
//       currentFolder === ''
//         ? `${id}/${nameFolder}`
//         : `${currentFolder}/${nameFolder}`
//     // Puedes verificar si ya existe una carpeta con ese nombre aquí
//     // y modificar newFolderName en consecuencia, por ejemplo, añadiendo un número

//     await dispatch(createNewFolder(folderPath))
//     console.log('listo')
//     dispatch(addFolderLocal(folderPath + '/'))
//     // Limpiar el estado después de crear la carpeta
//     setModalIsOpen(false)
//     setNameFolder('')
//   }
//   const handleFileInputChange = (event) => {
//     const file = event.target.files[0]

//     if (file) {
//       dispatch(
//         uploadFile({
//           file,
//           path: currentFolder === '' ? id : currentFolder
//         })
//       )
//     }
//     setNewPopup(false)
//   }
//   const handleNavigate = (path) => {
//     router.push(`/${lng}/workspace/${id}/drive/${driveId}/${path}`)
//   }

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (componentRef.current && !componentRef.current.contains(event.target))
//         setNewPopup(false)
//     }
//     document.addEventListener('mousedown', handleClickOutside)
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside)
//     }
//   }, [])

//   return (
//     <div className={style.main_drive_left_panel}>
//       <div className={style.drive_transformers_container}>
//         <div
//           style={{ display: 'inline-flex', justifyContent: 'space-between' }}
//         >
//           <div className={style.drive_transformers_title_container}>
//             <div
//               style={{
//                 gap: '5px',
//                 display: 'inline-flex',
//                 alignItems: 'center'
//               }}
//             >
//               <div
//                 style={{
//                   width: '10px',
//                   height: '10px',
//                   backgroundColor: 'blue',
//                   borderRadius: '10px'
//                 }}
//               ></div>
//               <h5 className={style.drive_transformes_title}>Transformers</h5>
//             </div>
//             {/* <img src={Chevron} /> */}
//           </div>
//           <img src={Sun} onClick={handleScreenMode} />
//         </div>
//         <div className={style.drive_input_container}>
//           <img src={Search} />
//           <input
//             type="text"
//             placeholder="Search documentation"
//             className={style.drive_input}
//             onChange={(e) => dispatch(setSearchFiles(e.target.value))}
//             value={searchFiles}
//           />
//           <div className={style.drive_shortcut_container}>
//             <p className={style.drive_shortcut_text}>Ctrl+F</p>
//           </div>
//         </div>
//       </div>
//       <div
//         onClick={() => setNewPopup(!newPopup)}
//         className={style.drive_create_new_container}
//       >
//         <p className={style.drive_create_new}>+ Crear nuevo</p>
//       </div>
//       <div className={style.drive_options_container}>
//         <div className={style.drive_option}>
//           <img src={Info}  />
//           <p className={style.drive_option_text}>Prioritarios</p>
//         </div>
//         <div className={style.drive_option}>
//           <img src={MyDocs}  />
//           <p
//             className={style.drive_option_text}
//             onClick={() => handleNavigate('my-drive')}
//           >
//             Mis documentos
//           </p>
//         </div>
//         <div className={style.drive_option}>
//           <img src={Group}  />
//           <p className={style.drive_option_text}>Compartidos conmigo</p>
//         </div>
//         <div className={style.drive_option}>
//           <img src={Star}  />
//           <p className={style.drive_option_text}>Recientes</p>
//         </div>
//         <div className={style.drive_option}>
//           <img src={Time} />
//           <p className={style.drive_option_text}>Destacados</p>
//         </div>
//         <div
//           className={style.drive_option}
//           onClick={() => handleNavigate('trash')}
//         >
//           <img src={Trash} />
//           <p className={style.drive_option_text}>Eliminados</p>
//         </div>
//       </div>
//       <div
//         ref={componentRef}
//         className={`${style.drive_create_new_popup_container} ${
//           newPopup ? style.show : ''
//         }`}
//       >
//         <div
//           onClick={() => {
//             setNewPopup(false)
//             setModalIsOpen(true)
//           }}
//           className={style.drive_create_new_option}
//         >
//           <img src={Folder} width={25} height={25} />

//           <p>Nueva carpeta</p>
//         </div>
//         <div
//           onClick={() => {
//             // Abrir el explorador de archivos al hacer clic
//             if (fileInputRef.current) {
//               fileInputRef.current.click()
//             }
//           }}
//           className={style.drive_create_new_option}
//         >
//           <img src={file1} width={25} height={25} />
//           <p>Subir archivo</p>
//           <input
//             type="file"
//             ref={fileInputRef}
//             style={{ display: 'none' }}
//             onChange={handleFileInputChange}
//           />
//         </div>
//         <div className={style.drive_create_new_option}>
//           <img src={file1} width={25} height={25} />

//           <p>Subir carpeta</p>
//         </div>
//       </div>
//       <Modal
//         className={style.modalContainer}
//         isOpen={modalIsOpen}
//         onRequestClose={() => setModalIsOpen(false)}
//       >
//         <div className={style.drive_modal_container}>
//           {isCreatingFolder ? (
//             <div
//               style={{
//                 display: 'flex',
//                 justifyContent: 'center',
//                 alignItems: 'center'
//               }}
//             >
//               <p style={{ fontSize: '18px' }}>Un momento...</p>
//             </div>
//           ) : (
//             <>
//               <div
//                 style={{ borderBottom: '1px solid #c6c6c6' }}
//                 className={style.drive_modal_title_container}
//               >
//                 <p className={style.drive_modal_title}>Nueva carpeta</p>
//               </div>
//               <div style={{ padding: '10px' }}>
//                 <div className={style.drive_modal_name_container} tabIndex="0">
//                   <input
//                     className={style.drive_modal_name}
//                     autoFocus
//                     value={nameFolder}
//                     onChange={(e) => {
//                       e.preventDefault()
//                       setNameFolder(e.target.value)
//                     }}
//                   />
//                 </div>
//               </div>
//               <div className={style.drive_modal_buttons_container}>
//                 <span
//                   style={{ color: 'blue', cursor: 'pointer' }}
//                   onClick={(e) => {
//                     setNameFolder('')
//                     setModalIsOpen(false)
//                   }}
//                 >
//                   Cancelar
//                 </span>
//                 <span
//                   onClick={handleCreateNewFolder}
//                   style={{ color: 'blue', cursor: 'pointer' }}
//                 >
//                   Crear
//                 </span>
//               </div>
//             </>
//           )}
//         </div>
//       </Modal>
//     </div>
//   )
// }
