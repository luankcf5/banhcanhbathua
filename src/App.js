import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Admin from "./components/AdminPage/Admin";
import Homepage from "./components/HomePage/HomePage";

function App() {
  return (
    <div className="body">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/" element={<Admin />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
