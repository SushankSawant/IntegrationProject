import React from "react";

function Dashboard() {
  return (
    <div className="homeWrapper">
      {
        usergroup === "superadmin" ||
          (usergroup === "admin" && (
            <>
              <div className="box">
                <p
                  onClick={() => {
                    navigate("/userlist");
                  }}
                >
                  Users
                </p>
                {usergroup == "superadmin" && (
                  <p
                    onClick={() => {
                      navigate("/usergroups");
                    }}
                  >
                    User Groups
                  </p>
                )}
              </div>
              <div className="display">
                <Outlet />
              </div>
            </>
          )) /*  : (
        <>
          <h1>Welcome Home {user} 🤩</h1>
        </>
      ) */
      }
    </div>
  );
}

export default Dashboard;
