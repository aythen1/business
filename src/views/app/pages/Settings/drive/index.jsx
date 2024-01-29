'use client'

import React, {useState} from 'react'

import MyFiles from './components/my-files/my-files.jsx'
import LeftPanel from './components/left-panel/left-panel.jsx'

import styles from './index.module.css'

export default function Page({ params }) {
  const [isNew, setIsNew] = useState(false)

  return (
  <div>
    <div className={styles.main_drive}>
      <div className={styles.drive_left_panel}>
        <LeftPanel setIsNew={setIsNew} isNew={isNew} />
      </div>
      <div className={styles.drive_content}>
        <MyFiles setIsNew={setIsNew} params={params} />
      </div>
    </div>
  </div>
  )
}
