import { BrowserRouter, Routes, Route} from "react-router-dom";
import { useState } from "react";
import "./App.css";
import Form from "./Views/Form/Form"
import landing from "./views/landing/landing";
import home from "./views/home/home";
import details from "./Views/Details/Details"
import NavBar from "./Components/NavBar/NavBar"

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <BrowserRouter>
      <NavBar/>
        <Routes>
          <Route path="/" Component={landing}/>
          <Route path="/home" Component={home}/>
          <Route path="/details/:id" Component={details}/>
          <Route path="/form" Component={Form}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
