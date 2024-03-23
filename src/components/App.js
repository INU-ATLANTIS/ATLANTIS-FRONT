import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeSpace from "../pages/HomeSpace";
import JoinSpace from "../pages/JoinSpace";
import LoginSpace from "../pages/LoginSpace";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeSpace />} index />
        <Route path="JoinSpace" element={<JoinSpace />} />
        <Route path="LoginSpace" element={<LoginSpace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
