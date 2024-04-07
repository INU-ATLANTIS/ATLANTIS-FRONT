import { BrowserRouter, Routes, Route } from 'react-router-dom'
import WelcomeSpace from '../pages/WelcomeSpace'
import JoinSpace from '../pages/JoinSpace'
import LoginSpace from '../pages/LoginSpace'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WelcomeSpace />} index />
        <Route path="JoinSpace" element={<JoinSpace />} />
        <Route path="LoginSpace" element={<LoginSpace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
