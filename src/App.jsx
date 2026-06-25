import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
  useNavigate,
} from "react-router-dom";
import Login from "./components/Login";
import { useEffect } from "react";
import Register from "./components/Register";
import Header from "./components/Header";
import Main from "./components/Main";
import Baloon from "./components/features/anxiety/Baloon";
import Organizer from "./components/features/anxiety/Organizer";
import Net from "./components/features/anxiety/Net";
import Timer from "./components/features/focus/Timer";
import History from "./components/History";
import Neutral from "./components/features/neutral_happy/Neutral";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";

function App() {
  const [count, setCount] = useState(0);
  const [verified, setVerified] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [link, setLink] = useState(
    "https://images.unsplash.com/photo-1515705576963-95cad62945b6?crop=entropy&cs=srgb&fm=jpg&ixid=M3w5NTU3Nzd8MHwxfHNlYXJjaHw0fHxzdGFyc3xlbnwwfHx8fDE3NzkyMTM3NzJ8MA&ixlib=rb-4.1.0&q=85",
  );

  function handleLogout() {
    console.log("oi");
    localStorage.removeItem("token");
    setVerified(false);
    navigate("/login", { replace: true });
  }

  useEffect(() => {
    async function authToken() {
      const token = localStorage.getItem("token");

      console.log(token);

      if (!token) {
        setVerified(false);
        setLoading(false);
        return;
      }

      try {
        const response = await fetch("https://goodday-back.onrender.com/api/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setVerified(response.ok);
      } catch {
        setVerified(false);
      } finally {
        setLoading(false);
      }
    }

    authToken();
  }, []);

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <Routes>
      <Route
        path="/"
        element={verified ? <Navigate to="/main" /> : <Navigate to="/login" />}
      />

      <Route
        path="/login"
        key={"login"}
        element={
          <div
            style={{ backgroundImage: `url(${link})` }}
            className="w-screen bg-cover bg-center h-screen flex justify-center items-center bg-blue-500"
          >
            <Login />
          </div>
        }
      />

      <Route
        path="/forgotpassword"
        key={"forgotpassword"}
        element={
          <div
            style={{ backgroundImage: `url(${link})` }}
            className="w-screen bg-cover bg-center h-screen flex justify-center items-center bg-blue-500"
          >
            <ForgotPassword />
          </div>
        }
      />

      <Route
        path="/reset-password/:token"
        key={"resetpassword"}
        element={
          <div
            style={{ backgroundImage: `url(${link})` }}
            className="w-screen bg-cover bg-center h-screen flex justify-center items-center bg-blue-500"
          >
            <ResetPassword />
          </div>
        }
      />

      <Route
        path="/register"
        element={
          <div
            style={{ backgroundImage: `url(${link})` }}
            className="w-screen min-h-screen bg-cover bg-center flex justify-center items-center bg-blue-500"
          >
            <Register />
          </div>
        }
      />

      <Route
        path="/main"
        element={
          <div
            style={{ backgroundImage: `url(${link})` }}
            className="max-w-screen bg-cover bg-center min-h-screen flex justify-center items-center"
          >
            <Header func={handleLogout} />
            <Main setLink={setLink} />
          </div>
        }
      />

      <Route
        path="/main/baloon"
        element={
          <div
            style={{ backgroundImage: `url(${link})` }}
            className="max-w-screen bg-cover bg-center min-h-screen flex justify-center items-center bg-blue-500"
          >
            <Header func={handleLogout} />
            <Baloon />
          </div>
        }
      />

      <Route
        path="/main/organizer"
        element={
          <div
            style={{ backgroundImage: `url(${link})` }}
            className="max-w-screen bg-cover bg-center min-h-screen flex justify-center items-center bg-blue-500"
          >
            <Header func={handleLogout} />
            <Organizer />
          </div>
        }
      />

      <Route
        path="/main/net"
        element={
          <div
            style={{ backgroundImage: `url(${link})` }}
            className="max-w-screen bg-cover bg-center min-h-screen overflow-auto flex justify-center items-center bg-blue-500"
          >
            <Header func={handleLogout} />
            <Net />
          </div>
        }
      />

      <Route
        path="/main/timer"
        element={
          <div
            style={{ backgroundImage: `url(${link})` }}
            className="max-w-screen bg-cover bg-center min-h-screen overflow-auto flex justify-center items-center"
          >
            <Header func={handleLogout} />
            <Timer />
          </div>
        }
      />

      <Route
        path="/main/history"
        element={
          <div className="max-w-screen min-h-screen overflow-auto flex justify-center items-center bg-gradient-to-tr from-cyan-800 to-black">
            <Header func={handleLogout} />
            <History />
          </div>
        }
      />

      <Route
        path="/main/neutral"
        element={
          <div className="max-w-screen min-h-screen overflow-auto flex justify-center items-center bg-gradient-to-tr from-pink-200 to-red-950">
            <Header func={handleLogout} />
            <Neutral />
          </div>
        }
      />
    </Routes>
  );
}

export default App;
