import { Routes, Route, BrowserRouter, Navigate } from "react-router";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/home.tsx";
import { Toaster } from "react-hot-toast";

//store
import { useAuthStore } from "./store/useAuthStore.ts";
import { useEffect } from "react";

const App = () => {
  const { authUser, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={authUser ? <Home /> : <Navigate to={"/login"} />}
          />
          <Route
            path="login"
            element={!authUser ? <Login /> : <Navigate to={"/"} />}
          />
          <Route
            path="signup"
            element={!authUser ? <Signup /> : <Navigate to={"/"} />}
          />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </>
  );
};

export default App;
