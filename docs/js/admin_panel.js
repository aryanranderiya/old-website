// window.location.replace("https://aryanranderiya.com/404");

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";

import {
  getDatabase,
  ref,
  set,
  get,
  update,
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

  document
    .getElementById("submit-softwarelogos-form")
    .addEventListener("submit", function (e) {
      e.preventDefault();
      insertSoftwareLogoURL();
    });

  document
    .getElementById("submit-resume-form")
    .addEventListener("submit", function (e) {
      e.preventDefault();
      insertResume();
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

async function insertSoftwareLogoURL() {
  var SoftwareIconsRef = ref(database, "SoftwareIcons");

  const logo_url = document.getElementById("software_logo").value || null;
  const databaseRecordCount = (await countDatabaseRecords("SoftwareIcons")) + 0;

  var data = {};
  data[databaseRecordCount] = logo_url;

  update(SoftwareIconsRef, data)
    .then(() => console.log("Data Successfully inserted!"))
    .catch((e) => console.log(e));

  document.getElementById("submit-softwarelogos-form").reset();
}

async function insertResume() {
  const SoftwareIconsRef = ref(database, "Resume");

  const fileselect = document.getElementById("file-select-resume");
  const file = fileselect.files[0];

  const Storageref = storageRef(storage, `Resume/${file.name}`);

  try {
    await uploadBytes(Storageref, file);
    const url = await getDownloadURL(Storageref);
    await set(SoftwareIconsRef, url);
    console.log("Data Successfully inserted!");
  } catch (error) {
    console.log(error);
  }

  document.getElementById("submit-resume-form").reset();
}

async function insertFetchData() {
  const databaseRecordCount = (await countDatabaseRecords("Projects")) + 1;
  var title = document.getElementById("project_title").value;
  const comments = document.getElementById("personal_comments").value || null;
  const description = document.getElementById("project_description").value;
  const short_description = document.getElementById("project_short_desc").value;
  const project_creation = document.getElementById("project_creation").value;
  const fileSelectorBanner = document.getElementById("file-selector-image");
  const fileSelectorDemo = document.getElementById("file-selector-demo");

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
    if (other_types) {
      other_types = other_types.split(",");
      for (var stack of other_types) tech_stack.push(stack.trim());
    }
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

  const documentation_text =
    document.getElementById("documentation_text").value;

  let readmeFile = null;

  if (documentation_text.length > 0) {
    const blob = new Blob([documentation_text], { type: "text/plain" });
    readmeFile = new File([blob], `${project_id}_documentation.md`);
  }

  // var projectsRef = ref(database, "Projects/" + project_id);
  var projectsRef = ref(
    database,
    "Projects/6_project_Personal_Portfolio_1712175736205"
  );
  try {
    const bannerDownloadURL = await uploadMedia(fileBanner, title, "Banner");

    const demoDownloadURL = await uploadMedia(
      fileDemo,
      "Personal Portfolio",
      "Demo"
    );

    const documentation_URL = await uploadMedia(
      readmeFile,
      title,
      "Documentation"
    );

    const multipleURLs = await uploadMultipleImages(title);

    const projectData = {
      project_title: title,
      project_type: type,
      project_tech_stack: tech_stack,
      project_description: description,
      project_short_description: short_description,
      project_creation: project_creation,
      project_personal_comments: comments,
      banner_image_URL: bannerDownloadURL,
      demo_file_URL: demoDownloadURL,
      github_link: githubLink,
      demo_type: demo_type,
      project_documentation_URL: documentation_URL,
      project_links: links_obj,
      project_images: multipleURLs,
    };

    console.log("Project Data:", projectData);

    await set(projectsRef, projectData);

    console.log("Data Successfully inserted!");

    document.getElementById("submit-project-form").reset();
  } catch (error) {
    console.log(error);
  }
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

async function uploadMultipleImages(title) {
  const project_images = document.getElementById("project_images");
  const multiplefiles = await project_images.files;

  let urls = [];

  if (multiplefiles) {
    for (let i = 0; i < multiplefiles.length; i++) {
      let file = multiplefiles.item(i);
      console.log("Project Media File:", file.name);
      let url = await performUpload(file, title);
      if (url) urls.push(url);
    }
    return urls;
  } else {
    console.log("No Project Media. Returning null");
    return null;
  }
}

async function performUpload(file, title) {
  console.log(`Uploading ${file} to DB`);

  const ref = storageRef(
    storage,
    `ProjectMedia/${title.replace(" ", "_")}/${file.name}`
  );
  try {
    await uploadBytes(ref, file);
    const url = await getDownloadURL(ref);
    console.log(`Successfully Uploaded File to DB`);
    return url;
  } catch (error) {
    console.error(`Error uploading ${mediaType} media:`, error);
    throw error;
  }
}

async function countDatabaseRecords(reference) {
  const database = getDatabase();
  const projectsRef = ref(database, reference);

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
