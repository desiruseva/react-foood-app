import './App.css';
import  "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import { Navbar } from "./components/Navbar.js";
import { Home } from './components/Home.js';
import { Add } from "./components/Add.js";
import { Edit } from "./components/Edit.js";
import { Details } from "./components/Details.js";
import { Route, Routes } from "react-router-dom";


function App() {
  return (
    <>
    <Navbar />
    <Routes>
      <Route  path="/" element={<Home/>} />
      <Route  path="/add" element={<Add/>} />
      <Route  path="/edit/:id" element={<Edit/>} />
      <Route  path="/view/:id" element={<Details/>} /> 
    </Routes>
  </>
);
}

export default App;
