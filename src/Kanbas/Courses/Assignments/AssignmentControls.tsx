import { FaPlus } from "react-icons/fa6";
import AssignmentEditor from './Editor';
import { useParams, useLocation } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import * as assignmentClient from "./client";
import { addAssignment } from "./reducer";
import { useState } from "react";

export default function AssignmentControls() {
  const { cid } = useParams();
  const dispatch = useDispatch();
  const createAssignment = async () => {
    const a = { title: "New Assignment", course: cid, description: "", points: 0, startDate: "", dueDate: ""};
    const newAssignment = await assignmentClient.addAssignment(a);
    dispatch(addAssignment(newAssignment));
  };
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  return (
    <div id="wd-assignments-controls" className="text-nowrap">
      {currentUser.role === "FACULTY" && (
        <button
          className="btn btn-lg btn-danger me-1 float-end"
          id="wd-add-assignment-btn"
          onClick={() => {
            createAssignment();
          }}
        >
          <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
          Assignment
        </button>
      )}
      <button id="wd-add-module-btn" className="btn btn-lg btn-secondary me-1 float-end">
        <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
        Group
      </button>
      <div className="d-flex align-items-left md-3">     
          <input type="text" className="icon" placeholder="Search..."/>
      </div>
    </div>
  );
} 