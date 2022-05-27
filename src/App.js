import React from 'react'
import './App.css'
import { Routes, Route } from "react-router-dom"

//Components
import Navbartop from './components/navbar';
import MainPage from './components/mainpage';
import Bisection from "./components/bisection";
import FalsePosition from "./components/false_position";

function App() {
  return (
    <>
      <Navbartop />
      <Routes>
          <Route exact path='/' element={<MainPage />} />
          <Route path='/bisection' element={<Bisection />} />
          <Route path='/falseposition' element={<FalsePosition />} />
      </Routes>
    </>
  );
}

export default App;
