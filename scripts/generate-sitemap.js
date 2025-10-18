#!/usr/bin/env node

/**
 * Automated Sitemap Generator
 * Injects dynamic software project URLs into existing sitemap.xml
 * Preserves all design project images and static content
 * Run before: firebase deploy
 */

const fs = require("fs");
const path = require("path");

// Configuration
const SITE_URL = "https://aryanranderiya.com";
const DB_PATH = path.join(__dirname, "../docs/db/db.json");
const SITEMAP_PATH = path.join(__dirname, "../docs/sitemap.xml");

// Markers to identify where to inject project URLs
const START_MARKER =
  "  <!-- SOFTWARE PROJECTS START - Auto-generated, do not edit below this line -->";
const END_MARKER = "  <!-- SOFTWARE PROJECTS END -->";

// Get current date in YYYY-MM-DD format
function getCurrentDate() {
  const now = new Date();
  return now.toISOString().split("T")[0];
}

// Escape XML special characters
function escapeXml(unsafe) {
  if (!unsafe) return "";
  return String(unsafe).replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case "&":
        return "&amp;";
      case "'":
        return "&apos;";
      case '"':
        return "&quot;";
    }
  });
}

/**
 * Load projects from db.json
 */
function loadProjects() {
  try {
    const dbContent = fs.readFileSync(DB_PATH, "utf8");
    const db = JSON.parse(dbContent);
    return db.Projects || {};
  } catch (error) {
    console.error("❌ Error loading db.json:", error.message);
    return {};
  }
}

/**
 * Generate project URL entry with proper indentation
 */
function generateProjectUrl(projectId, projectData, currentDate) {
  const url = `/Project?id=${projectId}`;
  const title = escapeXml(projectData.project_title || projectId);
  const description = escapeXml(
    projectData.project_description ||
      projectData.project_short_description ||
      ""
  );

  // Determine priority based on featured status
  const priority = projectData.featured ? "0.8" : "0.65";

  let urlEntry = `  <!-- ${title} -->\n`;
  urlEntry += `  <url>\n`;
  urlEntry += `    <loc>${SITE_URL}${url}</loc>\n`;
  urlEntry += `    <lastmod>${currentDate}</lastmod>\n`;
  urlEntry += `    <changefreq>monthly</changefreq>\n`;
  urlEntry += `    <priority>${priority}</priority>\n`;

  // Add project image if available
  if (projectData.project_cover_image || projectData.banner_image_URL) {
    const imageUrl =
      projectData.project_cover_image || projectData.banner_image_URL;
    let imageLoc;

    // Check if it's a full URL or relative path
    if (imageUrl.startsWith("http://") || imageUrl.startsWith("https://")) {
      imageLoc = imageUrl;
    } else {
      imageLoc = `${SITE_URL}${
        imageUrl.startsWith("/") ? imageUrl : "/" + imageUrl
      }`;
    }

    urlEntry += `    <image:image>\n`;
    urlEntry += `      <image:loc>${imageLoc}</image:loc>\n`;
    urlEntry += `      <image:title>${title} - Project Screenshot</image:title>\n`;
    if (description) {
      const caption =
        description.length > 150
          ? description.substring(0, 147) + "..."
          : description;
      urlEntry += `      <image:caption>${caption}</image:caption>\n`;
    }
    urlEntry += `    </image:image>\n`;
  }

  urlEntry += `  </url>\n\n`;
  return urlEntry;
}

/**
 * Update sitemap with software projects
 */
function updateSitemap() {
  console.log("🔄 Updating sitemap with software projects...\n");

  // Load projects
  const projects = loadProjects();
  const projectCount = Object.keys(projects).length;
  console.log(`📦 Found ${projectCount} projects in database`);

  if (projectCount === 0) {
    console.log("⚠️  No projects found, skipping sitemap update");
    return;
  }

  // Read existing sitemap
  let sitemapContent;
  try {
    sitemapContent = fs.readFileSync(SITEMAP_PATH, "utf8");
    console.log("✅ Loaded existing sitemap.xml");
  } catch (error) {
    console.error("❌ Error reading sitemap.xml:", error.message);
    process.exit(1);
  }

  // Generate project URLs
  const currentDate = getCurrentDate();
  let projectUrls = START_MARKER + "\n\n";

  // Sort projects: featured first, then alphabetically
  const sortedProjectIds = Object.keys(projects).sort((a, b) => {
    const aFeatured = projects[a].featured ? 1 : 0;
    const bFeatured = projects[b].featured ? 1 : 0;

    if (aFeatured !== bFeatured) {
      return bFeatured - aFeatured; // Featured first
    }

    const aTitle = (projects[a].project_title || a).toLowerCase();
    const bTitle = (projects[b].project_title || b).toLowerCase();
    return aTitle.localeCompare(bTitle);
  });

  let addedProjects = 0;
  sortedProjectIds.forEach((projectId) => {
    const projectData = projects[projectId];
    projectUrls += generateProjectUrl(projectId, projectData, currentDate);
    addedProjects++;
  });

  projectUrls += END_MARKER + "\n\n";

  console.log(`✅ Generated ${addedProjects} project URLs`);

  // Check if markers exist
  const hasMarkers =
    sitemapContent.includes(START_MARKER) &&
    sitemapContent.includes(END_MARKER);

  let newSitemapContent;

  if (hasMarkers) {
    // Replace content between markers
    const regex = new RegExp(
      `${START_MARKER.replace(
        /[.*+?^${}()|[\]\\]/g,
        "\\$&"
      )}[\\s\\S]*?${END_MARKER.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`,
      "g"
    );

    newSitemapContent = sitemapContent.replace(regex, projectUrls.trim());
    console.log("🔄 Updated existing project section");
  } else {
    // Insert before closing </urlset> tag
    const closingTag = "</urlset>";
    const closingTagIndex = sitemapContent.lastIndexOf(closingTag);

    if (closingTagIndex === -1) {
      console.error("❌ Could not find </urlset> tag in sitemap");
      process.exit(1);
    }

    newSitemapContent =
      sitemapContent.substring(0, closingTagIndex) +
      projectUrls +
      sitemapContent.substring(closingTagIndex);

    console.log("➕ Added new project section");
  }

  // Write updated sitemap
  try {
    fs.writeFileSync(SITEMAP_PATH, newSitemapContent, "utf8");
    console.log(`\n✅ Sitemap updated successfully!`);
    console.log(`📍 Location: ${SITEMAP_PATH}`);
    console.log(`📊 Software projects added: ${addedProjects}`);
    console.log(`💾 All design images and static pages preserved`);
  } catch (error) {
    console.error("❌ Error writing sitemap:", error.message);
    process.exit(1);
  }
}

// Run if executed directly
if (require.main === module) {
  updateSitemap();
}

module.exports = { updateSitemap };
