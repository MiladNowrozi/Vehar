import { BrowserRouter, Routes, Route } from "react-router-dom";
import Admin from "./admin/Admin.jsx";
import "./fontAwesome/css/all.css";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
