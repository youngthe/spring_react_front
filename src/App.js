import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import ListBoardComponent from './component/ListBoardComponent';
import CreateBoardComponent from './component/CreateBoardComponent';
import Login from './component/loginComponent';
import axios from "axios";


function test(){
    axios.post('/api/board', {title: "test"})
        .then(r =>
        console.log(r));
}


function App() {
  return (
  <div>
      <Login />
  </div>
);
}

export default App;
