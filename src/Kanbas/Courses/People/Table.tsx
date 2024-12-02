import { FaUserCircle } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import PeopleDetails from "./Details";
import { Link, useParams } from "react-router-dom";
import * as courseClient from "../client";
import * as accountClient from "../../Account/client";

export default function PeopleTable() {
  const { cid } = useParams();
  const [users, setUsers] = useState<any>([]);

  const fetchUsers = async () => {
    if (cid === undefined) return;
    const u = await courseClient.findUsersForCourse(cid);
    setUsers(u);
  };
  const fetchAllUsers = async () => {
    const u = await accountClient.findAllUsers();
    setUsers(u);
  };
  useEffect(() => {
    if (cid !== undefined) fetchUsers();
    else fetchAllUsers();
  }, [cid]);

  return (
    <div id="wd-people-table">
      <PeopleDetails />
      <table className="table table-striped">
        <thead>
          <tr><th>Name</th><th>Login ID</th><th>Section</th><th>Role</th><th>Last Activity</th><th>Total Activity</th></tr>
        </thead>
        <tbody>
          {users
            .map((user: any) => (
              <tr key={user._id}>
                <Link to={`/Kanbas/Account/Users/${user._id}`} className="text-decoration-none">
                  <FaUserCircle className="me-2 fs-1 text-secondary" />
                  <span className="wd-first-name">{user.firstName}</span>{" "}
                  <span className="wd-last-name">{user.lastName}</span>
                </Link>
                <td className="wd-login-id">{user.loginId}</td>
                <td className="wd-section">{user.section}</td>
                <td className="wd-role">{user.role}</td>
                <td className="wd-last-activity">{user.lastActivity}</td>
                <td className="wd-total-activity">{user.totalActivity}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}