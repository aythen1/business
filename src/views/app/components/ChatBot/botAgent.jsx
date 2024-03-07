import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import styles from './botAgent.module.css'



import {
    fetchChatbot,
    addChatbot 
  } from '@/actions/chatbot'



const BotAgent = ({
}) => {

    const dispatch = useDispatch()

    const {
        chatbot,
        chatbots
      } = useSelector((state) => state.chatbot)


    const [listChatbots, setListChatbots] = useState(chatbots)

    const _setChatbot = (id) => {
        console.log('=', id)
        dispatch(fetchChatbot(id))
    }


    const handleAddChatbot = () => {

        const data = {
            id: '',
            version: '',
            public: false,
            available: true,
            logo: '',
            name: '',
            description: '',
            num: 0,
            message: []
          }
      
        dispatch(addChatbot(data))
    }


    useEffect(() => {
        setListChatbots(chatbots)
    }, [chatbots])


    return (
        <div className={styles.agents}>
            <div
                className={styles.newChatbot}
                onClick={() => handleAddChatbot()}
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14m-7 7V5" />
                </svg>
            </div>
            {listChatbots.map((item, index) => (
                <div
                    key={index}
                    className={`${styles.initial} ${item.id == chatbot.id && styles.active}`}
                    onClick={() => _setChatbot(item.id)}
                >
                    A
                    {/* {chatbot.title[0].toUpperCase()} */}
                </div>
            ))}
        </div>
    )
}


export default BotAgent