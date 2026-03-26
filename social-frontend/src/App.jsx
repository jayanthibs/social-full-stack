//import { useEffect } from "react";
import "./App.css";

import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Feed from "./pages/Feed";
import Navbar from "./components/Navbar";
import { useUser } from "./context/UserContext";
import { Navigate } from "react-router-dom";

function App() {
  //for testing to check both frontend and baackend connected
  // useEffect(() => {
  //   // async function getData() {
  //   //   const response = await fetch("http://localhost:3000/api/posts");
  //   //   const data = await response.json();
  //   //   console.log(data);
  //   // }
  //   // getData();
  // }, []);

  //bring in user info
  const { user } = useUser();
  console.log(user);

  return (
    <>
      <Navbar />

      {user ? (
        <Routes>
          <Route path="/feed" element={<Feed />} />
          <Route path="*" element={<Navigate to="/feed" />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      )}
    </>
  );
}

export default App;
