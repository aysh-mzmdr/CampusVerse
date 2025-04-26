import Home from "./Landing_Page/Home.jsx"
import Login from "./Landing_Page/Login.jsx"
import Register from "./Landing_Page/Register.jsx"
import ProfileHome from "./Application_Pages/ProfileHome.jsx"
import Profile from "./Application_Pages/Profile.jsx"
import Games from "./Application_Pages/Games.jsx"
import Friends from "./Application_Pages/Friends.jsx"
import FindFriends from "./Application_Pages/FindFriends.jsx"
import HelpSquare from "./Application_Pages/HelpSquare.jsx"
import Blog from "./Application_Pages/Blog.jsx"

import {BrowserRouter as Router,Routes, Route} from "react-router-dom"

function App(){

  return(
      <Router>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/profilehome" element={<ProfileHome/>}/>
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/games" element={<Games/>}/>
          <Route path="/friends" element={<Friends/>}/>
          <Route path="/findfriends" element={<FindFriends/>}/>
          <Route path="/helpsquare" element={<HelpSquare/>}/>
          <Route path="/blog" element={<Blog/>}/>
        </Routes>
      </Router>
  )
}

export default App;