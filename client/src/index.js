import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter, Routes, Route} from "react-router-dom"
import './index.css';
import Postanalysis from './pages/Postanalysis';
import App from './App';
import Generation from './components/Generation';


export default function Approuter(){
  return(
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<App />}></Route>
        <Route path="/postanalysis" element={<Postanalysis />}></Route>
        <Route path="/generate" element={<Generation />}></Route>
    </Routes>
    </BrowserRouter>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Approuter />);
