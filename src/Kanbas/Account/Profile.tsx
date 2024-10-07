import { Link } from "react-router-dom";

export default function Profile() {
  return (
    <div id="wd-profile-screen">
      <h1>Profile</h1>
      
      <form>
        <div className="mb-2">
          <input type="username" className="form-control" id="wd-username" value="alice" placeholder="Username"/>
        </div>
        <div className="mb-2">
          <input type="password" className="form-control" id="wd-password" value="123" placeholder="Password"/>
        </div>
        <div className="mb-2">
          <input type="text" className="form-control" id="wd-firstname" value="Alice" placeholder="First Name"/>
        </div>
        <div className="mb-2">
          <input type="text" className="form-control" id="wd-lastname" value="Wonderland" placeholder="Last Name"/>
        </div>
        <div className="mb-2">
          <input type="date" className="form-control" id="wd-dob" value="2000-01-01" placeholder="Date of Birth"/>
        </div>
        <div className="mb-2">
          <input type="email" className="form-control" id="wd-email" value="alice@wonderland" placeholder="Email"/>
        </div>
        <div className="mb-2">
          <select className="form-select" id="wd-role">
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
            <option value="FACULTY">Faculty</option>
            <option value="STUDENT">Student</option>
          </select>
        </div>
        <Link to="/Kanbas/Account/Signin">
          <div style={{ display: 'flex' }}>
            <button id="wd-profile-signout-button" className="btn btn-md btn-danger" >Sign out</button>
          </div>
        </Link>
      </form>
    </div>
);}
