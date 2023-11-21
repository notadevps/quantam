import { Routes, Route, BrowserRouter } from "react-router-dom";
import User from "./components/user/User";
import Table from "./components/table/Table";
import Default from './utils/default';


//just made to navigate between signup and login there is no styling
const Home = () => {
  return (
    <div style={{...Default.center, gap: '1rem'}}>
      <a href='/signup'>Signup</a>
      <a href='/login'>Login</a>
    </div>
  )

}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<User />} />
        <Route path="/login" element={<User />} />
        <Route path="/table" element={<Table />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
