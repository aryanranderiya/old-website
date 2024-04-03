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
  setupAddLinks();
});

function setupAddLinks() {
  const add_another_link = document.querySelector(".add_another_link");
  const links = document.querySelector(".links");
  var count = 1;
  add_another_link.addEventListener("click", () => {
    count++;
    const link = document.createElement("div");
    link.classList.add("link");
    link.innerHTML = `
    <input class="link_text" id="link_${count}" type="text" placeholder="Enter Link Name">
    <input class="link_url" id="link_${count}" type="url" placeholder="Enter Link URL">`;
    links.appendChild(link);
  });
}

async function insertFetchData() {
  const databaseRecordCount = (await countDatabaseRecords()) + 1;
  var title = document.getElementById("project_title").value;
  const comments = document.getElementById("personal_comments").value || null;
  const description = document.getElementById("project_description").value;
  const project_creation = document.getElementById("project_creation").value;
  const fileSelectorBanner = document.getElementById("file-selector-image");
  const fileSelectorDemo = document.getElementById("file-selector-demo");
  const documentation_text =
    document.getElementById("documentation_text").value;
  const links = document.querySelectorAll(".link");
  var links_obj = [];

  links.forEach((link) => {
    const text = link.querySelector(".link_text").value;
    const url = link.querySelector(".link_url").value;
    if (text && url) links_obj.push([text, url]);
  });

  const fileBanner = fileSelectorBanner.files[0];
  const fileDemo = fileSelectorDemo.files[0];

  let tech_stack = [];

  var type = document.querySelector('input[name="project_type"]:checked').value;
  if (type === "other172t63786123")
    type = document.querySelector(".other_project_type").value;

  const techStackCheck = document.querySelectorAll(
    'input[name="tech_stack"]:checked'
  );

  const demo_type = document.querySelector(
    'input[name="demo_type"]:checked'
  ).value;

  if (document.querySelector('input[name="project_type_radio"]:checked')) {
    var other_types = document.querySelector(".other_project_tech").value;
    other_types = other_types.split(",");
    for (var stack of other_types) tech_stack.push(stack.trim());
  }

  for (var checkbox of techStackCheck) tech_stack.push(checkbox.value);

  var githubLink = document.getElementById("githubLink").value || null;

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
      uploadMedia(fileDemo, title, "Demo")
        .then((demoDownloadURL) => {
          // then do this
          const projectData = {
            project_title: title,
            project_type: stack,
            project_tech_stack: tech_stack,
            project_description: description,
            project_creation: project_creation,
            personal_comments: comments,
            banner_image_URL: bannerDownloadURL,
            demo_file_URL: demoDownloadURL,
            github_link: githubLink,
            demo_type: demo_type,
            documentation_text: documentation_text,
            links: links_obj,
          };

          console.log(`
                Uploading Data to DB:
                - Title: ${title}
                - Type: ${stack}
                - Tech Stack: ${tech_stack}
                - Description: ${description}
                - Banner Image URL: ${bannerDownloadURL}
                - Demo File URL: ${demoDownloadURL}
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
