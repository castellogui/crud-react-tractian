import { Route, Routes } from "react-router-dom";
import Home from "../src/pages/Home";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/home" element={<Home></Home>} />
        <Route path="/companies" element={<Home></Home>} />
        <Route path="/units" element={<Home></Home>} />
        <Route path="/users" element={<Home></Home>} />
        <Route path="/assets" element={<Home></Home>} />
        <Route path="/challenge" element={<Home></Home>} />
        <Route path="/me" element={<Home></Home>} />
      </Routes>
    </div>
  );
}

export default App;
