import React from "react";
import { useQuery } from "@apollo/client";
import ProjectsList from "../components/ProjectsList";
import { QUERY_PROJECTS } from "../utils/queries";

const Home = () => {
  const { data } = useQuery(QUERY_PROJECTS);

  const projects = data?.projects || [];

  return (
    <main>
      <h1>Looking for projects to contribute to? Or looking for people to assist with your current work?</h1>
      <h2>
        Welcome to the home of developer collaboration where beginners in the industry can find projects to work on and gain experience, whilst more experienced developers can find helping hands for their projects to free up their time to concentrate
        on more complex logic and code
      </h2>
      <br />
      <ProjectsList projects={projects} title="Some projects looking for your help!" />
      <br />
      <p>Feel free to browse through the projects above. Click on a project to be taken to the project page where you can see more information about the project and how to contribute.</p>
      <p>Once you have found a project you would like to work on, reach out to the owner with suggestions for the project or areas you would like to contirbute to wihtin that project.</p>
      <br />
      <p>Please see some examples of past projects below that users have joined through the site!</p>
      {/* Example projects would go here */}
    </main>
  );
};

export default Home;

// Introduction to website
// Text in middle
// Maybe show a picture or two - not sure of what yet
// May combine home and projects page
// Could show sample projects (maybe call past projects which now finished?)
