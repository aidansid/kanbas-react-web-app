import AssignmentControls from './AssignmentControls';
import LessonControlButtons from './LessonControlButtons';
import AssignmentControlButtons from './AssignmentControlButtons';
import { BsGripVertical } from 'react-icons/bs';
import { IoMdArrowDropdown } from "react-icons/io";
import { TfiWrite } from "react-icons/tfi";
import "./index.css";

export default function Assignments() {
  return (
    <div>
      <AssignmentControls /><br /><br />
      <ul id="wd-modules" className="list-group rounded-0">
        <li className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-light">
            <BsGripVertical className="me-1 fs-3" />
            <IoMdArrowDropdown className="fs-3" /> 
            Assignments
            <AssignmentControlButtons /> 
          </div>
          <ul className="wd-lessons list-group rounded-0">
            <li className="wd-lesson list-group-item p-3 ps-1">
              <BsGripVertical className="me-2 fs-3" />
              <TfiWrite className="me-2 fs-3" color="green"/>
              <LessonControlButtons />
              <span className="title" >
                <b><a href="#/Kanbas/Courses/1234/Assignments/1" style={{ textDecoration: "none", color: "black" }}>A1</a></b>
              </span>
              <p className="description">
                <span style={{ color: "red" }}>Multiple Modules</span> | <b>Not available until</b> May 6 at 12:00am | <br />
                <b>Due</b> May 13 at 11:59pm | 100 points
              </p>
            </li>
            <li className="wd-lesson list-group-item p-3 ps-1"> 
            <BsGripVertical className="me-2 fs-3" />
              <TfiWrite className="me-2 fs-3" color="green"/>
              <LessonControlButtons />
              <span className="title" >
                <b><a href="#/Kanbas/Courses/1234/Assignments/2" style={{ textDecoration: "none", color: "black" }}>A2</a></b>
              </span>
              <p className="description">
                <span style={{ color: "red" }}>Multiple Modules</span> | <b>Not available until</b> May 13 at 12:00am | <br />
                <b>Due</b> May 20 at 11:59pm | 100 points
              </p>
            </li>
            <li className="wd-lesson list-group-item p-3 ps-1">
            <BsGripVertical className="me-2 fs-3" />
              <TfiWrite className="me-2 fs-3" color="green"/>
              <LessonControlButtons />
              <span className="title" >
                <b><a href="#/Kanbas/Courses/1234/Assignments/3" style={{ textDecoration: "none", color: "black" }}>A3</a></b>
              </span>
              <p className="description">
                <span style={{ color: "red" }}>Multiple Modules</span> | <b>Not available until</b> May 20 at 12:00am | <br />
                <b>Due</b> May 27 at 11:59pm | 100 points
              </p>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
}