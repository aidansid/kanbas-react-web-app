import CoursesNavigation from "./Navigation";
import Modules from "./Modules";
import Home from "./Home";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/Editor";
import Quizzes from "./Quizzes";
import PeopleTable from "./People/Table";
import { courses } from "../Database";
import { FaAlignJustify } from "react-icons/fa6";
import { Navigate, Route, Routes, useParams, useLocation } from "react-router";
import ProtectedRoute from "../ProtectedRoute";
import { addAssignment } from "./Assignments/reducer";
import QuizEditor from "./Quizzes/Editor";
import * as courseClient from "./client";
import QuizDetails from "./Quizzes/Details";
import QuizPreview from "./Quizzes/Preview";
import Grades from "./Grades";
import QuizGrades from "./Quizzes/Grades";

export default function Courses({ courses }: { courses: any[]; }) {
  const { cid } = useParams();
  const course = courses.find((course) => course._id === cid);
  const { pathname } = useLocation();

  return (
    <div id="wd-courses">
      <h2 className="text-danger">
        <FaAlignJustify className="me-4 fs-4 mb-1" />
        {course && course.name +' > ' + pathname.split("/")[4]}{course && course.name && pathname.split("/")[4] === "Quizzes" && 
          (pathname.split("/")[5] === "Edit" || pathname.split("/")[5] === "Detail") && " > " + pathname.split("/")[5]}
      </h2><hr />
      <div className="d-flex">
        <div className="d-none d-md-block">
          <CoursesNavigation />
        </div>
        <div className="flex-fill">
          <ProtectedRoute cid={cid || ""}><Routes>
            <Route path="Home" element={<Home />} />
            <Route path="Modules" element={<Modules />} />
            <Route path="Assignments" element={<Assignments />} />
            <Route path="Assignments/:aid" element={<AssignmentEditor />} />
            <Route path="Quizzes" element={<Quizzes />} />
            <Route path="Quizzes/Edit/:qid" element={<QuizEditor />} />
            <Route path="Quizzes/Detail/:qid" element={<QuizDetails />} />
            <Route path="Quizzes/Preview/:qid" element={<QuizPreview />} />
            <Route path="Grades" element={<Grades />} />
            <Route path="Grades/:qid" element={<QuizGrades />} />
            <Route path="People" element={<PeopleTable />} />
          </Routes></ProtectedRoute>
        </div>
      </div>
    </div>
  );
}

