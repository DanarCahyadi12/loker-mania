import NavigationBar from './components/NavgationBar';
import MyCard from './components/MyCard';
import Brand from './components/Brand';
import MyCarousel from './components/MyCarousel';
import Footer from './components/Footer';
import LoginPage from './pages/LoginPage';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import RegisterPage from './pages/RegisterPage';


function App() {
  return (
    <Router>
      <Routes>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
      </Routes>
    </Router>
    
  );
}

export default App;
