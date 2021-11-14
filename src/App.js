import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home, Auth, Join, Profile, Board, AddBoard } from "./routes";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/join" element={<Join />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/board" element={<Board />} />
          <Route path="/addboard" element={<AddBoard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
