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
  // setTimeout(() => {
  //   const techStackCheck = document.querySelectorAll(
  //     'input[name="tech_stack"]:checked'
  //   );
  //   var tech_stack = [];
  //   for (var checkbox of techStackCheck) {
  //     tech_stack.push(checkbox.value);
  //   }

  //   console.log("test" + tech_stack.join(","));
  // }, 5000);

  document
    .getElementById("submit-project-form")
    .addEventListener("submit", function (e) {
      e.preventDefault();

      insertFetchData();
    });
});

async function insertFetchData() {
  const databaseRecordCount = (await countDatabaseRecords()) + 1;
  console.log("dbrc: " + databaseRecordCount);

  var title = document.getElementById("project_title").value;
  const description = document.getElementById("project_description").value;
  const fileSelectorBanner = document.getElementById("file-selector-image");
  const fileSelectorDemo = document.getElementById("file-selector-demo");
  const fileBanner = fileSelectorBanner.files[0];
  const fileDemo = fileSelectorDemo.files[0];

  let githubLink, bannerDownloadURL, demoDownloadURL;

  const type = document.querySelector(
    'input[name="project_type"]:checked'
  ).value;

  const techStackCheck = document.querySelectorAll(
    'input[name="tech_stack"]:checked'
  );

  const opensource = document.querySelector('input[name="opensource"]:checked');

  const demo_type = document.querySelector(
    'input[name="demo_type"]:checked'
  ).value;

  if (opensource) githubLink = document.getElementById("githubLink").value;
  else githubLink = null;

  var tech_stack = [];
  for (var checkbox of techStackCheck) {
    tech_stack.push(checkbox.value);
  }

  const project_id =
    databaseRecordCount +
    "_" +
    "project_" +
    title.replace(" ", "_") +
    "_" +
    Date.now();

  var projectsRef = ref(database, "Projects/" + project_id);

  if (fileBanner) {
    const bannerStorageRef = storageRef(
      storage,
      "ProjectImages/" + title.replace(" ", "_") + "-" + fileBanner.name
    );

    if (fileDemo) {
      const demoStorageRef = storageRef(
        storage,
        "ProjectImages/" + title.replace(" ", "_") + "-" + fileDemo.name
      );

      console.log("Uploading Banner to DB");
      uploadBytes(bannerStorageRef, fileBanner)
        .then(() => {
          console.log("Successfully Uploaded Banner to DB");

          getDownloadURL(bannerStorageRef).then((url) => {
            bannerDownloadURL = url.toString();

            console.log("Uploading Demo Media to DB");
            uploadBytes(demoStorageRef, fileDemo).then(() => {
              console.log("Successfully Uploaded Demo Media to DB");

              getDownloadURL(bannerStorageRef).then((url) => {
                demoDownloadURL = url.toString();

                console.log(`
                  Uploading Data to DB:
                  - Title: ${title}
                  - Type: ${type}
                  - Tech Stack: ${tech_stack.join(",")}
                  - Description: ${description}
                  - Banner Image URL: ${bannerDownloadURL}
                  - Demo File URL: ${demoDownloadURL}
                  - GitHub Link: ${githubLink}
                  - Demo Type: ${demo_type}
                `);

                set(projectsRef, {
                  project_title: title,
                  project_type: type,
                  project_tech_stack: tech_stack.join(","),
                  project_description: description,
                  banner_image_URL: bannerDownloadURL,
                  demo_file_URL: demoDownloadURL,
                  github_link: githubLink,
                  demo_type: demo_type,
                })
                  .then(() => {
                    console.log("Data Successfully inserted!");
                  })
                  .catch((error) => {
                    console.error(error);
                  });
              });
            });
          });
        })

        .catch((error) => {
          console.error("Error uploading image:", error);
        });
    } else {
      console.log("No file selected. (Mockup)");
    }
  } else {
    console.warn("No file selected. (Banner)");
  }

  document.getElementById("submit-project-form").reset();
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
