// // modules/projects.js
// const projectData = require("../data/projectData");
// const sectorData = require("../data/sectorData");

// let projects = [];

// /**
//  * initialize()
//  * fills `projects` by copying each projectData object and adding a `sector` property
//  * (value = matching sectorData.sector_name) 
//  * resolves with no data when done, rejects on error
//  */
// function initialize() {
//   return new Promise((resolve, reject) => {
//     try {
//       projects = []; // reset (safe to call multiple times)

//       projectData.forEach((p) => {
//         // find matching sector object by id
//         const sectorObj = sectorData.find((s) => s.id === p.sector_id);
//         const sectorName = sectorObj ? sectorObj.sector_name : "Unknown";

//         // create a shallow copy and add sector
//         const projectWithSector = { ...p, sector: sectorName };
//         projects.push(projectWithSector);
//       });

//       resolve(); // no data required by spec
//     } catch (err) {
//       reject("Unable to initialize projects: " + err);
//     }
//   });
// }

// /**
//  * getAllProjects()
//  * resolves with the completed projects array, rejects if not initialized/empty
//  */
// function getAllProjects() {
//   return new Promise((resolve, reject) => {
//     if (!projects || projects.length === 0) {
//       reject("No projects available!! Have you called initialize()?");
//     } else {
//       resolve(projects);
//     }
//   });
// }

// /**
//  * getProjectById(projectId)
//  * resolves with the found project object or rejects with an appropriate message
//  */
// function getProjectById(projectId) {
//   return new Promise((resolve, reject) => {
//     const idNumber = Number(projectId);
//     if (Number.isNaN(idNumber)) {
//       reject("Invalid projectId provided!!");
//       return;
//     }

//     const proj = projects.find((p) => p.id === idNumber);
//     if (!proj) {
//       reject("Unable to find requested project!!");
//     } else {
//       resolve(proj);
//     }
//   });
// }

// /**
//  * getProjectsBySector(sector)
//  * case-insensitive partial match on the project's `sector` property
//  * resolves with array of matches or rejects with an appropriate message
//  */
// function getProjectsBySector(sector) {
//   return new Promise((resolve, reject) => {
//     if (!sector || typeof sector !== "string") {
//       reject("Invalid sector parameter!!");
//       return;
//     }

//     const needle = sector.toLowerCase();
//     const matches = projects.filter(
//       (p) => p.sector && p.sector.toLowerCase().includes(needle)
//     );

//     if (!matches || matches.length === 0) {
//       reject("Unable to find requested projects!!");
//     } else {
//       resolve(matches);
//     }
//   });
// }

// module.exports = {
//   initialize,
//   getAllProjects,
//   getProjectById,
//   getProjectsBySector,
// };

// // ====
// // Run "node modules/projects.js" to test

// initialize();

// console.log("All Projects:");
// console.log(getAllProjects());

// console.log("\nProject with ID 9:");
// console.log(getProjectById(9));

// console.log("\nProjects in sector 'agriculture':");
// console.log(getProjectsBySector("agriculture"));

// =====


const projectData = require("../data/projectData");
const sectorData = require("../data/sectorData");

let projects = [];


function initialize() {
  return new Promise((resolve, reject) => {
    try {
      projects = projectData.map((proj) => {
        let sectorObj = sectorData.find((sec) => sec.id === proj.sector_id);
        return {
          ...proj,
          sector: sectorObj ? sectorObj.sector_name : "Unknown"
        };
      });
      resolve(); 
    } catch (err) {
      reject("Error initializing projects: " + err);
    }
  });
}

// this return all projects
function getAllProjects() {
  return new Promise((resolve, reject) => {
    if (projects.length > 0) {
      resolve(projects);
    } else {
      reject("No projects available");
    }
  });
}

// this returns a project by id
function getProjectById(projectId) {
  return new Promise((resolve, reject) => {
    const project = projects.find((p) => p.id === projectId);
    if (project) {
      resolve(project);
    } else {
      reject("Unable to find requested project with id: " + projectId);
    }
  });
}

// this return projects by sector
function getProjectsBySector(sector) {
  return new Promise((resolve, reject) => {
    const searchText = sector.toLowerCase();
    const matches = projects.filter((p) =>
      p.sector.toLowerCase().includes(searchText)
    );

    if (matches.length > 0) {
      resolve(matches);
    } else {
      reject("Unable to find requested projects for sector: " + sector);
    }
  });
}

module.exports = {
  initialize,
  getAllProjects,
  getProjectById,
  getProjectsBySector
};


// =======
// initialize()
//   .then(() => getAllProjects())
//   .then((all) => {
//     console.log("All Projects:", all.length);

//     return getProjectById(9);
//   })
//   .then((project) => {
//     console.log("Project with ID 9:", project);

//     return getProjectsBySector("agriculture");
//   })
//   .then((projects) => {
//     console.log("Projects in Agriculture:", projects.length);
//   })
//   .catch((err) => {
//     console.log("Error:", err);
//   });

