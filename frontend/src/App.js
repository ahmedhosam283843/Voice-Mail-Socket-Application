import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Mailbox from "./components/Mailbox";
import Compose from "./components/Compose";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/mailbox" element={<Mailbox />} />
        <Route path="/compose" element={<Compose />} />
      </Routes>
    </div>
  );
}

export default App;
