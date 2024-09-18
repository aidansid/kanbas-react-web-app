import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses (7)</h2> <hr />
      <div id="wd-dashboard-courses">
        <div className="wd-dashboard-course">
          <Link className="wd-dashboard-course-link"
                to="/Kanbas/Courses/1234/Home">
            <img src="/images/reactjs.jpg" width={200} />
            <div>
              <h5>
                CS1234 React JS
              </h5>
              <p className="wd-dashboard-course-title">
                Full Stack software developer
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <br />
        <div className="wd-dashboard-course">
          <Link className="wd-dashboard-course-link"
                to="/Kanbas/Courses/1/Home">
            <img src="/images/reactjs.jpg" width={200} />
            <div>
              <h5>
                CY3700
              </h5>
              <p className="wd-dashboard-course-title">
                Network Security
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <br />
        <div className="wd-dashboard-course">
          <Link className="wd-dashboard-course-link"
                to="/Kanbas/Courses/1/Home">
            <img src="/images/reactjs.jpg" width={200} />
            <div>
              <h5>
                CS2100
              </h5>
              <p className="wd-dashboard-course-title">
                Data Structures
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <br />
        <div className="wd-dashboard-course">
          <Link className="wd-dashboard-course-link"
                to="/Kanbas/Courses/1/Home">
            <img src="/images/reactjs.jpg" width={200} />
            <div>
              <h5>
                HIST2120
              </h5>
              <p className="wd-dashboard-course-title">
                U.S. History
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <br />
        <div className="wd-dashboard-course">
          <Link className="wd-dashboard-course-link"
                to="/Kanbas/Courses/1/Home">
            <img src="/images/reactjs.jpg" width={200} />
            <div>
              <h5>
                ENGL3000
              </h5>
              <p className="wd-dashboard-course-title">
                Creative Writing
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <br />
        <div className="wd-dashboard-course">
          <Link className="wd-dashboard-course-link"
                to="/Kanbas/Courses/1/Home">
            <img src="/images/reactjs.jpg" width={200} />
            <div>
              <h5>
                WZRD1220
              </h5>
              <p className="wd-dashboard-course-title">
                Intro to Flying
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <br />
        <div className="wd-dashboard-course">
          <Link className="wd-dashboard-course-link"
                to="/Kanbas/Courses/1/Home">
            <img src="/images/reactjs.jpg" width={200} />
            <div>
              <h5>
                BK1100
              </h5>
              <p className="wd-dashboard-course-title">
                Beekeeping 101
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
