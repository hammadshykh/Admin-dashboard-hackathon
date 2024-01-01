import React, { useEffect, useState, useRef } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import Users from "./Pages/Users/Users";
import AddUsers from "./Pages/Users/AddUsers";
import Orders from "./Pages/Orders/Orders";
import Logout from "./Pages/Logout/Logout";
import Sales from "./Pages/Orders/Sales";
import PageNotFound from "./Pages/PageNotFound/PageNotFound";
import "./App.sass";
import AddPost from "./Pages/Post/AddPost";
import Posts from "./Pages/Post/Post";

// Context for the theme settings and the functions to handle them
export const LoaderContext = React.createContext();s
export const ProfileContext = React.createContext();

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const appRef = useRef(null);
  const [userName, setUserName] = useState("");
  const [profilePic, setProfilePic] = useState(null);

  useEffect(() => {
    // Retrieve the values from local storage and set them to component state
    const storedUserName = localStorage.getItem("userName");
    setUserName(storedUserName ? storedUserName : "Sachin005");

    const storedProfilePic = localStorage.getItem("profilePic");
    if (storedProfilePic) {
      setProfilePic(storedProfilePic);
    } else {
      setProfilePic("https://sachinsamal005.netlify.app/img/sachin-samal.png");
    }

    setIsLoading(false);
    window.scrollTo(0, 0);

    // Add an event listener to update the local storage values when the profile is updated
    const handleProfileUpdated = (event) => {
      localStorage.setItem("userName", event.detail.userName);
      localStorage.setItem("profilePic", event.detail.profilePic);
      setUserName(event.detail.userName);
      setProfilePic(event.detail.profilePic);
    };
    window.addEventListener("profileUpdated", handleProfileUpdated);

    // Add an event listener to update the local storage values when the google profile is updated
    const handleGoolgeProfileUpdated = (event) => {
      localStorage.setItem("userName", event.detail.googleUserName);
      localStorage.setItem("profilePic", event.detail.googleProfilePic);
      setUserName(event.detail.googleUserName);
      setProfilePic(event.detail.googleProfilePic);
    };
    window.addEventListener("googleProfileUpdated", handleGoolgeProfileUpdated);

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener("profileUpdated", handleProfileUpdated);
      window.removeEventListener(
        "googleProfileUpdated",
        handleGoolgeProfileUpdated
      );
    };
  }, []);

  const LoaderContextValues = {
    isLoading,
    setIsLoading,
  };

  const ProfileContextValues = {
    userName,
    profilePic,
    setUserName,
    setProfilePic,
  };

  return (
    <>
      <div className="app" ref={appRef}>
        <LoaderContext.Provider value={LoaderContextValues}>
          <ProfileContext.Provider value={ProfileContextValues}>
            <BrowserRouter>
              <Routes>
                <Route path="/">
                  <Route index element={<Login />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/home" element={<Home />} />
                  <Route path="/logout" element={<Logout />} />
                  <Route path="/orders">
                    <Route index element={<Orders />} />
                    <Route path="/orders/sales" element={<Sales />} />
                  </Route>
                  <Route path="/users">
                    <Route index element={<Users />} />
                    <Route path="/users/new" element={<AddUsers />} />
                  </Route>
                  <Route path="/post">
                    <Route index element={<Posts />} />
                    <Route path="/post/new" element={<AddPost />} />
                  </Route>
                  <Route path="*" element={<PageNotFound />} />
                </Route>
              </Routes>
            </BrowserRouter>
          </ProfileContext.Provider>
        </LoaderContext.Provider>
      </div>
    </>
  );
}

export default App;
