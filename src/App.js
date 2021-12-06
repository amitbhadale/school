import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Nav from "./components/Nav";
import Students from "./components/Students";
import Teachers from "./components/Teachers";
import Home from "./components/Home";
import Classes from "./components/Classes";

function App() {
  return (
    <Router>
      <div className="App">
        <Nav />
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/students" element={<Students />} />
          <Route path="/teachers" element={<Teachers />} />
          <Route path="/classes" element={<Classes />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
