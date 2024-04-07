import { BrowserRouter, Routes, Route } from 'react-router-dom'
import WelcomeSpace from '../pages/WelcomeSpace'
import JoinSpace from '../pages/JoinSpace'
import LoginSpace from '../pages/LoginSpace'
import { HomeSpace } from '../pages/HomeSpace'
import { LectureSpace } from '../pages/LectureSpace'
import { PostsSpace } from '../pages/PostsSpace'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WelcomeSpace />} index />
        <Route path="JoinSpace" element={<JoinSpace />} />
        <Route path="LoginSpace" element={<LoginSpace />} />
        <Route path="/home" element={<HomeSpace />} />
        <Route path="/posts" element={<PostsSpace />} />
        <Route path="/lecture" element={<LectureSpace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
