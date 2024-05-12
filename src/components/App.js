import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import Welcome from "../pages/Welcome";
import Join from "../pages/Join";
import Login from "../pages/Login";
import Home from "../pages/Home";
import Building from "../pages/Building";
import Buildings from "../pages/Buildings";
import Posts from "../pages/Posts";
import MarkerPosting from "../pages/MarkerPosting";
import WeeklyPosts from "../pages/WeeklyPosts";
import PostDetail from "../pages/PostDetail";
import MyPosts from "../pages/MyPosts";
import Posting from "../pages/Posting";
import FindPassword from "./FindPassword";
import UserInfo from "../pages/UserInfo";
import LoginUserInfo from "../pages/LoginUserInfo";
import ChangeNickname from "../pages/ChangeNickname";
import FavoritePosts from "../pages/FavoritePosts";
import UserNotiList from "../pages/UserNotiList";


const theme = {
  primaryColor: "#004A92",
  secondaryColor: "#FFA800",
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/join" element={<Join />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/findpassword" element={<FindPassword />} />
          <Route path="/building" element={<Buildings />} />
          <Route path="/building/:buildingId/*" element={<Building />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/markerPosting" element={<MarkerPosting />} />
          <Route path="/posting" element={<Posting />} />
          <Route path="/posting/:postId" element={<Posting />} />
          <Route path="/posts/weeklyPosts" element={<WeeklyPosts />} />
          <Route path="/post/:postId" element={<PostDetail />} />
          <Route path="/myPosts" element={<MyPosts />} />
          <Route path="/userInfo" element={<UserInfo />} />
          <Route path="/loginUserInfo" element={<LoginUserInfo />} />
          <Route path="/changeNickname" element={<ChangeNickname />} />
          <Route path="/favoritePosts" element={<FavoritePosts />} />
          <Route path="/userNotiList" element={<UserNotiList />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
