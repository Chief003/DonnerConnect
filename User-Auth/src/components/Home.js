import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import { useUserAuth } from "../context/UserAuthContext";
import LockScreen from "./LockScreen";


const Home = () => {
  const { logOut, user } = useUserAuth();
  const navigate = useNavigate();
  const [isLocked, setIsLocked] = useState(false);

  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    let timer;
    const handleActivity = () => {
      clearTimeout(timer);
      timer = setTimeout(() => setIsLocked(true), 60000); // 1 minute = 60000 ms
    };

    window.addEventListener("mousemove", handleActivity);
    window.addEventListener("keypress", handleActivity);

    handleActivity(); // Initialize the timer

    return () => {
      clearTimeout(timer);
      window.removeEventListener("mousemove", handleActivity);
      window.removeEventListener("keypress", handleActivity);
    };
  }, []);

  const handleUnlock = () => {
    setIsLocked(false);
  };

  if (isLocked) {
    return <LockScreen onUnlock={handleUnlock} />;
  }

  return (
    <>
      <div className="p-4 box mt-3 text-center">
        Welcome <br />
        {user && user.email}
      </div>
      <div className="d-grid gap-2">
        <Button variant="primary" onClick={handleLogout}>
          Log out
        </Button>
      </div>
    </>
  );
};

export default Home;
