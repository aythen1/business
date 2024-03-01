import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';


import styles from "./index.module.css";
import * as Graphs from '@/views/graphs';


import IconArrow from './assets/IconArrow.svg'
import IconAdd from './assets/IconAdd.svg'
import IconEarse from './assets/IconEarse.svg'




import {
  fetchsVector,
  iniVector
} from '@/actions/vector'


import {
  setComponent,
} from '@/slices/dashboardSlice'

import {
  setOpenMenuRight
} from '@/actions/iam'





const regexOptions = ['Option1', 'Option2', 'Option3'];

const Data = ({ component, onSelectedChange }) => {
  const [state, setState] = useState({
    description: '',
    color: '',
    columnSize: '',
    type: '',

    vector: [0, 0, 1],
    filter: {}
  })


  // ---------------------------------------------------------

  const [isShowFilter, setIsShowFilter] = useState(false)
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



  // const [showSettings, setShowSettings] = useState(false);

  const handleSelect = () => {
    setShowSettings(!showSettings)

    if (!showSettings) {
      onSelectedChange(component);
    }
  };

  return (
    <div className={styles.boxData}>
      <div className={styles.headerInput}>
        <input
          spellCheck="false"
          className={styles.input}
          value={state.title || 'Not found'}
          onChange={(e) => {
            const updatedState = { ...state, title: e.target.value };
            setState(updatedState);
          }}
        />
        <div>
          {isShowFilter ? (
            <div onClick={() => setIsShowFilter(false)} >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"><path fillRule="evenodd" clipRule="evenodd" d="M15 10.5A3.502 3.502 0 0 0 18.355 8H21a1 1 0 1 0 0-2h-2.645a3.502 3.502 0 0 0-6.71 0H3a1 1 0 0 0 0 2h8.645A3.502 3.502 0 0 0 15 10.5zM3 16a1 1 0 1 0 0 2h2.145a3.502 3.502 0 0 0 6.71 0H21a1 1 0 1 0 0-2h-9.145a3.502 3.502 0 0 0-6.71 0H3z" fill="#000000" /></svg>
            </div>
          ) : (
            <div onClick={() => setIsShowFilter(true)} >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"><path d="M4.22657 2C2.50087 2 1.58526 4.03892 2.73175 5.32873L8.99972 12.3802V19C8.99972 19.3788 9.21373 19.725 9.55251 19.8944L13.5525 21.8944C13.8625 22.0494 14.2306 22.0329 14.5255 21.8507C14.8203 21.6684 14.9997 21.3466 14.9997 21V12.3802L21.2677 5.32873C22.4142 4.03893 21.4986 2 19.7729 2H4.22657Z" fill="#000000" /></svg>
            </div>
          )}
        </div>
        <input
          type="checkbox"
          className={styles.checkbox}
          checked={showSettings}
          onChange={handleSelect}
        />
      </div>
      {showSettings && (!isShowFilter ? (
        <div className={styles.boxForm}>
          <CustomData
            state={state}
            setState={setState}
            component={component}
            regexOptions={regexOptions}
          // onSelect={handleSelect} 
          />
        </div>
      ) : (
        <div className={styles.boxCustom}>
          <CustomBoard state={state} setState={setState} />
        </div>
      ))}
    </div>
  );
};

export default Data;


























