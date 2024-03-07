import React, { useState, useEffect } from 'react';
import styles from './styles/SearchList.module.css'



const SearchList = ({ data, title, icon,  onSelect }) => {
  const [filter, setFilter] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [results, setResults] = useState([]);

  useEffect(() => {
    const filteredResults = data.filter(item =>
      item.toLowerCase().includes(filter.toLowerCase())
    );
    setResults(filteredResults);
  }, [filter, data]);

  const handleSelect = (item) => {
    setSelectedItem(item);
    setFilter('');
    setResults([]);
    onSelect && onSelect(item);
  };

  const handleInputChange = (e) => {
    setSelectedItem(null);
    setFilter(e.target.value);
  };

  return (
    <div className={styles.search}>
    
      <div dangerouslySetInnerHTML={{ __html: icon }} />
      <input
        type="text"
        placeholder="Buscar un producto..."
        value={selectedItem !== null ? selectedItem : filter}
        onChange={handleInputChange}
      />
      {filter && (
        <ul>
          {results.map((result, index) => (
            <li key={index} onClick={() => handleSelect(result)}>
              {result}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};


const App = (props) => {
  const icon = props.icon 
  const sampleData = props.data || [];
  const [selectedValue, setSelectedValue] = useState('');

  return (
    <div>
      <h1>{props.title || ''} </h1>
      <SearchList
        icon={icon}
        data={sampleData}
        onSelect={(item) => setSelectedValue(item)}
      />
    </div>
  );
};

export default App;