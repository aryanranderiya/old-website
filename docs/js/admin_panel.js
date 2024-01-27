window.location.replace("https://aryanranderiya.com/404");

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";

import {
  getDatabase,
  ref,
  set,
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

      var title = document.getElementById("project_title").value;
      const description = document.getElementById("project_description").value;
      const githubLink = document.getElementById("githubLink").value;

      //  Radio Button
      const type = document.querySelector(
        'input[name="project_type"]:checked'
      ).value;

      // Checkbox
      var markedCheckbox = document.querySelectorAll(
        'input[type="checkbox"]:checked'
      );

      var tech_stack = [];

      for (var checkbox of markedCheckbox) {
        tech_stack.push(checkbox.value);
      }

      // Image
      const fileSelector = document.getElementById("file-selector");
      const file = fileSelector.files[0];

      const project_id =
        "project_" + title.replace(" ", "_") + "_" + Date.now();
      var projectsRef = ref(database, "Projects/" + project_id);

      if (file) {
        const spaceRef = storageRef(
          storage,
          "ProjectImages/" + title.replace(" ", "_") + "-" + file.name
        );

        uploadBytes(spaceRef, file)
          .then(() => {
            return getDownloadURL(spaceRef);
          })
          .then((url) => {
            console.log("Image uploaded successfully!");
            var imageURL = url.toString();

            set(projectsRef, {
              project_title: title,
              project_type: type,
              project_tech_stack: tech_stack.join(","),
              project_description: description,
              banner_image_URL: imageURL,
              github_link: githubLink,
            })
              .then(() => {
                console.log("Data Successfully inserted!");
              })
              .catch((error) => {
                console.error(error);
              });
          })
          .catch((error) => {
            console.error("Error uploading image:", error.message);
          });
      } else {
        console.warn("No file selected.");
      }

      document.getElementById("submit-project-form").reset();
    });
});
