import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeSpace from "../pages/HomeSpace";
import JoinSpace from "../pages/JoinSpace";
import LoginSpace from "../pages/LoginSpace";
import Building from "../pages/Building";
import Buildings from "../pages/Buildings";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeSpace />} index />
        <Route path="JoinSpace" element={<JoinSpace />} />
        <Route path="LoginSpace" element={<LoginSpace />} />
        <Route path="/building" element={<Buildings />} />
        <Route path="/building/:buildingId" element={<Building />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
