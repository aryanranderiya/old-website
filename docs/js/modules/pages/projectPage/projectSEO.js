/**
 * @module projectSEO
 * @description Handle dynamic SEO meta tags and structured data for project pages
 */

/**
 * Update or create a meta tag
 * @param {string} property - Meta tag property or name
 * @param {string} content - Meta tag content
 * @param {boolean} isOG - Whether this is an Open Graph tag (property) or regular meta (name)
 */
function updateMetaTag(property, content, isOG = true) {
  if (!content) return; // Skip if no content

  const attr = isOG ? "property" : "name";
  let tag = document.querySelector(`meta[${attr}="${property}"]`);

  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(attr, property);
    document.head.appendChild(tag);
  }

  tag.setAttribute("content", content);
}

/**
 * Get absolute URL for images
 * @param {string} imageUrl - Relative or absolute image URL
 * @returns {string} Absolute HTTPS URL
 */
function getAbsoluteImageUrl(imageUrl) {
  if (!imageUrl) return "https://old.aryanranderiya.com/media/Website-Homepage.png";

  // If already absolute, return as is
  if (imageUrl.startsWith("http://") || imageUrl.startsWith("https://")) {
    return imageUrl;
  }

  // Remove leading slash if present
  const cleanPath = imageUrl.startsWith("/") ? imageUrl.slice(1) : imageUrl;

  return `https://aryanranderiya.com/${cleanPath}`;
}

/**
 * Update document title
 * @param {string} projectName - Project name
 */
function updateTitle(projectName) {
  document.title = `${projectName} | Aryan Randeriya`;
}

/**
 * Update canonical URL
 * @param {string} projectId - Project ID
 */
function updateCanonical(projectId) {
  let canonical = document.querySelector('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement("link");
    canonical.setAttribute("rel", "canonical");
    document.head.appendChild(canonical);
  }

  const canonicalUrl = `https://aryanranderiya.com/Project?id=${projectId}`;
  canonical.setAttribute("href", canonicalUrl);
}

/**
 * Update Open Graph meta tags
 * @param {Object} project - Project data
 * @param {string} projectId - Project ID
 */
function updateOpenGraphTags(project, projectId) {
  const pageUrl = `https://aryanranderiya.com/Project?id=${projectId}`;
  const imageUrl = getAbsoluteImageUrl(
    project.project_cover_image || project.project_image
  );
  const description =
    project.project_description ||
    project.project_summary ||
    "Software project by Aryan Randeriya";

  updateMetaTag("og:title", `${project.project_title} | Aryan Randeriya`);
  updateMetaTag("og:description", description);
  updateMetaTag("og:image", imageUrl);
  updateMetaTag("og:image:secure_url", imageUrl);
  updateMetaTag("og:image:width", "1200");
  updateMetaTag("og:image:height", "630");
  updateMetaTag(
    "og:image:alt",
    `${project.project_title} - Project Screenshot`
  );
  updateMetaTag("og:url", pageUrl);
  updateMetaTag("og:type", "website");
  updateMetaTag("og:site_name", "Aryan Randeriya | Portfolio");
  updateMetaTag("og:locale", "en_US");
}

/**
 * Update Twitter Card meta tags
 * @param {Object} project - Project data
 */
function updateTwitterCardTags(project) {
  const imageUrl = getAbsoluteImageUrl(
    project.project_cover_image || project.project_image
  );
  const description =
    project.project_description ||
    project.project_summary ||
    "Software project by Aryan Randeriya";

  updateMetaTag("twitter:card", "summary_large_image", false);
  updateMetaTag("twitter:site", "@aryanranderiya", false);
  updateMetaTag("twitter:creator", "@aryanranderiya", false);
  updateMetaTag("twitter:title", project.project_title, false);
  updateMetaTag("twitter:description", description, false);
  updateMetaTag("twitter:image", imageUrl, false);
  updateMetaTag(
    "twitter:image:alt",
    `${project.project_title} - Preview`,
    false
  );
}

