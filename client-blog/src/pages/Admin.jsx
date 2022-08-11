import { NavLink, Route, Routes } from "react-router-dom";
import "../components/admin/Admin.scss";
import { Members } from "../components/admin/Members";
import { Projects } from "../components/admin/Projects";

export const Admin = () => {

  return (
    <div className="Admin">
      <div className="links">
        <div>
        <NavLink to="" end>
          Members
        </NavLink>
        </div>
        <div>
        <NavLink to="projects">Projects</NavLink>
        </div>
      </div>
      <Routes>
        <Route path="/" element={<Members />} />
        <Route path="/projects" element={<Projects />} />
      </Routes>
    </div>
  );
};
