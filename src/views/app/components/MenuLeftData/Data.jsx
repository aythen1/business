import React, { useState, useEffect } from 'react';
import styles from "./index.module.css";


import IconArrow from './assets/IconArrow.svg'
import IconAdd from './assets/IconAdd.svg'
import IconEarse from './assets/IconEarse.svg'
import IconTrash from './assets/IconTrash.svg'

const MenuLeftData = ({component}) => {

  const options = [
    { id: 1, title: 'Opción 1', mb: '10px', progress: 50 },
    { id: 2, title: 'Opción 2', mb: '20px', progress: 75 },
    { id: 3, title: 'Opción 3', mb: '15px', progress: 30 },
  ];


  const regexOptions = ['Option1', 'Option2', 'Option3'];


  // ---------------------------------------------------------



  const [showSettings, setShowSettings] = useState(false)

  const [inputs, setInputs] = useState([{
    title: 'hello world',
    description: 'hello world'
  }])

  const handleCancel = () => {

  }
  const handleSave = () => {

  }
  const handleHello = () => {
    alert(1)
  }


  const handleSelect = (id) => {
    // Aquí puedes manejar la opción seleccionada (por ejemplo, guardarla en el estado del componente principal)
    console.log('Opción seleccionada:', id);
  };

  return (
    <div>
      <div className={styles["header-input"]}>
        <input 
          value={component.title || 'Not found'}
          />
        <div>
          {showSettings ? (
            <button onClick={() => setShowSettings(!showSettings)}>
              <img src={IconArrow} />
            </button>
          ):(
          <button onClick={() => setShowSettings(!showSettings)}>
            <img src={IconEarse} />
          </button>
            )}
          <button onClick={() => setShowSettings(!showSettings)}>
            <img src={IconTrash} />
          </button>
        </div>
      </div>
      {showSettings && (
        <div>
          <div>
            <textarea
                value={component.description || 'Not found'}
              />
          </div>
          <div>
            <CustomSelect options={options} onSelect={handleSelect} />
            <RegexList options={regexOptions} />
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuLeftData;













const CustomSelect = ({ options, onSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredOptions, setFilteredOptions] = useState(options);
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    // Filtrar opciones según el término de búsqueda
    const filtered = options.filter(option =>
      option.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredOptions(filtered);
  }, [searchTerm, options]);

  const handleSelect = (id) => {
    setSelectedOption(id);
    onSelect(id);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Buscar..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ul>
        {filteredOptions.map((option) => (
          <li key={option.id} onClick={() => handleSelect(option.id)}>
            <div>
              <h3>{option.title}</h3>
              <p>Margen inferior: {option.mb}</p>
              <progress value={option.progress} max="100"></progress>
            </div>
          </li>
        ))}
      </ul>
      {selectedOption && <p>Seleccionado: {selectedOption}</p>}
    </div>
  );
};







const RegexList = ({ options }) => {
  const [regexList, setRegexList] = useState([{ selectValue: options[0], userInput: '' }]);

  const handleAddRegex = () => {
    setRegexList([...regexList, { selectValue: options[0], userInput: '' }]);
  };

  const handleRemoveRegex = (index) => {
    const updatedList = [...regexList];
    updatedList.splice(index, 1);
    setRegexList(updatedList);
  };

  const handleSelectChange = (index, value) => {
    const updatedList = [...regexList];
    updatedList[index].selectValue = value;
    setRegexList(updatedList);
  };

  const handleInputChange = (index, value) => {
    const updatedList = [...regexList];
    updatedList[index].userInput = value;
    setRegexList(updatedList);
  };

  return (
    <div>
      {regexList.map((regex, index) => (
        <div key={index}>
          <select value={regex.selectValue} onChange={(e) => handleSelectChange(index, e.target.value)}>
            {options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <input
            type="text"
            value={regex.userInput}
            onChange={(e) => handleInputChange(index, e.target.value)}
            placeholder="Expresión regular..."
          />
          <button onClick={() => handleRemoveRegex(index)}>Eliminar</button>
        </div>
      ))}
      <button onClick={handleAddRegex}>Agregar Regex</button>
    </div>
  );
};