import Body from "./Body"
import { BrowserRouter,Routes,Route } from "react-router-dom"
import Profile from "./Profile"
import Login from "./Login"
import { Provider } from "react-redux"
import appStore from "./utils/appStore"
import Feed from "./Feed"
function App() {
  

  return (
    <>
    <Provider store={appStore}>
  <BrowserRouter basename="/">
  <Routes>
    <Route path="/" element={<Body/>}>
    <Route path="/Feed" element={<Feed/>}></Route>
   <Route path="/login" element={<Login/>}></Route>
     <Route path="/profile" element={<Profile/>} />
    
    </Route>
  </Routes>
  </BrowserRouter>
  </Provider>
    </>
  )
}

export default App
