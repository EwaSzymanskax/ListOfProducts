import React, { useState } from 'react';
import Table from './Table';
import './App.css';
import { Route, HashRouter, Routes } from "react-router-dom";


function App() {
  const [value, setValue] = useState("");
  
  return (
    <div className='card'>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/react-modal/3.14.3/react-modal.min.js"
      integrity="sha512-MY2jfK3DBnVzdS2V8MXo5lRtr0mNRroUI9hoLVv2/yL3vrJTam3VzASuKQ96fLEpyYIT4a8o7YgtUs5lPjiLVQ=="
      crossOrigin="anonymous"
      referrerPolicy="no-referrer"></script>
      <div className='search'>Search:</div>
      <input type="number" value={value} onChange={e => setValue(e.target.value)}></input>
      <Routes>
        <Route exact path='/' element={<Table filterValue={value} />}></Route>
      </Routes>
    </div>  
  )
}


export default App;
