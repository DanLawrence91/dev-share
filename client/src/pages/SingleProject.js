import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

import CommentForm from "../components/CommentForm";
import Comments from "../components/Comments";

import { QUERY_SINGLE_PROJECT } from "../utils/queries";

const SingleProject = () => {
  const { projectId } = useParams();

  const { loading, data } = useQuery(QUERY_SINGLE_PROJECT, {
    variables: { projectId: projectId },
  });

  const project = data?.project || {};

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h3>
        {project.owner} is looking for assistance with their project {project.title}
      </h3>
      <p>Please see some more information regarding the project below:</p>
      <br />
      <p>{project.description}</p>
      <p>People currently contributing to this project include: {project.contributors}</p>
      <p>
        Follow this link to the github repository: <a href={project.link}>Github repo</a>
      </p>
      <br />
      <div>
        <p>Here is what others thing of the project: </p>
        <Comments comments={project.comments} />
      </div>
      <div>
        <p>Have your say on this project or ask questions if you want to know more: </p>
        <CommentForm projectId={project._id} />
      </div>
    </div>
  );
};

export default SingleProject;

// Will show in detail about one project
// Title and owner contact details at top
// Section for description below
// Maybe list of tech below this in column with comments next to it
// Also will show contributors list
// Maybe think about function to close project when complete? Make it no longer editable
// if project owned by user they can have edit button to edit the description and contributors
