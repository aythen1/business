"use client";

import styles from "./index.module.css";

import React, { useEffect, useState } from "react";

import IconSearch from './assets/IconSearch.svg'


import {
  listGPT,
  listTools
} from './utilsGPT'



const OpenAI = ({ }) => {


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
  

  const randomlistGPT = getRandomItemsFromArray(listGPT, 4);

  return (
    <div >
      {/* <PreviewModal  /> */}
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
          <input type="text" className={styles["input"]} spellCheck={'false'}/>
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
              Featured
            </h2>
            <p className={styles["text"]}>
              Curated top picks from this wek
            </p>
          </div>
          <div className={styles["grid-main"]}>
            {randomlistGPT.slice(0, 4).map( (item, index) => (
              <div 
                key={index}
                onClick={() => alert(1)}
                className={styles["grid"]}
                >
                <img src={item.image}  className={styles["image"]}/>
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
          {listTools.map( (item, index) => (
            <div 
                key={index}
                onClick={() => alert(1)}
                className={styles["grid"]}
                >
                  <div className={styles["left"]}>
                    <div className={styles["num"]}>
                      {index+1}
                    </div>
                    <img src={item.image} className={styles["image"]} />
                  </div>
              <div className={styles["container"]}>
                <b className={styles["title"]}>
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