/********************************************************************************
* WEB322 – Assignment 01
*
* I declare that this assignment is my own work in accordance with Seneca's
* Academic Integrity Policy:
*
* https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
*
* Name: Sahan Vimukthi Hewa Gallage    Student ID: 178061230   Date: 2025-09-27
*
********************************************************************************/

const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;

const projectData = require("./modules/projects");


projectData.initialize()
  .then(() => {

    
    app.get("/", (req, res) => {
      res.send("Assignment 1: Sahan Vimukthi Hewa Gallage - 178061230");
    });

    
    app.get("/solutions/projects", (req, res) => {
      projectData.getAllProjects()
        .then((projects) => res.json(projects))
        .catch((err) => res.status(500).send(err));
    });


    app.get("/solutions/projects/id-demo", (req, res) => {
      // changed the demoId to any valid id from the projectData
      const demoId = 9;
      projectData.getProjectById(demoId)
        .then((project) => res.json(project))
        .catch((err) => res.status(404).send(err));
    });

    app.get("/solutions/projects/sector-demo", (req, res) => {
      
      const demoSector = "agriculture";
      projectData.getProjectsBySector(demoSector)
        .then((matches) => res.json(matches))
        .catch((err) => res.status(404).send(err));
    });

    
    app.listen(PORT, () => {
      console.log(`Server is listening on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to initialize project data:", err);
  });
