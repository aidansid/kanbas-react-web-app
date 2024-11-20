import React, { useEffect, useState } from "react";
import AssignmentEditorButtons from "./AssignmentEditorButtons";
import "./index.css";
import { useParams, useLocation } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { addAssignment, updateAssignment } from "./reducer";
import * as assignmentClient from "./client";

export default function AssignmentEditor() {
  const { cid } = useParams();
  const { pathname } = useLocation();
  const aid = pathname.split("/")[5];
  const [assignment, setAssignment] = useState<any>();

  const fetchAssignments = async () => {
    const a = await assignmentClient.fetchAssignment(aid);
    setAssignment(a);
  };
  useEffect(() => {
    fetchAssignments();
  }, []);

  let isNewAssignment = true;
  if (assignment) {
    isNewAssignment = false;
  }

  let newAssignment = {_id: aid, title: "New Assignment", course: cid, description: "No description found for this assignment.", points: 0, dueDate: "", startDate: ""};
  if (!isNewAssignment) {
    newAssignment = {_id: aid, title: assignment.title, course: cid, description: assignment.description, points: assignment.points, dueDate: assignment.dueDate, startDate: assignment.startDate};
  }

  return (
    <div id="wd-assignments-editor">
      <div id="wd-name">
        Assignment Name
        <div className="name">
          <input type="text" className="form-control" id="wd-points" placeholder={newAssignment.title} onChange={(e) => {
              newAssignment.title = e.target.value;}
              }/>
        </div>
      </div> <br />
      <div id="wd-description">
          <div className="editordescription">
            <p> 
              <input type="text" id="wd-description" className="form-control" placeholder={newAssignment.description} onChange={(e) => {
                newAssignment.description = e.target.value; } 
              }/>
            </p>
          </div>
      </div> <br />
      <form>
        <div className="form row">
          <div className="col-md-2 d-flex align-items-center justify-content-end">
            <label id="wd-points" className="col-form-label">Points</label>
          </div>
          <div className="col-sm-10">
            <input type="text" className="form-control" id="wd-points" placeholder={newAssignment.points.toString()} onChange={(e) => {
              newAssignment.points = parseInt(e.target.value, 10); }
            }/>
          </div>
        </div> <br />
        <div className="form row">
          <div className="col-md-2 d-flex align-items-center justify-content-end">
            <label id="wd-role" className="col-sm-7 col-form-label">Assignment Group</label>
          </div>
          <div className="col-sm-10">
            <select id="wd-role" className="form-select">
              <option value="USER">User</option>
              <option value="ADMIN">Admin</option>
              <option value="FACULTY">Faculty</option>
              <option value="STUDENT">Student</option>
            </select>
          </div>
        </div> <br />
        <div className="form row">
          <div className="col-md-2 d-flex align-items-center justify-content-end">
            <label id="wd-display-grade-as" className="col-sm-7 col-form-label">Display Grade as</label>
          </div>
          <div className="col-sm-10">
            <select id="wd-display-grade-as" className="form-select">
              <option value="PERCENTAGE">Percentage</option>
              <option value="LETTER">Letter</option>
            </select>
          </div>
        </div> <br />
        <div className="form row">
          <div className="col-md-2 d-flex align-items-top justify-content-end">
            <label id="wd-submission-type" className="col-sm-7 col-form-label">Submission Type</label>
          </div>
            <div className="col-sm-10">
              <div className="editordescription">
              <select id="wd-submission-type" className="form-select">
                <option value="ONLINE">Online</option>
                <option value="HANDIN">Hand In</option>
              </select>
              <label className="col-sm-2 col-form-label"><b>Online Entry Options</b></label>
              <div className="col-sm-10">
                <div className="form-check">
                  <input type="checkbox" className="form-check-input" id="wd-text-entry"/>
                  <label className="form-check-label" htmlFor="wd-text-entry">Text Entry</label>
                </div>
                <div className="form-check">
                  <input type="checkbox" className="form-check-input" id="wd-website-url"/>
                  <label className="form-check-label" htmlFor="wd-website-url">Website URL</label>
                </div>
                <div className="form-check">
                  <input type="checkbox" className="form-check-input" id="wd-media-recordings"/>
                  <label className="form-check-label" htmlFor="wd-media-recordings">Media Recordings</label>
                </div>
                <div className="form-check">
                  <input type="checkbox" className="form-check-input" id="wd-student-annotation"/>
                  <label className="form-check-label" htmlFor="wd-student-annotation">Student Annotation</label>
                </div>
                <div className="form-check">
                  <input type="checkbox" className="form-check-input" id="wd-file-upload"/>
                  <label className="form-check-label" htmlFor="wd-file-upload">File Uploads</label>
                </div>
              </div>
            </div>
          </div>
        </div> <br />
        <div className="form row">
          <div className="col-md-2 d-flex align-items-top justify-content-end">
            <label id="wd-assign" className="col-sm-2 col-form-label">Assign</label>
          </div>
          <div className="col-sm-10">
            <div className="editordescription">
              <label id="wd-assign-to"><b>Assign to</b></label>
              <select id="wd-assign-to" className="form-select">
                <option value="ALL">Everyone</option>
                <option value="SECTION">Section</option>
                <option value="INDIVIDUAL">Individual</option>
              </select> <br />
              <label id="wd-due-date"><b>Due</b></label>
              <input type="datetime-local" className="form-control" id="wd-due-date" placeholder={newAssignment.dueDate}/> <br />
              <div className="form row">
                <div className="form-group col-md-6">
                  <label id="wd-available-from"><b>Available From</b></label>
                  <input type="datetime-local" className="form-control" id="wd-available-from" placeholder={newAssignment.startDate}/>
                </div>
                <div className="form-group col-md-6">
                  <label id="wd-available-until"><b>Until</b></label>
                  <input type="datetime-local" className="form-control" id="wd-available-until"/>
                </div>
              </div> <br />
            </div>
          </div>
        </div> <br />
        <AssignmentEditorButtons isNewAssignment={isNewAssignment} assignment={newAssignment} />
      </form>
    </div>
  );
}