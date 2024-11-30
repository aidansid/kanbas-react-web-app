import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import * as enrollClient from "./client";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function Dashboard(
  { courses, course, setCourse, addNewCourse,
    deleteCourse, updateCourse, enrolling, setEnrolling, updateEnrollment }: {
    courses: any[]; course: any; setCourse: (course: any) => void;
    addNewCourse: () => void; deleteCourse: (course: any) => void;
    updateCourse: () => void; enrolling: boolean; setEnrolling: (enrolling: boolean) => void;
    updateEnrollment: (courseId: string, enrolled: boolean) => void; })
  {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const [enroll, setEnroll] = useState(false);
  const [enrolledCourses, setEnrolledCourses] = useState(
    courses.map((course) => course._id)
  );
  const [unenrolledCourses, setUnenrolledCourses] = useState(
    courses.map((course) => course._id)
  );

  const enrollCourse = async (uid: string, cid: string) => {
    await enrollClient.enrollUserInCourse(uid, cid);
    setEnrolledCourses([...enrolledCourses, cid]);
    setUnenrolledCourses(unenrolledCourses.filter((c) => c !== cid));
  };
  const unenrollCourse = async (uid: string, cid: string) => {
    await enrollClient.unenrollUserFromCourse(uid, cid);
    setEnrolledCourses(enrolledCourses.filter((c) => c !== cid));
    setUnenrolledCourses([...unenrolledCourses, cid]);
  };

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> 
      <button onClick={() => setEnrolling(!enrolling)} className="float-end btn btn-primary" >
          {enrolling ? "My Courses" : "All Courses"}
        </button><hr />
      {currentUser.role === "FACULTY" && (
        <><h5>New Course
          <button className="btn btn-primary float-end" id="wd-add-new-course-click"
            onClick={() => { addNewCourse(); setEnrolledCourses(enrolledCourses => [...enrolledCourses, courses[courses.length-1]._id]); }}> Add </button>
          <button className="btn btn-warning float-end me-2"
            onClick={updateCourse} id="wd-update-course-click"> Update </button>
        </h5><br /><input defaultValue={course.name} value={course.name} className="form-control mb-2"
          onChange={(e) => setCourse({ ...course, name: e.target.value })} /><textarea defaultValue={course.description} value={course.description} className="form-control"
            onChange={(e) => setCourse({ ...course, description: e.target.value })} /><hr /></>
      )}
      {currentUser.role === "STUDENT" && (
        <button className="btn btn-primary float-end" onClick={() => setEnroll(!enroll)} id="wd-enroll-click"> Enrollments </button>
      )}
      {(!enroll) && (
        <><h2 id="wd-dashboard-published">Courses ({enrolledCourses.length})</h2><hr /><div id="wd-dashboard-courses" className="row">
          <div className="row row-cols-1 row-cols-md-5 g-4">
            {courses
              .map((course) => (
                <div className="wd-dashboard-course col" style={{ width: "300px" }}>
                  <div className="card rounded-3 overflow-hidden">
                    <Link to={`/Kanbas/Courses/${course._id}/Home`}
                      className="wd-dashboard-course-link text-decoration-none text-dark">
                      <img src={course.image} width="100%" height={160} />
                      <div className="card-body">
                        <h5 className="wd-dashboard-course-title card-title">
                          {course.name} </h5>
                        <p className="wd-dashboard-course-title card-text overflow-y-hidden" style={{ maxHeight: 100 }}>
                          {course.description} </p>
                        <button className="btn btn-primary"> Go </button>
                        {currentUser.role === "FACULTY" && (
                          <><button onClick={(event) => {
                            event.preventDefault();
                            deleteCourse(course._id);
                            enrollCourse(currentUser._id, course._id);
                          } } className="btn btn-danger float-end"
                            id="wd-delete-course-click">
                            Delete
                          </button><button onClick={(event) => {
                            event.preventDefault();
                            setCourse(course);
                          } } className="btn btn-warning me-2 float-end"
                            id="wd-edit-course-click">
                              Edit
                            </button></>
                        )}
                      </div>
                    </Link>
                  </div>
                </div>
              ))}
          </div>
        </div></>
      )}
      {(enroll) && (
        <><h2 id="wd-dashboard-published">Enrollment ({courses.length})</h2><hr /><div id="wd-dashboard-courses" className="row">
        <div className="row row-cols-1 row-cols-md-5 g-4">
          {courses
            .map((course) => (
              <div className="wd-dashboard-course col" style={{ width: "300px" }}>
                <div className="card rounded-3 overflow-hidden">
                <Link to={`/Kanbas/Courses/${course._id}/Home`}
                    className="wd-dashboard-course-link text-decoration-none text-dark">
                    <img src={course.image} width="100%" height={160} />
                    <div className="card-body">
                      <h5 className="wd-dashboard-course-title card-title">
                        {course.name} </h5>
                      <p className="wd-dashboard-course-title card-text overflow-y-hidden" style={{ maxHeight: 100 }}>
                        {course.description} </p>
                    </div>
                  </Link>
                  <button className="btn btn-success" onClick={() => 
                    enrollCourse(currentUser._id, course._id)}> Enroll</button>
                  <button className="btn btn-danger float-end" onClick={() => 
                    unenrollCourse(currentUser._id, course._id)}> Unenroll</button>
                </div>
              </div>
            ))}
        </div>
      </div></>
    )}
    </div>
);}

