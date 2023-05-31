import "./App.css"
import Home from "./Pages/Home/Home";
import PostSide from "./Components/PostSide/PostSide";
import Profile from "./Components/Profile/Profile";
import Auth from "./Pages/Auth/Auth"
import{ Routes, Route,  Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'




function App() {
  const user = useSelector((state)=>state.AuthReducer.authData)
  return (
    <div className="App">
    <div className="blur" style={{top:'-18%', right:'0'}}>  </div>
    <div className="blur" style={{top:'36%', left:'-8rem'}}>  </div>
    <Routes>
      <Route path='/' element={user? <Navigate to='home'/> : <Navigate to='auth'/>} />
      <Route path='/home' element={user ? <Home />: <Navigate to = '../auth' />}/>
      <Route path='/auth' element={user ? <Navigate to= '../home'/> : <Auth />}/>
      <Route path='/profile/:id' element={user ? <Profile /> :<Navigate to = '../auth' />}/>
      
      
    </Routes>
      
    {/* <Home /> */}
    {/* <Profile /> */}
    {/* <Auth /> */}
    </div>
  );
}

export default App;
