import React from 'react';
import { useParams, useNavigate } from "react-router";
import { addAssignment, updateAssignment } from './reducer';
import { useDispatch } from 'react-redux';
import * as assignmentClient from './client';

export default function AssignmentEditorButtons({ assignment }: {
    assignment: any;}) {
    const { cid } = useParams();
    const navigate = useNavigate();
    const routeChange = () => {
        navigate(`/Kanbas/Courses/${cid}/assignments`);
    };
    const dispatch = useDispatch();
    const saveAssignment = async (assignment: any) => {
      await assignmentClient.updateAssignment(assignment);
      dispatch(updateAssignment(assignment));
      navigate(`/Kanbas/Courses/${cid}/assignments`);
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button id="wd-assignment-cancel-button" className="btn btn-md btn-secondary me-1" onClick={routeChange}>Cancel</button>
            <button id="wd-assignment-save-button" className="btn btn-md btn-primary" onClick={() => {saveAssignment(assignment);}}>Save</button>
        </div>
    );
}