import { Routes, Route, BrowserRouter } from "react-router-dom";
import User from "./components/user/User";
import Table from "./components/table/Table";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<User />} />
        <Route path="/login" element={<User />} />
        <Route path="/table" element={<Table />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
