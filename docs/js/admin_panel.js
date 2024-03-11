// window.location.replace("https://aryanranderiya.com/404");

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";

import {
  getDatabase,
  ref,
  set,
  get,
} from "https://www.gstatic.com/firebasejs/10.6.0/firebase-database.js";

import {
  getStorage,
  uploadBytes,
  ref as storageRef,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/10.6.0/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyAUfVSJ3BpDrlV7-6Ou9DWE3KX1jHHFGEY",
  authDomain: "aryanranderiya-portfolio.firebaseapp.com",
  projectId: "aryanranderiya-portfolio",
  storageBucket: "aryanranderiya-portfolio.appspot.com",
  messagingSenderId: "540599201791",
  appId: "1:540599201791:web:757239eec07a33dc9ec1ca",
  measurementId: "G-S3XP36W3P9",
};

initializeApp(firebaseConfig);
const database = getDatabase();
const storage = getStorage();

document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("submit-project-form")
    .addEventListener("submit", function (e) {
      e.preventDefault();
      insertFetchData();
    });
});

function init() {}

async function insertFetchData() {
  const databaseRecordCount = (await countDatabaseRecords()) + 1;
  var title = document.getElementById("project_title").value;
  const description = document.getElementById("project_description").value;
  const fileSelectorBanner = document.getElementById("file-selector-image");
  const fileSelectorDemo = document.getElementById("file-selector-demo");
  const fileSelectorDoc = document.getElementById("file-selector-doc");
  const tryProjectLink =
    document.getElementById("tryProjectLink").value || null;

  const fileBanner = fileSelectorBanner.files[0];
  const fileDemo = fileSelectorDemo.files[0];
  const fileDocumentation = fileSelectorDoc.files[0];

  const opensource = document.querySelector('input[name="opensource"]:checked');
  let githubLink,
    tech_stack = [];

  const type = document.querySelector(
    'input[name="project_type"]:checked'
  ).value;

  const techStackCheck = document.querySelectorAll(
    'input[name="tech_stack"]:checked'
  );

  const demo_type = document.querySelector(
    'input[name="demo_type"]:checked'
  ).value;

  for (var checkbox of techStackCheck) {
    tech_stack.push(checkbox.value);
  }

  if (opensource) githubLink = document.getElementById("githubLink").value;
  else githubLink = null;

  const project_id =
    databaseRecordCount +
    "_" +
    "project_" +
    title.replace(" ", "_") +
    "_" +
    Date.now();

  var projectsRef = ref(database, "Projects/" + project_id);

  uploadMedia(fileBanner, title, "Banner")
    .then((bannerDownloadURL) => {
      // then do this
      uploadMedia(fileDocumentation, title, "Doc")
        .then((documentURL) => {
          // then do this
          uploadMedia(fileDemo, title, "Demo")
            .then((demoDownloadURL) => {
              // then do this
              const projectData = {
                project_title: title,
                project_type: type,
                project_tech_stack: tech_stack.join(","),
                project_description: description,
                banner_image_URL: bannerDownloadURL,
                demo_file_URL: demoDownloadURL,
                documentation_URL: documentURL,
                github_link: githubLink,
                demo_type: demo_type,
                tryProjectLink: tryProjectLink,
              };

              console.log(`
                Uploading Data to DB:
                - Title: ${title}
                - Type: ${type}
                - Tech Stack: ${tech_stack.join(",")}
                - Description: ${description}
                - Banner Image URL: ${bannerDownloadURL}
                - Demo File URL: ${demoDownloadURL}
                - Documentation File URL" ${documentURL}
                - GitHub Link: ${githubLink}
                - Demo Type: ${demo_type}
              `);

              console.log("Uploading Data: " + projectData);

              set(projectsRef, projectData)
                .then(() => {
                  console.log("Data Successfully inserted!");
                  console.log(projectData);
                })
                .catch((e) => {
                  console.log(e);
                });
            })
            .catch((e) => {
              console.log(e);
            });
        })
        .catch((e) => {
          console.log(e);
        });
    })
    .catch((e) => {
      console.log(e);
    });

  document.getElementById("submit-project-form").reset();
}

async function uploadMedia(file, title, mediaType) {
  if (file) {
    const ref = storageRef(
      storage,
      `ProjectMedia/${title.replace(" ", "_")}/${file.name}`
    );
    console.log(`Uploading ${mediaType} to DB`);

    try {
      await uploadBytes(ref, file);
      const url = await getDownloadURL(ref);
      console.log(`Successfully Uploaded ${mediaType} to DB`);
      console.log(`${mediaType} url: ${url}`);
      return url;
    } catch (error) {
      console.error(`Error uploading ${mediaType} media:`, error);
      throw error;
    }
  } else {
    return null;
  }
}

async function countDatabaseRecords() {
  const database = getDatabase();
  const projectsRef = ref(database, "Projects");

  try {
    const snapshot = await get(projectsRef);

    if (snapshot.exists()) {
      console.log("Number of entries:", snapshot.size);
      return snapshot.size;
    } else {
      console.log("No data found in the database.");
      return 0;
    }
  } catch (error) {
    console.error("Error getting data from the database:", error);
    throw error;
  }
}
