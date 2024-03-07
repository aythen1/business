import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import { v4 as uuidv4 } from 'uuid';

import Table from './table'
import styles from './index.module.css'
import stylesModal from './modal.module.css'


import {
  addPolice,
  fetchsPolice
} from '@/actions/iam'


import {
  setModal
} from '@/slices/iamSlice'
import { useNavigate } from 'react-router-dom';



const TablePolices = ({
  polices
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [stateTable, setStateTable] = useState('')

  const handleClickSupport = () => {
    navigate(`/${'es'}/app/support`)
}


  const initialValue = {
    id: uuidv4(),
    name: '',
    description: '',
    target: 'none|users|applications|',
    tags: [],
    resource: '',
    performedBy: {
      email: '',
      userId: uuidv4()
    },
    createdAt: new Date()
  }


  return (
    <div className={styles.container}>
      <div className={styles.grid2}>
        <p className={styles.text}>
          This is a list of the policies in this Organization. You can view more information about each policy.
          <a onClick={() => handleClickSupport()}>
            What are policies?
            <svg viewBox="0 0 24 24" ><path d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z"></path></svg>
          </a>
        </p>
        <button
          onClick={() => dispatch(setModal(<PopupModalRules styles={stylesModal} />))}
          className={styles.button}
        >
          <svg viewBox="0 0 24 24"><path d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z"></path></svg>
          Create Policy
        </button>
      </div>
      <div>
        <Table
          fetchs={fetchsPolice}
          items={polices}
          setStateTable={setStateTable}
          handleAdd={() => dispatch(setModal(<PopupModalRules styles={stylesModal} />))}

        >
          <header>
            Polices
          </header>
          <item>
            Name
          </item>
        </Table>
      </div>
    </div>
  )
}

export default TablePolices





const PopupModalRules = ({ styles }) => {
  const dispatch = useDispatch()
  const [isActive, setIsActive] = useState(false)

  const [state, setState] = useState({
    name: '',
    description: '',
    target: '',
    resource: '',
    tags: [],
  });

  const handleInputChange = (e, property) => {
    let value = e;
    if (e.target) {
      value = e.target.value;
    }

    if (property === 'name') {
      const isValidValue = value.trim() !== '';
      setIsActive(isValidValue);
    }


    setState((prevState) => ({
      ...prevState,
      [property]: value,
    }));
  };


  const handleAddPolice = () => {
    const data = {
      name: state.name,
      description: state.description,
      resource: state.resource,
      target: 'none',
    }

    dispatch(addPolice({police: data}))
    dispatch(setModal(null))
  }


  return (
    <div className={styles.modal}>
      <h2 className={styles.title} styles={{ marginTop: -14 }}>
        Rules
      </h2>
      <p className={styles.text}>
        A rule consists of a scope (eg. Project level or Organization level) and one or more permission sets (eg. "list all Instances").
        Rules, therefore, define the actions that principals (users, applications and groups) can perform on resources within the selected scope.
        <a className={styles.ancle}>
          Learn more about rules.
          <svg viewBox="0 0 24 24"><path d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z"></path></svg>
        </a>
      </p>
      <div className={styles.box}>
        <div className={styles.gird2}>
          <h2 className={styles.title}>
            Rule #1
          </h2>
          <div className={styles.buttonItem} style={{marginLeft: 'auto'}}>
            {true ? (
              <div className={styles.buttonItem}>
                <button className={`${styles.xs} ${styles.edit}`}>
                  <svg viewBox="0 0 24 24" ><path d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z"></path></svg>
                </button>
                <button className={`${styles.xs} ${styles.edit}`}>
                  <svg viewBox="0 0 24 24" ><path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z"></path></svg>
                </button>
              </div>
            ) : (
              <button>
                <svg viewBox="0 0 24 24" ><path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"></path></svg>
              </button>

            )}
          </div>
        </div>
        <div className={styles.rule}>
          <div className={styles.headerRule}>
            <label className={styles.labelNum}>
              1
            </label>
            <b className={styles.textBold}>
              Cope
            </b>
          </div>
          <div>
            {true ? (
              <div className={styles.info}>
                <label>
                  Organization
                </label>
                  <svg viewBox="0 0 24 24" ><path d="M11,9H13V7H11M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M11,17H13V11H11V17Z"></path></svg>
                  IAM and billing permission sets can only be selected at Organization level.
             
              </div>
            ) : (
              <div>
                <div>
                  <div>
                    <input type="checkbox" />
                    <div>
                      <span>
                        Access to resources
                      </span>
                      <p>
                        Give access to resources (Instances, Object Storage, Databases, etc) in your Projects.
                      </p>
                      <input />
                    </div>
                  </div>
                  <div>
                    <input type="checkbox" />
                    <div>
                      <span>
                        Access to Organization features
                      </span>
                      <p>
                        Give access to IAM, billing, support and abuse tickets and project management, all handled at Organization level.
                      </p>
                    </div>
                  </div>
                </div>
                <button>
                  Validate
                </button>
              </div>
            )}
          </div>
        </div>
        <div className={styles.rule}>
          <div className={styles.headerRule}>
            <label className={styles.labelNum}>
              2
            </label>
            <b className={styles.textBold}>
              Permission sets
            </b>
          </div>
          <div className={styles.info}>
            <label>
              OrganizationManager
            </label>
          </div>
        </div>
      </div>
      <div className={styles.button}>
        <button 
          onClick={() => handleAddPolice()}
          className={styles.active}
        >
          <svg viewBox="0 0 24 24"><path d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z"></path></svg>
          Add rule
        </button>
      </div>
    </div>
  )
}
