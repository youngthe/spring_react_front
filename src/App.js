import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Stock from './component/stock/stock';
import CreateBoardComponent from './component/CreateBoardComponent';
import Login from './component/loginComponent';
import axios from "axios";
import {useState} from "react";



function App() {

  return (
  <div>
      <Stock />
  </div>
);
}

export default App;
