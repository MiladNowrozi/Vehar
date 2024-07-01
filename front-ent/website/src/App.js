import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import { News } from "./pages/news/News";
import Politic from "./pages/politic/Politic";
import Sport from "./pages/sport/Sport";
import Local from "./pages/local/Local";
import About from "./pages/about/About";
import Social from "./pages/social/Social";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/اخبار" element={<News />} />
        <Route path="/سیاسی" element={<Politic />} />
        <Route path="/اجتماعی" element={<Social />} />
        <Route path="/ورزشی" element={<Sport />} />
        <Route path="/محلی" element={<Local />} />
        <Route path="/درباره ما" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
