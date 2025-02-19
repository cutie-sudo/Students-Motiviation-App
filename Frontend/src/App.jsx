import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup"; // Signup page
// import Categories from "./pages/Categories";
// import Community from "./pages/Community";
// import Profile from "./pages/Profile";

function App() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          {/* <Route path="/categories" element={<Categories />} /> */}
          {/* <Route path="/community" element={<Community />} /> */}
          {/* <Route path="/profile" element={<Profile />} /> */}
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
