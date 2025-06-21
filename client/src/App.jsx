import Home from "./Landing_Page/Home.jsx"
import Login from "./Landing_Page/Login.jsx"
import Register from "./Landing_Page/Register.jsx"
import NewAccounts from "./Landing_Page/NewAccounts.jsx"
import ProfileHome from "./Application_Pages/ProfileHome.jsx"
import AdminHome from "./Application_Pages/AdminHome.jsx"
import CreateProfiles from "./Application_Pages/CreateProfiles.jsx"
import UnverifiedAdmin from "./Application_Pages/UnverifiedAdmin.jsx"
import Verification from "./Landing_Page/Verification.jsx"
import Profile from "./Application_Pages/Profile.jsx"
import Games from "./Application_Pages/Games.jsx"
import Friends from "./Application_Pages/Friends.jsx"
import FindFriends from "./Application_Pages/FindFriends.jsx"
import HelpSquare from "./Application_Pages/HelpSquare.jsx"
import Blog from "./Application_Pages/Blog.jsx"
import Edit from "./Application_Pages/Edit.jsx"
import Namelist from "./Application_Pages/Namelist.jsx"
import Events from "./Application_Pages/Events.jsx"
import Messenger from "./Application_Pages/Messenger.jsx"

import {BrowserRouter as Router,Routes, Route} from "react-router-dom"

function App(){

  return(
      <Router>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/profilehome" element={<ProfileHome/>}/>
          <Route path="/adminhome" element={<AdminHome/>}/>
          <Route path="/namelist" element={<Namelist/>}/>
          <Route path="/edit" element={<Edit/>}/>
          <Route path="/events" element={<Events/>}/>
          <Route path="/messenger" element={<Messenger/>}/>
          <Route path="/newaccounts" element={<NewAccounts/>}/>
          <Route path="/createprofiles" element={<CreateProfiles/>}/>
          <Route path="/unverifiedadmin" element={<UnverifiedAdmin/>}/>
          <Route path="/verification" element={<Verification/>}/>
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