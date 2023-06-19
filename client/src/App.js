import logo from "./logo.svg";
import "./App.css";

import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, createContext } from "react";

export const loggedContext = createContext();

function App() {
  const [isLogged, setIsLogged] = useState(false);

  return (
    <loggedContext.Provider value={{ isLogged, setIsLogged }}>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </loggedContext.Provider>
  );
}

export default App;
