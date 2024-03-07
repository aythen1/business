import React, { useState } from 'react';
import { listComponent } from './listComponent';

import styles from './listComponent.module.css'

const MenuRightComponent = ({ setOpenMenuRight }) => {
  const [searchInput, setSearchInput] = useState('');
  const [filteredComponents, setFilteredComponents] = useState(listComponent || []);
  const [expandedCategories, setExpandedCategories] = useState({});

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setSearchInput(inputValue);

    const filteredList = listComponent.filter((item) => {
      return (
        item.category.toLowerCase().includes(inputValue.toLowerCase()) ||
        item.title.toLowerCase().includes(inputValue.toLowerCase())
      );
    });

    setFilteredComponents(filteredList);
  };

  const groupedComponents = filteredComponents.reduce((acc, item) => {
    const category = item.category;

    if (!acc[category]) {
      acc[category] = [];
    }

    acc[category].push(item);

    return acc;
  }, {});

  const toggleCategoryExpansion = (category) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  return (
    <div>
      <div>
        <input
          type="text"
          value={searchInput}
          onChange={handleInputChange}
          placeholder={'Buscar componentes...'}
        />
      </div>
      <div>
        {Object.entries(groupedComponents).map(([category, components], index) => (
          <div key={index}>
            <div>
              <button onClick={() => toggleCategoryExpansion(category)}>
                {expandedCategories[category] ? 'Contraer' : 'Expandir'} {category}
              </button>
            </div>
            {expandedCategories[category] && (
              <ul className={styles['listComponent']}>
                {components.map((component, subIndex) => (
                  <li key={subIndex} className={styles['component']}>
                    <img src={component.path} alt={component.title} />
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuRightComponent;
