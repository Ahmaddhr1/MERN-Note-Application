import Navbar from "./components/Navbar";
import { Route, Router, Routes } from "react-router-dom";
import Login from "./pages/Login";
import { createContext, useEffect, useState } from "react";
import { lookInsession } from "./config/session";
import Home from "./pages/Home";
import Privateroute from "./config/privateroute";
import Note from "./pages/Note";
import { Toaster } from "react-hot-toast";
import ViewNote from "./pages/viewNote";
import EditNote from "./pages/EditNote";
import NotFoundPage from "./pages/NotFoundPage";
import Footer from "./components/Footer";
export const Usercontext = createContext({});

function App() {
  const [userAuth, setUserAuth] = useState({});

  useEffect(() => {
    let userInsession = lookInsession("user");
    if (userInsession) {
      setUserAuth(JSON.parse(userInsession));
    } else {
      setUserAuth({});
    }
  }, []);

  return (
    <Usercontext.Provider value={{ userAuth, setUserAuth }}>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<Navbar />}>
          <Route element={<Privateroute />}>
            <Route path="/user/:id" element={<Home />} />
            <Route path="/user/:id/createNote" element={<Note />} />
            <Route path="/user/:id/note/:nid" element={<ViewNote />} />
            <Route path="/user/:id/note/:nid/edit" element={<EditNote />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </Usercontext.Provider>
  );
}

export default App;
