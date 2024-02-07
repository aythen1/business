
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import styles from "./index.module.css";


import IconSearch from './assets/IconSearch.svg'


// import {
//   listGPT,
//   listTools
// } from './utilsGPT'


import { 
  updateDefault,
  fetchsDefault
} from '@/actions/iam'

const OpenAI = ({ }) => {

  const dispatch = useDispatch()

  const {
      addons,
      gpts
  } = useSelector((state) => state.iam)





  function getRandomItemsFromArray(array, numItems) {
    const randomIndices = [];

    // Generate unique random indices
    while (randomIndices.length < numItems) {
      const index = Math.floor(Math.random() * array.length);
      if (!randomIndices.includes(index)) {
        randomIndices.push(index);
      }
    }

    // Get the elements corresponding to the random indices
    const randomItems = randomIndices.map((index) => array[index]);

    return randomItems;
  }

  // const randomlistGPT = getRandomItemsFromArray(listGPT, 4);

  const [searchGPT, setSearchGPT] = useState('')
  const [filteredGPT, setFilteredGPT] = useState([]);
  const [filteredTools, setFilteredTools] = useState([]);


    //
    useEffect(() => {
      if (addons.length == 0 || gpts.length == 0) {
        dispatch(fetchsDefault({}))
      }
    }, [])
  
    useEffect(() => {

      console.log('addons', addons, gpts)
      setFilteredGPT(addons)
      setFilteredTools(gpts)

    }, [addons, gpts])


  const handleInputSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase(); // Convertir a minúsculas
    setSearchGPT(searchTerm);

    if (searchTerm.length > 0) {
      // Filtrar listGPT
      const filteredGPTResults = listGPT.filter(item => item.title.toLowerCase().includes(searchTerm));
      setFilteredGPT(filteredGPTResults);

      // Filtrar listTools
      const filteredToolsResults = listTools.filter(item => item.title.toLowerCase().includes(searchTerm));
      setFilteredTools(filteredToolsResults);

    }

  }





  const handleClickFav = (value, id) => {
    const data = {
      id,
      fav: value
    }

    dispatch(updateDefault({
      table: 'gpts',
      data
    }))
  }



  return (
    <div >
      <div className={styles["main"]}>
        <div className={styles["banner"]}>
          <h2 className={styles["title"]}>
            Store GPTs
          </h2>
          <p className={styles["text"]}>
            Discover and create custom versions of ChatGPT that combine instructions,
            extra knowledge any combinations of skills
          </p>
        </div>
        <div className={styles["search"]}>
          <div className={styles["icon"]}>
            <img src={IconSearch} />
          </div>
          <input
            type="text"
            className={styles["input"]}
            spellCheck={'false'}
            value={searchGPT}
            onChange={handleInputSearch}
          />
        </div>
        <div className={styles["tags"]}>
          <ul className={styles["list"]}>
            <li className={styles["item"] + ' ' + styles['selected']}>
              Top Picks
            </li>
            <li className={styles["item"]}>
              DALL-E
            </li>
            <li className={styles["item"]}>
              Writing
            </li>
            <li className={styles["item"]}>
              Research & Analysis
            </li>
            <li className={styles["item"]}>
              Phogram
            </li>
            <li className={styles["item"]}>
              Eductation
            </li>
          </ul>
        </div>
        <div className={styles["info"]}>
          <h2 className={styles["title"]}>
            Addon's
          </h2>
          <p className={styles["text"]}>
            Curated top picks from this wek
          </p>
        </div>
        <div className={styles["grid-main"]}>
          {filteredGPT.slice(0, 4).map((item, index) => (
            <div
              key={index}
              onClick={() => alert(1)}
              className={styles["grid"]}
            >
              <img src={item.image} className={styles["image"]} />
              <div className={styles["container"]}>
                <b className={styles["title"]}>
                  {item.title}
                </b>
                <p className={styles["description"]}>
                  {item.description}
                </p>
                <div className={styles["label"]}>
                  <span className={styles["author"]}>
                    By {item.labels.author}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className={styles["info"]}>
          <h2 className={styles["title"]}>
            Trending
          </h2>
          <p className={styles["text"]}>
            Most popular GPTs by our community
          </p>
        </div>
        <div className={styles["grid-secondary"]}>
          {filteredTools.map((item, index) => (
            <div
              key={index}
              onClick={() => alert(1)}
              className={styles["grid"]}
            >
              <div className={styles["left"]}>
                <div className={styles["num"]}>
                  {index + 1}
                </div>
                <img src={item.image} className={styles["image"]} />
              </div>
              <div className={styles["container"]}>
                <b className={styles["title"]}>
                  <div className={styles["buttonFav"]}>
                    {item.fav ? (
                      <button
                        className={styles["active"]}
                        onClick={(e) => {
                          e.stopPropagation()
                          handleClickFav(false, item.id)
                        }}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M7.8 2c-.5 0-1 .2-1.3.6A2 2 0 0 0 6 3.9V21a1 1 0 0 0 1.6.8l4.4-3.5 4.4 3.5A1 1 0 0 0 18 21V3.9c0-.5-.2-1-.5-1.3-.4-.4-.8-.6-1.3-.6H7.8Z" />
                        </svg>
                      </button>
                    ) : (
                      <button
                        className={styles["desactive"]}
                        onClick={(e) => {
                          e.stopPropagation()
                          handleClickFav(true, item.id)
                        }}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m17 21-5-4-5 4V3.9c0-.2 0-.5.2-.6l.6-.3h8.4c.2 0 .4 0 .6.3l.2.6V21Z" />
                        </svg>
                      </button>
                    )}
                  </div>
                  {item.title}
                </b>
                <p className={styles["description"]}>
                  {item.description}
                </p>
                <div className={styles["label"]}>
                  <span className={styles["author"]}>
                    By khanack.org
                  </span>
                  <span className={styles["downlaod"]}>
                    50.5K
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OpenAI;