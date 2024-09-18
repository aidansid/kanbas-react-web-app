export default function AssignmentEditor() {
  return (
    <div id="wd-assignments-editor">
      <label htmlFor="wd-name">Assignment Name</label> <br /><br />
      <input id="wd-name" value="A1 - ENV + HTML" /><br /><br />
      <textarea id="wd-description">
        The assignment is available online Submit a link to the landing page of
      </textarea>
      <br />
      <br />
      <table>
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-points">Points</label>
          </td>
          <td>
            <input id="wd-points" value={100}/>
          </td>
        </tr>
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-role">Assignment Group</label>
          </td>
          <td>
            <select id="wd-role">
              <option value="USER">User</option>
              <option value="ADMIN">Admin</option>
              <option value="FACULTY">Faculty</option>
              <option value="STUDENT">Student</option>
            </select><br/>
          </td>
        </tr>
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-display-grade-as">Display Grade as</label>
          </td>
          <td>
            <select id="wd-display-grade-as">
              <option value="PERCENTAGE">Percentage</option>
              <option value="LETTER">Letter</option>
            </select><br/>
          </td>
        </tr>
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-submission-type">Submission Type</label>
          </td>
          <td>
            <select id="wd-submission-type">
              <option value="ONLINE">Online</option>
              <option value="HANDIN">Hand In</option>
            </select><br/>
          </td>
        </tr>
        <br />
        <tr>
          <td>
            {/* nothing */}
          </td>
          <td>
            <label>Online Entry Options</label><br />

            <input type="checkbox" name="check-entry-opt" id="wd-text-entry"/>
            <label htmlFor="wd-text-entry">Text Entry</label><br />

            <input type="checkbox" name="check-entry-opt" id="wd-website-url	"/>
            <label htmlFor="wd-website-url">Website URL</label><br />

            <input type="checkbox" name="check-entry-opt" id="wd-media-recordings"/>
            <label htmlFor="wwd-media-recordings">Media Recordings</label><br />

            <input type="checkbox" name="check-entry-opt" id="wd-student-annotation"/>
            <label htmlFor="wd-student-annotation">Student Annotation</label><br />

            <input type="checkbox" name="check-entry-opt" id="wd-file-upload"/>
            <label htmlFor="wd-file-upload">File Uploads</label>
          </td>
        </tr>
        <br />
        <tr>
          <td align="right" valign="top">
            <label>Assign</label>
          </td>
          <table>
            <tr>
              <td valign="top">
                <label htmlFor="wd-assign-to">Assign To</label>
              </td>
            </tr>
            <tr>
              <td>
                <select id="wd-assign-to">
                  <option value="ALL">All</option>
                  <option value="SECTION">Section</option>
                  <option value="INDIVIDUAL">Individual</option>
                </select>
              </td>   
            </tr>
            <br />
            <tr>
              <td valign="top">
                <label htmlFor="wd-due-date">Due</label>
              </td>
            </tr>
            <tr>
              <td align="right">
                <input id="wd-due-date" type="date" />
              </td>
            </tr>
            <br />
            <tr>
              <td valign="top">
                <label htmlFor="wd-available-from">Available From</label>
              </td>
              <td valign="top">
                <label htmlFor="wd-available-until">Until</label>
              </td>
            </tr>
            <tr>
              <td align="right">
                <input id="wd-available-from" type="date" />
              </td>
              <td align="right">
                <input id="wd-available-until" type="date" />
              </td>
            </tr>
            <br />
            {/*
            <tr>
              <td>

              </td>
              <td align="right">
                <button id="wd-assignment-save-button" type="button">Save</button>
                <button id="wd-assignment-cancel-button" type="button">Cancel</button>
              </td>
            </tr>
            */}
          </table>
        </tr>
      </table>
      <hr></hr>
      <button id="wd-assignment-save-button" type="button">Save</button>
      &nbsp;&nbsp;
      <button id="wd-assignment-cancel-button" type="button">Cancel</button>
    </div>
);}
