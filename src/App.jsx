import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import LoginPage from "./LoginPage";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
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
import AddUser from "./AddUser";
import Permissions from "./Permissions";

function App() {
  // const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route element={<PrivateRoute />}>
            <Route element={<ChangePassword />} path="/changepassword" />
            <Route element={<Feed />} path="/feed" />
            <Route element={<Permissions />} path="/permissions" />
            <Route element={<AddUser />} path="/adduser" />
            <Route element={<Home />} path="/" exact>
              <Route
                index
                element={<UserTable role={["superadmin", "admin"]} />}
              />
              <Route
                element={<UserTable role={["superadmin", "admin"]} />}
                path="/userlist"
              />
              <Route
                element={<UserGroup role={["superadmin"]} />}
                path="/usergroups"
              />
            </Route>
            <Route
              element={<UpdateData role={["superadmin"]} />}
              path="/updatedata"
            ></Route>
            <Route element={<NewsFull />} path="/fullpagenews" />
            <Route
              element={<AddUserGroup role={["superadmin"]} />}
              path="/addusergroup"
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
