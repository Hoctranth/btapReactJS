import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './login/login';
import Home from './home/Home';
import User from './home/User'
import Vehicles from './home/Vehicles'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />}>
          <Route path="user" element={<User />} />
          <Route path="vehicles" element={<Vehicles />} />
        </Route>
      </Routes>
    </Router>

  );
}

export default App;