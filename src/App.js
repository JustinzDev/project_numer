import React from 'react'
import './App.css'
import { Routes, Route } from "react-router-dom"

//Components
import Navbartop from './components/navbar';
import MainPage from './components/mainpage';
import Bisection from "./components/bisection";
import FalsePosition from "./components/false_position";
import OnePoint from './components/onepoint';
import NewtonRaphson from './components/newton_raphson';
import Secant from './components/secant';

function App() {
  return (
    <>
      <Navbartop />
      <Routes>
          <Route exact path='/' element={<MainPage />} />
          <Route path='/bisection' element={<Bisection />} />
          <Route path='/falseposition' element={<FalsePosition />} />
          <Route path='/onepoint' element={<OnePoint />} />
          <Route path='/newtonraphson' element={<NewtonRaphson />} />
          <Route path='/secant' element={<Secant />} />
      </Routes>
    </>
  );
}

export default App;
