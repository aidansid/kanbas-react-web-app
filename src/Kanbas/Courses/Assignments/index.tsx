import React, { useEffect, useState } from "react";
import AssignmentControls from './AssignmentControls';
import LessonControlButtons from './LessonControlButtons';
import AssignmentControlButtons from './AssignmentControlButtons';
import { BsGripVertical } from 'react-icons/bs';
import { IoMdArrowDropdown } from "react-icons/io";
import { TfiWrite } from "react-icons/tfi";
import "./index.css";
import { useParams } from "react-router";
import { addAssignment, deleteAssignment, updateAssignment, setAssignments } from "./reducer";
import { useSelector, useDispatch } from "react-redux";
import * as assignmentClient from "./client";

export default function Assignments() {
  const { cid } = useParams();
  const { assignments } = useSelector((state: any) => state.assignmentReducer);
  const dispatch = useDispatch();
  const fetchAssignments = async () => {
    const assignments = await assignmentClient.fetchAssignmentsForCourse(cid as string);
    dispatch(setAssignments(assignments));
  };
  useEffect(() => {
    fetchAssignments();
  }, []);
  const removeAssignment = async (assignmentId: string) => {
    await assignmentClient.deleteAssignment(assignmentId);
    dispatch(deleteAssignment(assignmentId));
  }

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
            {assignments.map((assignment: any) => (
              <li className="wd-lesson list-group-item p-3 ps-1">
                <BsGripVertical className="me-2 fs-3" />
                <TfiWrite className="me-2 fs-3" color="green"/>
                <LessonControlButtons assignmentId={assignment._id} deleteAssignment={(assignmentId) => removeAssignment(assignmentId)} />
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