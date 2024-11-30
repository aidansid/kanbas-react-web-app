import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

export default function AccountNavigation() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const links = currentUser ? ["Profile"] : ["Signin", "Signup"];
  const { pathname } = useLocation();
  const accountLinks = [
    {label: "Profile", path: "/Kanbas/Account/Profile"},
    {label: "Signin", path: "/Kanbas/Account/Signin"},
    {label: "Signup", path: "/Kanbas/Account/Signup"},
  ];
  const active = (path: string) => (pathname.includes(path) ? "active" : "");
  return (
    <div id="wd-account-navigation" className="wd list-group fs-5 rounded-0">
      {accountLinks.filter(link => links.includes(link.label)).map(link => (
        <Link key={link.path} to={link.path} className={`list-group-item text-danger border border-0
          ${pathname.includes(link.label) ? "active text-black" : "text-danger"}`}>
          {link.label}
        </Link>
      ))}
      {currentUser && currentUser.role === "ADMIN" && (
        <Link to={`/Kanbas/Account/Users`} className={`list-group-item ${active("Users")}`}> Users </Link> )}
    </div>
  );
}


