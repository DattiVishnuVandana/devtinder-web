import NavBar from "./NavBar"
import { BrowserRouter,Routes,Route } from "react-router-dom"
function App() {
  

  return (
    <>
  <BrowserRouter basename="/">
  <Routes>
    <Route path="/" element={<div>Base Page</div>}></Route>
    <Route path="/login" element={<div>Login Page</div>}></Route>
  </Routes>
  </BrowserRouter>
  <NavBar/>
    </>
  )
}

export default App
