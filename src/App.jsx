import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useContext } from "react";
import { storeContext } from "./context/storeContext";
import Navbar from "./layout/Navbar";
import Footer from "./pages/Footer";
import Hero from "./pages/Hero";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import { Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Signout from "./components/Signout";
import Todo from "./pages/Todo";

function App() {
  const { isAuth } = useContext(storeContext);

  return (
    <BrowserRouter>
      <Navbar />
      <ToastContainer />
      <Routes>
     <Route path="/" element={isAuth ? <Dashboard /> : <Hero />} />
     <Route
      path="/register"
       element={isAuth ? <Dashboard /> : <Register />}
        />
     <Route path="/login" element={isAuth ? <Dashboard /> : <Login />} />
     <Route path="/dashboard" element={isAuth ? <Dashboard /> : <Login />  } />
      <Route path="/signout" element={isAuth ? <Signout /> : <Login /> } />
      <Route path="/todo/:id" element={isAuth ? <Todo /> : <Login /> } />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
