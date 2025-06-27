import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Device from "./components/Device";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/device" element={<Device />} />
      </Routes>
    </Router>
  );
}

export default App;
