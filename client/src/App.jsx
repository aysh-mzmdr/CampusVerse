import Home from "./Landing_Page/Home.jsx"
import Login from "./Landing_Page/Login.jsx"
import Register from "./Landing_Page/Register.jsx"

import {BrowserRouter as Router,Routes, Route} from "react-router-dom"

function App(){

  return(
      <Router>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
        </Routes>
      </Router>
  )
}

export default App;