import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import FlagEN from './assets/flags/en.png'
import FlagES from './assets/flags/es.png'
import FlagFR from './assets/flags/fr.png'
import FlagDE from './assets/flags/de.png'

import styles from './SelectFlags.module.css'


const languagesData = [
  {
    iso: 'es',
    name: 'Español',
    flag: FlagES,
    extension: '+34',
  },
  {
    iso: 'en',
    name: 'English',
    flag: FlagEN,
    extension: '+44',
  },
  {
    iso: 'fr',
    name: 'Français',
    flag: FlagFR,
    extension: '+33',
  },
  {
    iso: 'fr',
    name: 'Deutsch',
    flag: FlagDE,
    extension: '+49',
  },
];


const LanguageSelector = ({ isLeft = false, isExtension = false, onSelectLanguage }) => {
  const [isActive, setIsActive] = useState(false)

  const [searchTerm, setSearchTerm] = useState('');
  const [filteredLanguages, setFilteredLanguages] = useState(languagesData);
  const [selectedLanguage, setSelectedLanguage] = useState(languagesData[0]);

  useEffect(() => {
    // Filtra los idiomas según el término de búsqueda
    const filtered = languagesData.filter((language) =>
      language.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredLanguages(filtered);
  }, [searchTerm]);


  const handleClickSelect = () => {
    setIsActive(true)
  }



  const handleSelectLanguage = (language) => {
    setSearchTerm('')
    setIsActive(false)

    setSelectedLanguage(language);
    onSelectLanguage(language);
  }

  const handleClickOut = () => {
    setIsActive(false)
  }

  return (
    <div >
      {isActive ? (
        <div>
          <div
            className={styles.overlay}
            onClick={() => handleClickOut()}
          />
          <div className={`${styles.input} ${isLeft && styles.left}`}>
            <input
              className={styles.search}
              type="text"
              placeholder="Buscar..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <ul className={styles.list}>
              {filteredLanguages.map((language) => (
                <li
                  key={language.iso}
                  onClick={() => handleSelectLanguage(language)}
                >
                  <img src={language.flag} alt={language.name} />
                  {language.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <div
          onClick={() => handleClickSelect()}
          className={styles.selected}
        >
          <img src={selectedLanguage.flag} alt={selectedLanguage.name} />
          {isExtension && (
            <span>
              {selectedLanguage.extension}
            </span>
          )}
        </div>
      )}

    </div>
  );
};

LanguageSelector.propTypes = {
  onSelectLanguage: PropTypes.func.isRequired,
};

export default LanguageSelector;