const CustomBoard = ({ setState, state }) => {

  const [columnSize, setColumnSize] = useState(1)
  const [color, setColor] = useState('#000fff')

  const componentGraph = [
    "BarChartBorderRadius",
    "BubbleChart",
    "ComboBarLine",
    "DoughnutChart",
    "FloatingBarChart",
    "HorizontalBarChart",
    "LineChart",
    "LineStyling",
    "MultiSeriesPie",
    "PieChart",
    "PolarArea",
    "Radar",
    "ScatterChart",
    "StackedBarChart",
    "SteppedLineChart"
  ];



  const [selectedOption, setSelectedOption] = useState(null);
  const [isInputFocused, setIsInputFocused] = useState(false);

  const handleSelect = (id) => {
    setSelectedOption(id);
    // onSelect(id);
  };


  useEffect(() => {
    const updatedState = { ...state, columnSize: columnSize };
    setState(updatedState);
  }, [columnSize])


  useEffect(() => {
    const updatedState = { ...state, color: color };
    setState(updatedState);
  }, [color])


  return (
    <div>
      <div className={styles.header}>
        <div className={styles.color}>
          <ColorSelect color={color} setColor={setColor} />
        </div>
        <div className={styles.column}>
          {columnSize == 1 ? (
            <div onClick={() => setColumnSize(2)}>
              <svg className={styles.column1} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"><path d="M6 5C6 4.44772 6.44772 4 7 4H17C17.5523 4 18 4.44772 18 5V19C18 19.5523 17.5523 20 17 20H7C6.44772 20 6 19.5523 6 19V5Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </div>
          ) : columnSize == 2 ? (
            <div onClick={() => setColumnSize(3)}>
              <svg className={styles.column2} xmlns="http://www.w3.org/2000/svg" fill="#000000" viewBox="0 0 24 24"><path fillRule="evenodd" d="M8,2 C9.65685425,2 11,3.34314575 11,5 L11,19 C11,20.6568542 9.65685425,22 8,22 L5,22 C3.34314575,22 2,20.6568542 2,19 L2,5 C2,3.34314575 3.34314575,2 5,2 L8,2 Z M19,2 C20.6568542,2 22,3.34314575 22,5 L22,19 C22,20.6568542 20.6568542,22 19,22 L16,22 C14.3431458,22 13,20.6568542 13,19 L13,5 C13,3.34314575 14.3431458,2 16,2 L19,2 Z M8,4 L5,4 C4.44771525,4 4,4.44771525 4,5 L4,19 C4,19.5522847 4.44771525,20 5,20 L8,20 C8.55228475,20 9,19.5522847 9,19 L9,5 C9,4.44771525 8.55228475,4 8,4 Z M19,4 L16,4 C15.4477153,4 15,4.44771525 15,5 L15,19 C15,19.5522847 15.4477153,20 16,20 L19,20 C19.5522847,20 20,19.5522847 20,19 L20,5 C20,4.44771525 19.5522847,4 19,4 Z" /></svg>
            </div>
          ) : columnSize == 3 ? (
            <div onClick={() => setColumnSize(4)}>
              <svg className={styles.column3} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"><path d="M6.23694 3.0004C7.20344 3.0004 7.98694 3.7839 7.98694 4.7504V19.2504C7.98694 20.2169 7.20344 21.0004 6.23694 21.0004H3.73694C2.77044 21.0004 1.98694 20.2169 1.98694 19.2504V4.7504C1.98694 3.83223 2.69405 3.07921 3.59341 3.0062L3.73694 3.0004H6.23694ZM20.263 3.0004C21.2295 3.0004 22.013 3.7839 22.013 4.7504V19.2504C22.013 20.2169 21.2295 21.0004 20.263 21.0004H17.763C16.7965 21.0004 16.013 20.2169 16.013 19.2504V4.7504C16.013 3.7839 16.7965 3.0004 17.763 3.0004H20.263ZM13.2369 2.99957C14.2034 2.99957 14.9869 3.78307 14.9869 4.74957V19.2496C14.9869 20.2161 14.2034 20.9996 13.2369 20.9996H10.7369C9.77044 20.9996 8.98694 20.2161 8.98694 19.2496V4.74957C8.98694 3.78307 9.77044 2.99957 10.7369 2.99957H13.2369ZM6.23694 4.5004H3.73694L3.67962 4.50701C3.56917 4.53292 3.48694 4.63206 3.48694 4.7504V19.2504C3.48694 19.3885 3.59887 19.5004 3.73694 19.5004H6.23694C6.37501 19.5004 6.48694 19.3885 6.48694 19.2504V4.7504C6.48694 4.61233 6.37501 4.5004 6.23694 4.5004ZM20.263 4.5004H17.763C17.6249 4.5004 17.513 4.61233 17.513 4.7504V19.2504C17.513 19.3885 17.6249 19.5004 17.763 19.5004H20.263C20.4011 19.5004 20.513 19.3885 20.513 19.2504V4.7504C20.513 4.61233 20.4011 4.5004 20.263 4.5004ZM13.2369 4.49957H10.7369C10.5989 4.49957 10.4869 4.6115 10.4869 4.74957V19.2496C10.4869 19.3876 10.5989 19.4996 10.7369 19.4996H13.2369C13.375 19.4996 13.4869 19.3876 13.4869 19.2496V4.74957C13.4869 4.6115 13.375 4.49957 13.2369 4.49957Z" fill="#212121" /></svg>
            </div>
          ) : columnSize == 4 && (
            <div onClick={() => setColumnSize(1)}>
              <svg className={styles.column4} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 17 17" version="1.1"><path d="M1 17h3v-17h-3v17zM2 1h1v15h-1v-15zM5 17h3v-17h-3v17zM6 1h1v15h-1v-15zM9 17h3v-17h-3v17zM10 1h1v15h-1v-15zM13 0v17h3v-17h-3zM15 16h-1v-15h1v15z" fill="#000000" /></svg>
            </div>
          )}
        </div>
      </div>
      <div className={styles.textarea}>
        <textarea
          spellCheck="false"
          value={state?.description || 'Not found'}
          onChange={(e) => {
            const updatedState = { ...state, description: e.target.value };
            setState(updatedState);
          }}
        />
      </div>
      <div className={styles.graphs}>
        {componentGraph.map((graph, index) => {
          const Component = Graphs[graph];
          return (
            <div key={index} className={styles.graph}>
              <Component />
            </div>
          )
        })}
      </div>
    </div>
  )
}







































