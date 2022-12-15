import { Route, Routes } from "react-router-dom";
import Home from "../src/pages/Home";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/home" element={<Home></Home>} />
      </Routes>
    </div>
  );
}

export default App;
