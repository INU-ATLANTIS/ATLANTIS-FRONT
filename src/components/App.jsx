import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import Welcome from '../pages/Welcome'
import Join from '../pages/Join'
import Login from '../pages/Login'
import Home from '../pages/Home'
import Building from '../pages/Building'
import Buildings from '../pages/Buildings'
import Posts from '../pages/Posts'
import Posting from '../pages/Posting'

const theme = {
  primaryColor: '#004A92',
  secondaryColor: '#FFA800',
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/join" element={<Join />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/building" element={<Buildings />} />
          <Route path="/building/:buildingId" element={<Building />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/post" element={<Posting />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
