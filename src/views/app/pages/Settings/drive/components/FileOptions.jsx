'use client'
import { useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import styles from './FolderOptions.module.css'
// import { IoTrashOutline, IoSettingsOutline } from 'react-icons/io5'
import { obtainFileData } from '@/actions/assets'

const FolderOptions = ({
  setShowFolderOption,
  handleDeleteFolder,
  folderName,
  directory
}) => {
  const dispatch = useDispatch()
  const componentRef = useRef(null)
  const handleCopyFile = () => {
    dispatch(
      obtainFileData({
        directoryCopied: directory.Key,
        folderNameCopied: folderName,
        file: directory
      })
    )
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
      <div className={styles.option} onClick={handleCopyFile}>
        Copy
        {/* <IoSettingsOutline size={17} color="#00f" /> */}
      </div>
      <div
        onClick={() => {
          handleDeleteFolder(directory.Key, directory?.VersionId ?? '')
          setShowFolderOption(false)
        }}
        className={styles.option}
      >
        Delete File
        {/* <IoTrashOutline size={17} color="#D0342C" /> */}
      </div>
    </div>
  )
}

export default FolderOptions