const CustomData = ({ component, state, setState, regexOptions }) => {
  const dispatch = useDispatch()

  const [color, setColor] = useState('#000fff')

  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [selectedData, setSelectedData] = useState(null);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [isActiveData, setIsActiveData] = useState(false);

  const [tokenVector, setTokenVector] = useState(iniVector({
    workspaceId: 'test1',
    projectId: 'test1'
  }))


  const { vector } = useSelector((state) => state.iam)


  // -------------------------------------------------------------------

  const openLanceDB = () => {
    if(isActiveData){
      dispatch(setComponent(null))
      dispatch(setOpenMenuRight(null))

    }else{
      dispatch(setComponent(component))
      dispatch(setOpenMenuRight('data'))
    }

    setIsActiveData(!isActiveData)
  }


  useEffect(() => {
    console.log('sdicwduc change vector', vector)
    if (isActiveData) {
      dispatch(setOpenMenuRight(false))
      setSearchTerm(vector.title)
    }
  }, [vector])

  // useEffect(() => {
  //   // Filtrar opciones según el término de búsqueda
  //   const filtered = options.filter(option =>
  //     option.title.toLowerCase().includes(searchTerm.toLowerCase())
  //   );
  //   setFilteredOptions(filtered);

  // }, [searchTerm]);

  const handleSelect = (id) => {
    setSelectedData(id);
    // onSelect(id);
  };


  useEffect(() => {
    const updatedState = { ...state, color: color };
    setState(updatedState);
  }, [color])


  // -------------------------------------------------------

  // Simulated data (replace this with your actual data fetching logic)
  const fetchData = async () => {
    const _dbs = await fetchsVector(tokenVector, 'datas', searchTerm)

    const filteredData = _dbs.filter(db =>
      db.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // dispatch(setVectors(_dbs))
    setFilteredData(filteredData);
  };

  // useEffect to fetch data when the component mounts or when the searchTerm changes
  useEffect(() => {
    fetchData();
  }, [searchTerm]);



  return (
    <div>
      <div
        className={styles.input}
      >
        <div className={`${isActiveData ? styles.active : ''}`} >
          <input
            spellCheck="false"
            type="text"
            placeholder="Buscar LanceDB.."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          // onFocus={() => setIsInputFocused(true)}
          // onBlur={() => setIsInputFocused(false)}
          />
          <button onClick={() => openLanceDB()}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="#4F0599"><g><g><path fill="fillCurrent" d="M12 5.5 14.5 3 17 5.5 14.5 8zm0 9 2.5-2.5 2.5 2.5-2.5 2.5zm-9 0L5.5 12 8 14.5 5.5 17zm0-9L5.5 3 8 5.5 5.5 8z"></path><path fill="#A365F6" d="m7 10 3-3 3 3-3 3z"></path></g></g></svg>
          </button>
        </div>
      </div>
      {(isInputFocused || searchTerm.length > 0) && (
        <ul onClick={(e) => e.stopPropagation()}>
          {filteredData.map((data) => (
            <li
              key={data.id}
              onClick={() => handleSelect(data.id)}
            >
              <div className={styles.title}>
                <h3>{data.title}</h3>
                <div className={styles.right}>
                  <div className={styles.bar}>
                    <div className={styles.progress} />
                  </div>
                  <div className={styles.boxColor}>
                    <ColorSelect color={color} setColor={setColor} />
                  </div>
                </div>
              </div>
              <div className={styles.boxList}>
                <RegexList options={regexOptions} />
              </div>
            </li>
          ))}
        </ul>
      )}
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
        <div key={index} className={styles.regexList}>
          <div >
            <select value={regex.selectValue} onChange={(e) => handleSelectChange(index, e.target.value)}>
              {options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <button
              className={styles.buttonDelete}
              onClick={() => handleRemoveRegex(index)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -0.5 21 21" version="1.1" fill="red"> <g id="Page-1" stroke="none" strokeWidth="1" fillRule="evenodd"> <g id="Dribbble-Light-Preview" transform="translate(-179.000000, -360.000000)" fill="fillCurrent"> <g id="icons" transform="translate(56.000000, 160.000000)"> <path d="M130.35,216 L132.45,216 L132.45,208 L130.35,208 L130.35,216 Z M134.55,216 L136.65,216 L136.65,208 L134.55,208 L134.55,216 Z M128.25,218 L138.75,218 L138.75,206 L128.25,206 L128.25,218 Z M130.35,204 L136.65,204 L136.65,202 L130.35,202 L130.35,204 Z M138.75,204 L138.75,200 L128.25,200 L128.25,204 L123,204 L123,206 L126.15,206 L126.15,220 L140.85,220 L140.85,206 L144,206 L144,204 L138.75,204 Z" id="delete-[#1487]"></path> </g> </g> </g> </svg>
            </button>
          </div>
          <input
            type="text"
            value={regex.userInput}
            onChange={(e) => handleInputChange(index, e.target.value)}
            placeholder="Expresión regular..."
          />
        </div>
      ))}
      <button
        className={styles.addRegex}
        onClick={handleAddRegex}
      >
        Nuevo Campo
      </button>
    </div>
  );
};







const ColorSelect = ({ color, setColor }) => {
  const [colors, setColors] = useState([]);

  useEffect(() => {
    generateRandomColors();
  }, []);

  const generateRandomColor = () => {
    // Genera un color hexadecimal aleatorio
    const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    return randomColor;
  };

  const generateRandomColors = () => {
    // Genera un array de 5 colores aleatorios
    const randomColors = Array.from({ length: 5 }, generateRandomColor);
    setColors([color, ...randomColors]);
  };

  const handleColorClick = (index) => {
    if (index == 0) return
    // Cambia el color en la posición especificada por uno nuevo aleatorio
    const selectedColor = colors[index]
    setColor(selectedColor)

    const newColors = [...colors];
    newColors[0] = selectedColor
    newColors[index] = generateRandomColor();
    setColors(newColors);
  };

  return (
    <div className={styles.gridColor}>
      {colors.map((color, index) => (
        <div
          key={index}
          className={styles.itemColor}
          style={{ backgroundColor: color }}
          onClick={() => handleColorClick(index)}
        />
      ))}
    </div>
  );
};

