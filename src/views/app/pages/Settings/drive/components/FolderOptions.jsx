'use client'
import { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styles from './FolderOptions.module.css'
// import { IoTrashOutline, IoSettingsOutline } from 'react-icons/io5'
import {
  copyFile,
  obtainFileData
} from '@/actions/assets'

const FolderOptions = ({
  setShowFolderOption,
  handleDeleteFolder,
  folderName,
  directory
}) => {
  const dispatch = useDispatch()
  const { fileToCopy } = useSelector((state) => state.assets)
  const isCopyActive = fileToCopy !== ''
  const componentRef = useRef(null)
  const handlePasteFile = () => {
    const { directoryCopied, folderNameCopied, file } = fileToCopy
    const destinationKey = directory + folderNameCopied
    dispatch(copyFile({ sourceKey: directoryCopied, destinationKey, file }))
    dispatch(obtainFileData(''))
    setShowFolderOption(false)
  }
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (componentRef.current && !componentRef.current.contains(event.target))
        setShowFolderOption(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])
  return (
    <div ref={componentRef} className={styles.folderOptionsContainer}>
      <div
        className={isCopyActive ? styles.option : styles.optionDisabled}
        onClick={isCopyActive && handlePasteFile}
      >
        Paste
        {/* <IoSettingsOutline size={17} color="#00f" /> */}
      </div>
      <div
        onClick={() => {
          handleDeleteFolder(directory)
          setShowFolderOption(false)
        }}
        className={styles.option}
      >
        Delete Folder
        {/* <IoTrashOutline size={17} color="#D0342C" /> */}
      </div>
    </div>
  )
}

export default FolderOptions
