
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
import AdminDashboard from './pages/AdminDashboard';
import HabitTracking from './pages/HabitTracking';
import EmailList from './components/EmailList';
import { UserContextProvider } from './context/userContext';
import UserManager from './pages/UserManager';
import AdminRoute from './components/AdminRoute';
import UserRoute from './components/UserRoute';
import PasswordResetRequest from './components/PasswordResetRequest';
import PasswordReset from './components/PasswordReset';
import { Toaster } from 'react-hot-toast';
import axios from 'axios';


axios.defaults.baseURL = 'https://campus-habit-hero.onrender.com';
axios.defaults.withCredentials = true

function App() {
  return (
    <UserContextProvider>
      <Router>
        <Header />
        <Toaster position='bottom-right' toastOptions={{ duration: 5000 }} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/contact" element={<ContactForm />} />
          <Route path="/faqs" element={<FAQs />} />
          <Route path="/about" element={<About />} />
          <Route path="/forgotPassword" element={<PasswordResetRequest />} />
          <Route path="/reset-password/:token" element={<PasswordReset />} />


  {/* Admin Routes */}
  <Route path="/adminDashboard" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
  <Route path="/userManager" element={<AdminRoute><UserManager /></AdminRoute>} />
  <Route path="/emailList" element={<AdminRoute><EmailList /></AdminRoute>} />

  {/* User Routes */}
  <Route path="/dashboard" element={<UserRoute><Dashboard /></UserRoute>} />
  <Route path="/profile" element={<UserRoute><Profile /></UserRoute>} />
  <Route path="/deadlines" element={<UserRoute><Deadlines /></UserRoute>} />
  <Route path="/resource-hub" element={<UserRoute><ResourceHub /></UserRoute>} />
  <Route path="/habit-tracking" element={<UserRoute><HabitTracking /></UserRoute>} />
</Routes>
        <Footer />
      </Router>
    </UserContextProvider>
  );
}

export default App;
