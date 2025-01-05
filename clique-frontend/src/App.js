import './App.css';
import Navbar from './Navbar';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { UserProvider } from './components/UserContext';
import LandingPage from './components/LandingPage';
import UserProfileComponent from './components/profile-components/UserProfileComponent';

function App() {
  return (
    <UserProvider>
      <Router>
          <div className="App">
            <Navbar/>
          </div>
          <Routes>
            <Route path ="/" element={<LandingPage />}/>
            <Route path="/user/:id" element={<UserProfileComponent />} />
          </Routes>
        </Router>
    </UserProvider>
  );
}

export default App;
