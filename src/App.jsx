if (typeof global === "undefined") {
  var global = window;
}
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Blog from "./pages/Blog";
import AdminLogin from "./pages/AdminLogin";
import AdminSignup from "./pages/AdminSignup";
import CreateBlog from "./pages/CreateBlog";
import EditBlog from "./pages/EditBlog";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/adminLogin" element={<AdminLogin />} />
        <Route exact path="/adminSignup" element={<AdminSignup />} />
        <Route exact path="/register" element={<Signup />} />
        <Route exact path="/blog/:id" element={<Blog />} />
        <Route exact path="/createBlog" element={<CreateBlog />} />
        <Route exact path="/editBlog/:id" element={<EditBlog />} />
      </Routes>
    </>
  );
}

export default App;
