import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import LoginPage from "./components/LoginPage.jsx";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import RegisterPage from "./components/RegisterPage";
import Home from "./components/Home";
import PrivateRoute from "./components/PrivateRoute";
import ChangePassword from "./components/ChangePassword";
import UserGroup from "./components/UserGroup";
import AddUserGroup from "./components/AddUserGroup";
import UpdateData from "./components/UpdateData";
import UserTable from "./components/UserTable";
import Feed from "./components/Feed";
import NewsFull from "./components/NewsFull";
import Dashboard from "./components/Dashboard";
import Permissions from "./components/Permissions";
import AddUser from "./components/AddUser";
import LandingPage from "./components/LandingPage.jsx";

function App() {
  // const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route element={<PrivateRoute />}>
            <Route element={<Home />} path="/" exact>
              <Route index element={<LandingPage />} />
              <Route
                element={<Permissions role={["superadmin"]} />}
                path="/permissions"
              />
              <Route
                element={
                  <UpdateData /* role={["superadmin"]} */ /*  permissions={"can_update"} */
                  />
                }
                path="/updatedata"
              />
              {/* <Route element={<Dashboard />} path="/dashboard" /> */}

              <Route element={<Dashboard />} path="/dashboard">
                <Route
                  index
                  element={
                    <UserTable /* role={["superadmin", "admin"]} */ /* permissions={"can_view"}  */
                    />
                  }
                />
                <Route element={<ChangePassword />} path="changepassword" />

                <Route
                  element={
                    <AddUserGroup /* role={["superadmin", "admin", "member"]}  */ /* permissions={"can_add"} */
                    />
                  }
                  path="addusergroup"
                />
                <Route
                  element={
                    <UpdateData /* role={["superadmin"]} */ /* permissions={"can_update"} */
                    />
                  }
                  path="updatedata"
                />
                <Route
                  element={
                    <AddUser /* role={["superadmin", "admin", "member"]} */ /* permissions={"can_add"}  */
                    />
                  }
                  path="adduser"
                />
                <Route
                  element={
                    <UserTable /* role={["superadmin", "admin"]} */ /* permissions={"can_view"}  */
                    />
                  }
                  path="userlist"
                />
                <Route
                  element={
                    <UserGroup /* role={["superadmin"]} */ /* permissions={"can_view"} */
                    />
                  }
                  path="usergroups"
                />
              </Route>
              <Route element={<Feed />} path="/feed" />
              <Route element={<NewsFull />} path="/fullpagenews"></Route>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
