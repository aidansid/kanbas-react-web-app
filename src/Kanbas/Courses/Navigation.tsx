import { Link, useParams, useLocation } from "react-router-dom";

export default function CoursesNavigation() {
  const { cid } = useParams();
  const links = ["Home", "Modules", "Piazza", "Zoom", "Assignments", "Quizzes", "Grades", "People"];
  const { pathname } = useLocation();

  return (
    <div id="wd-courses-navigation" style={{width: 150, height: 50}}
         className="wd list-group fs-6">
      {links.map((link) => (
        <Link key={"/Kanbas/Courses"} to={link} className={`list-group-item text-danger border border-0
              ${pathname.includes(link) ? "active text-black" : "text-danger"}`}>
          <br />
          {link}
        </Link>
      ))}
    </div>
);}