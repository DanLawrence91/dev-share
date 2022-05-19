import React from "react";
import { Link } from "react-router-dom";

const ProjectsList = ({ projects }) => {
  // if (!projects.length) {
  //   return <h3>No Projects have been added yet!</h3>;
  // }

  return (
    <div>
      {projects &&
        projects.map((project) => (
          <div key={project._id}>
            <Link to={`/dashboard/${project.owner}`}>{project.owner}</Link>
            <span> has created this project and is looking for help</span>
            {/* {showUsername ? (
              
            ) : (
              <>
                <span>You created this project and need assistance</span>
              </>
            )} */}
            <div>
              <h4>{project.title}</h4>
              <p>{project.description}</p>
              <Link to={`/projects/${project._id}`}>Check out this project</Link>
            </div>
            <br />
          </div>
        ))}
    </div>
  );
};

export default ProjectsList;