/**
 * Update description meta tag
 * @param {Object} project - Project data
 */
function updateDescriptionTag(project) {
  const description =
    project.project_description ||
    project.project_summary ||
    "Software project by Aryan Randeriya";
  updateMetaTag("description", description, false);
}

/**
 * Add or update structured data schema
 * @param {Object} project - Project data
 * @param {string} projectId - Project ID
 */
function updateStructuredData(project, projectId) {
  // Remove existing project schema if any
  const existingSchema = document.querySelector(
    'script[data-schema="project"]'
  );
  if (existingSchema) {
    existingSchema.remove();
  }

  const pageUrl = `https://aryanranderiya.com/Project?id=${projectId}`;
  const imageUrl = getAbsoluteImageUrl(
    project.project_cover_image || project.project_image
  );

  // Determine schema type based on project category
  const category = project.project_type || "";
  const schemaType =
    category.includes("Website") ||
    category.includes("Mobile") ||
    category.includes("App")
      ? "SoftwareApplication"
      : "CreativeWork";

  const schema = {
    "@context": "https://schema.org",
    "@type": schemaType,
    name: project.project_title,
    description: project.project_description || project.project_summary,
    image: imageUrl,
    url: pageUrl,
    author: {
      "@type": "Person",
      name: "Aryan Randeriya",
      url: "https://aryanranderiya.com",
      sameAs: [
        "https://github.com/aryanranderiya",
        "https://www.linkedin.com/in/aryanranderiya",
      ],
    },
  };

  // Add software-specific fields
  if (schemaType === "SoftwareApplication") {
    schema.applicationCategory = category || "WebApplication";

    if (project.project_links?.["Live Link"]) {
      schema.url = project.project_links["Live Link"];
    }

    if (project.project_tech_stack) {
      schema.softwareRequirements = Array.isArray(project.project_tech_stack)
        ? project.project_tech_stack.join(", ")
        : project.project_tech_stack;
    }
  }

  // Add GitHub URL if available
  if (project.github_link) {
    schema.codeRepository = project.github_link;
  }

  // Add creation date if available
  if (project.project_creation) {
    schema.datePublished = project.project_creation;
  }

  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.setAttribute("data-schema", "project");
  script.textContent = JSON.stringify(schema, null, 2);
  document.head.appendChild(script);
}

/**
 * Add breadcrumb structured data
 * @param {Object} project - Project data
 * @param {string} projectId - Project ID
 */
function updateBreadcrumbSchema(project, projectId) {
  const existingBreadcrumb = document.querySelector(
    'script[data-schema="breadcrumb"]'
  );
  if (existingBreadcrumb) {
    existingBreadcrumb.remove();
  }

  const pageUrl = `https://aryanranderiya.com/Project?id=${projectId}`;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://aryanranderiya.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Software Projects",
        item: "https://aryanranderiya.com/SoftwareProjects",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: project.project_title,
        item: pageUrl,
      },
    ],
  };

  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.setAttribute("data-schema", "breadcrumb");
  script.textContent = JSON.stringify(breadcrumbSchema, null, 2);
  document.head.appendChild(script);
}

/**
 * Main function to update all SEO elements for a project
 * @param {Object} project - Project data
 * @param {string} projectId - Project ID
 */
export function updateProjectSEO(project, projectId) {
  if (!project || !projectId) {
    console.warn("Missing project data or ID for SEO update");
    return;
  }

  // Update page title
  updateTitle(project.project_title);

  // Update canonical URL
  updateCanonical(projectId);

  // Update meta tags
  updateDescriptionTag(project);
  updateOpenGraphTags(project, projectId);
  updateTwitterCardTags(project);

  // Update structured data
  updateStructuredData(project, projectId);
  updateBreadcrumbSchema(project, projectId);

  console.log("✅ SEO meta tags updated for:", project.project_title);
}
