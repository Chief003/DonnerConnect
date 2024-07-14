import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import { useUserAuth } from "../context/UserAuthContext";
import LockScreen from "./LockScreen";
import Header from "./Header";
import HeroSection from "./HeroSection";
import BlogSection from "./BlogSection";
import Footer from "./Footer";
import Testimonial from "./Testimonials";
import AboutUs from "./AboutUs";
import RateUs from "./RateUs";
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
      timer = setTimeout(() => setIsLocked(true), 400000); // 1 minute = 60000 ms
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
      <Header />
      <HeroSection />
      <BlogSection />
      <AboutUs />
      <Testimonial />
      <RateUs />
      <Footer />
    </>
  );
};

export default Home;
