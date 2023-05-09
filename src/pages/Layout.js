import { Outlet, Link } from "react-router-dom";
import classes from "./Layout.module.css";
const Layout = () => {
  return (
    <>
      <nav>
        <div className={classes["nav-bar"]}>
          <div>
            <Link className={classes["nav-link"]} to="/">
              Home
            </Link>
          </div>
          <div>
            <Link className={classes["nav-link"]} to="/history">
              History
            </Link>
          </div>
        </div>
      </nav>
      <Outlet />
    </>
  );
};

export default Layout;
