import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import ResourceHub from './pages/ResourceHub';
import About from './pages/About';
import FAQs from './pages/FAQs';
import ContactForm from './pages/ContactForm';
import Deadlines from './pages/Deadlines';
import HabitTracking from './pages/HabitTracking';
import { UserContextProvider } from './context/userContext';
import { Toaster } from 'react-hot-toast';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:5000';
axios.defaults.withCredentials = true

function App() {
  return (
    <UserContextProvider>
      <Router>
        <Header />
        <Toaster position='bottom-right' toastOptions={{ duration: 6000 }} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/deadlines" element={<Deadlines />} />
          <Route path="/resource-hub" element={<ResourceHub />} />
          <Route path="/about" element={<About />} />
          <Route path="/faqs" element={<FAQs />} />
          <Route path="/contact" element={<ContactForm />} />
          <Route path="/habit-tracking" element={<HabitTracking />} />
        </Routes>
        <Footer />
      </Router>
    </UserContextProvider>
  );
}

export default App;
