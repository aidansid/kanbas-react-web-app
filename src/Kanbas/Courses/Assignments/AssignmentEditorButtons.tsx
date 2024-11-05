import React from 'react';
import { useParams } from 'react-router';
import { addAssignment, updateAssignment } from './reducer';

export default function AssignmentEditorButtons({ isNewAssignment, assignment }: {
    isNewAssignment: boolean; assignment: any;}) {
    const { cid } = useParams();
    const routeChange = () => {
        window.location.href = "#/Kanbas/Courses/" + cid + "/Assignments";
    };
    return (
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button id="wd-assignment-cancel-button" className="btn btn-md btn-secondary me-1" onClick={routeChange}>Cancel</button>
            {isNewAssignment ? (
                <button id="wd-assignment-save-button" className="btn btn-md btn-primary" onClick={() => {addAssignment(assignment); routeChange();}}>Save</button>
            ) : (
                <button id="wd-assignment-save-button" className="btn btn-md btn-primary" onClick={() => {updateAssignment(assignment); routeChange();}}>Save</button>
            )}
        </div>
    );
}