import React, { useState } from "react";
import AssignmentControls from './AssignmentControls';
import LessonControlButtons from './LessonControlButtons';
import AssignmentControlButtons from './AssignmentControlButtons';
import { BsGripVertical } from 'react-icons/bs';
import { IoMdArrowDropdown } from "react-icons/io";
import { TfiWrite } from "react-icons/tfi";
import "./index.css";
import { useParams } from "react-router";
import * as db from "../../Database";
import { addAssignment, deleteAssignment } from "./reducer";
import { useSelector, useDispatch } from "react-redux";

export default function Assignments() {
  const { cid } = useParams();
  const [assignmentName, setAssignmentName] = useState("");
  const { assignments } = useSelector((state: any) => state.assignmentReducer);
  const dispatch = useDispatch();

  return (
    <div>
      <AssignmentControls />
      <br /><br />
      <ul id="wd-assignments" className="list-group rounded-0">
        <li className="wd-assignment list-group-item p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-light">
            <BsGripVertical className="me-1 fs-3" />
            <IoMdArrowDropdown className="fs-3" /> 
            Assignments
            <AssignmentControlButtons /> 
          </div>
          <ul className="wd-lessons list-group rounded-0">
            {assignments
              .filter((assignment: any) => assignment.course === cid)
              .map((assignment: any) => (
              <li className="wd-lesson list-group-item p-3 ps-1">
                <BsGripVertical className="me-2 fs-3" />
                <TfiWrite className="me-2 fs-3" color="green"/>
                <LessonControlButtons assignmentId={assignment._id}
                  deleteAssignment={(assignmentId) => { dispatch(deleteAssignment(assignmentId)); }} />
                <span className="title" >
                  <b><a href={`#/Kanbas/Courses/${cid}/Assignments/${assignment._id}`} style={{ textDecoration: "none", color: "black" }}>{assignment.title}</a></b>
                </span>
                <p className="description">
                  <span style={{ color: "red" }}>Multiple Modules</span> | <b>Not available until</b> {assignment.startDate} | <br />
                  <b>Due</b> {assignment.dueDate} | {assignment.points} points
                </p>
              </li>
            ))}
          </ul>
        </li>
      </ul>
    </div>
  );
}