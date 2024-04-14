import { BrowserRouter, Routes, Route } from 'react-router-dom';
import WelcomeSpace from '../pages/WelcomeSpace';
import JoinSpace from '../pages/JoinSpace';
import LoginSpace from '../pages/LoginSpace';
import HomeSpace from '../pages/HomeSpace';
import Building from '../pages/Building';
import Buildings from '../pages/Buildings';
import LectureSpace from '../pages/LectureSpace';
import PostsSpace from '../pages/PostsSpace';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WelcomeSpace />} />
        <Route path="/JoinSpace" element={<JoinSpace />} />
        <Route path="/LoginSpace" element={<LoginSpace />} />
        <Route path="/home" element={<HomeSpace />} />
        <Route path="/building" element={<Buildings />} />
        <Route path="/building/:buildingId" element={<Building />} />
        <Route path="/lecture" element={<LectureSpace />} />
        <Route path="/posts" element={<PostsSpace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;