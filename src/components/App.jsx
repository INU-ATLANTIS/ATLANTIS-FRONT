import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Welcome from '../pages/Welcome'
import Join from '../pages/Join'
import Login from '../pages/Login'
import Home from '../pages/Home'
import Building from '../pages/Building'
import Buildings from '../pages/Buildings'
import Lecture from '../pages/Lecture'
import Posts from '../pages/Posts'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/JoinSpace" element={<Join />} />
        <Route path="/LoginSpace" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/building" element={<Buildings />} />
        <Route path="/building/:buildingId" element={<Building />} />
        <Route path="/lecture" element={<Lecture />} />
        <Route path="/posts" element={<Posts />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
