import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import LoginPage from "./LoginPage";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import RegisterPage from "./RegisterPage";
import Home from "./Home";
import PrivateRoute from "./PrivateRoute";
import ChangePassword from "./ChangePassword";
import UserGroup from "./UserGroup";
import AddUserGroup from "./AddUserGroup";
import UpdateData from "./UpdateData";
import UserTable from "./UserTable";
import Feed from "./Feed";
import NewsFull from "./NewsFull";
import Dashboard from "./Dashboard";
import Permissions from "./Permissions";
import AddUser from "./AddUser";

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
              <Route element={<Permissions />} path="/permissions" />
              <Route
                element={<UpdateData role={["superadmin"]} />}
                path="/updatedata"
              />
              <Route index element={<Dashboard />} path="/dashboard" />

              <Route element={<Dashboard />} path="/dashboard">
                <Route
                  index
                  element={<UserTable role={["superadmin", "admin"]} />}
                />
                <Route element={<ChangePassword />} path="changepassword" />

                <Route
                  element={<AddUserGroup role={["superadmin"]} />}
                  path="addusergroup"
                />
                <Route
                  element={<UpdateData role={["superadmin"]} />}
                  path="updatedata"
                />
                <Route
                  element={<AddUser role={["superadmin"]} />}
                  path="adduser"
                />
                <Route
                  element={<UserTable role={["superadmin", "admin"]} />}
                  path="userlist"
                />
                <Route
                  element={<UserGroup role={["superadmin"]} />}
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
