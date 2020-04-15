import React, { useState, useEffect } from "react";
import { uuid } from "uuidv4";

import "./app.css";
import { api } from "./services";
import Header from "./components/header";

const App = () => {
  const [projects, setProjects] = useState([]);
  const [project, setProject] = useState({});

  const handleAddProject = () => {
    api
      .post("projects", { ...project, owner: "undefined" })
      .then(({ data }) => {
        setProjects([...projects, data]);
      });
  };

  useEffect(() => {
    api.get("projects").then(({ data }) => {
      setProjects(data);
    });
  }, []);

  return (
    <>
      <Header title="Projects" />
      <ul>
        {projects.map((project) => (
          <li key={project.id}>{project.name}</li>
        ))}
      </ul>
      <input
        name="name"
        onChange={(e) => setProject({ name: e.target.value })}
      />
      <button type="button" disabled={!project.name} onClick={handleAddProject}>
        Adicionar projeto
      </button>
    </>
  );
};

export default App;
