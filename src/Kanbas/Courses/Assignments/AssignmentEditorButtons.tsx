export default function AssignmentEditorButtons() {
    return (
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button id="wd-assignment-cancel-button" className="btn btn-md btn-secondary me-1">Cancel</button>
            <button id="wd-assignment-save-button" className="btn btn-md btn-danger">Save</button>
        </div>
    );
}