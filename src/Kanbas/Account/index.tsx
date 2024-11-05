import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Signin from "./Signin";
import Profile from "./Profile";
import Signup from "./Signup";
import AccountNavigation from "./Navigation";


export default function Account() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const defaultRoute = currentUser ? "/Kanbas/Account/Profile" : "/Kanbas/Account/Signin";
  return (
    <div id="wd-account-screen" className="d-flex">
      <div className="d-none d-md-block">
        <AccountNavigation />
      </div>
      <div>
        <Routes>
          <Route path="/" element={<Navigate to={defaultRoute} />} />
          <Route path="/Signin" element={<Signin />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/Signup" element={<Signup />} />
        </Routes>
      </div>
    </div>
  );
}
  

