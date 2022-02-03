import { Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Dashboard } from "./pages/Dashboard";
import { Edit } from "./pages/Edit";
import { Home } from "./pages/Home";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/admin" element={<Dashboard />}></Route>
        <Route path="/admin/edit/:id" element={<Edit />}></Route>
      </Routes>
    </div>
  );
}

export default App;
