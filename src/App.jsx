import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './component/login/login';
import Home from './component/home/Home';
import User from './component/home/User'
import Vehicles from './component/home/Vehicles'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home/:id" element={<Home />}>
          <Route path="user" element={<User />} />
          <Route path="vehicles" element={<Vehicles />} />
        </Route>
      </Routes>
    </Router>

  );
}

export default App;