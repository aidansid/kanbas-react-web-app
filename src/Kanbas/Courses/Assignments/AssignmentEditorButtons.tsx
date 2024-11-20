import React from 'react';
import { useParams } from 'react-router';
import { addAssignment, updateAssignment } from './reducer';
import { useDispatch } from 'react-redux';
import * as assignmentClient from './client';

export default function AssignmentEditorButtons({ isNewAssignment, assignment }: {
    isNewAssignment: boolean; assignment: any;}) {
    const { cid } = useParams();
    const routeChange = () => {
        window.location.href = "#/Kanbas/Courses/" + cid + "/Assignments";
    };
    const dispatch = useDispatch();
    const createAssignment = async (assignment: any) => {
      await assignmentClient.addAssignment(assignment);
      dispatch(addAssignment(assignment));
    };
    const saveAssignment = async (assignment: any) => {
      await assignmentClient.updateAssignment(assignment);
      dispatch(updateAssignment(assignment));
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button id="wd-assignment-cancel-button" className="btn btn-md btn-secondary me-1" onClick={routeChange}>Cancel</button>
            {isNewAssignment ? (
                <button id="wd-assignment-save-button" className="btn btn-md btn-primary" onClick={() => {createAssignment(assignment); routeChange();}}>Save</button>
            ) : (
                <button id="wd-assignment-save-button" className="btn btn-md btn-primary" onClick={() => {saveAssignment(assignment); routeChange();}}>Save</button>
            )}
        </div>
    );
}