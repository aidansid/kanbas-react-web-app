import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses (7)</h2> <hr />
      <div id="wd-dashboard-courses" className="row">
        <div className="row row-cols-1 row-cols-md-5 g-4">
          <div className="wd-dashboard-course col" style={{ width: "300px" }}>
            <div className="card rounded-3 overflow-hidden">
              <Link className="wd-dashboard-course-link text-decoration-none text-dark"
                    to="/Kanbas/Courses/1234/Home">
                <img src="/images/react.png" width="100%" height={160}/>
                <div className="card-body">
                  <h5 className="wd-dashboard-course-title card-title">
                    CS1234 React JS
                  </h5>
                  <p className="wd-dashboard-course-title card-text">
                      Full Stack software developer
                  </p>
                  <button className="btn btn-primary"> Go </button>
                </div>
              </Link>
            </div>
          </div>
          <div className="wd-dashboard-course col" style={{ width: "300px" }}>
            <div className="card rounded-3 overflow-hidden">
              <Link className="wd-dashboard-course-link text-decoration-none text-dark"
                    to="/Kanbas/Courses/1/Home">
                <img src="/images/network.jpg" width="100%" height={160}/>
                <div className="card-body">
                  <h5 className="wd-dashboard-course-title card-title">
                    CY3700
                  </h5>
                  <p className="wd-dashboard-course-title card-text">
                      Network Security
                  </p>
                  <button className="btn btn-primary"> Go </button>
                </div>
              </Link>
            </div>
          </div>
          <div className="wd-dashboard-course col" style={{ width: "300px" }}>
            <div className="card rounded-3 overflow-hidden">
              <Link className="wd-dashboard-course-link text-decoration-none text-dark"
                    to="/Kanbas/Courses/2/Home">
                <img src="/images/data.jpg" width="100%" height={160}/>
                <div className="card-body">
                  <h5 className="wd-dashboard-course-title card-title">
                    CS2100
                  </h5>
                  <p className="wd-dashboard-course-title card-text">
                      Network Security
                  </p>
                  <button className="btn btn-primary"> Go </button>
                </div>
              </Link>
            </div>
          </div>
          <div className="wd-dashboard-course col" style={{ width: "300px" }}>
            <div className="card rounded-3 overflow-hidden">
              <Link className="wd-dashboard-course-link text-decoration-none text-dark"
                    to="/Kanbas/Courses/3/Home">
                <img src="/images/history.jpg" width="100%" height={160}/>
                <div className="card-body">
                  <h5 className="wd-dashboard-course-title card-title">
                    HIST2120
                  </h5>
                  <p className="wd-dashboard-course-title card-text">
                      U.S. History
                  </p>
                  <button className="btn btn-primary"> Go </button>
                </div>
              </Link>
            </div>
          </div>
          <div className="wd-dashboard-course col" style={{ width: "300px" }}>
            <div className="card rounded-3 overflow-hidden">
              <Link className="wd-dashboard-course-link text-decoration-none text-dark"
                    to="/Kanbas/Courses/4/Home">
                <img src="/images/writing.jpg" width="100%" height={160}/>
                <div className="card-body">
                  <h5 className="wd-dashboard-course-title card-title">
                    ENGL3000
                  </h5>
                  <p className="wd-dashboard-course-title card-text">
                      Creative Writing
                  </p>
                  <button className="btn btn-primary"> Go </button>
                </div>
              </Link>
            </div>
          </div>
          <div className="wd-dashboard-course col" style={{ width: "300px" }}>
            <div className="card rounded-3 overflow-hidden">
              <Link className="wd-dashboard-course-link text-decoration-none text-dark"
                    to="/Kanbas/Courses/5/Home">
                <img src="/images/broomstick.jpg" width="100%" height={160}/>
                <div className="card-body">
                  <h5 className="wd-dashboard-course-title card-title">
                    WZRD1220
                  </h5>
                  <p className="wd-dashboard-course-title card-text">
                      Intro to Flying
                  </p>
                  <button className="btn btn-primary"> Go </button>
                </div>
              </Link>
            </div>
          </div>
          <div className="wd-dashboard-course col" style={{ width: "300px" }}>
            <div className="card rounded-3 overflow-hidden">
              <Link className="wd-dashboard-course-link text-decoration-none text-dark"
                    to="/Kanbas/Courses/6/Home">
                <img src="/images/bee.jpg" width="100%" height={160}/>
                <div className="card-body">
                  <h5 className="wd-dashboard-course-title card-title">
                    BK1100
                  </h5>
                  <p className="wd-dashboard-course-title card-text">
                      Beekeeping 101
                  </p>
                  <button className="btn btn-primary"> Go </button>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
