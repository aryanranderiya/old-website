/**
 * @module utils/techIcons
 * @description Map technology names to the local Devicon SVGs shipped in media/icons/devicon
 */

const ICON_FILES = {
  html: "html5-html5-original-wordmark",
  html5: "html5-html5-original-wordmark",
  css: "css3-css3-original-wordmark",
  css3: "css3-css3-original-wordmark",
  express: "express-express-original-wordmark",
  flask: "flask-flask-original",
  tailwind: "tailwindcss-tailwindcss-original-wordmark",
  tailwindcss: "tailwindcss-tailwindcss-original-wordmark",
  vercel: "vercel-vercel-original",
  nextjs: "nextjs-nextjs-original",
  denojs: "denojs-denojs-original-wordmark",
  python: "python-python-original",
  java: "java-java-original",
  android: "android-android-plain",
  androidstudio: "androidstudio-androidstudio-original",
  mongodb: "mongodb-mongodb-original",
  react: "react-react-original",
  nodejs: "nodejs-nodejs-original-wordmark",
  node: "nodejs-nodejs-original-wordmark",
  firebase: "firebase-firebase-original",
  javascript: "javascript-javascript-plain",
  js: "javascript-javascript-plain",
  typescript: "typescript-typescript-original",
  mysql: "mysql-mysql-original-wordmark",
  sqlite: "sqlite-sqlite-original-wordmark",
  linux: "linux-linux-original",
  ubuntu: "ubuntu-ubuntu-original",
  vscode: "vscode-vscode-original",
  jetbrains: "jetbrains-jetbrains-original",
  amazonwebservices: "amazonwebservices-amazonwebservices-original-wordmark",
  aws: "amazonwebservices-amazonwebservices-original-wordmark",
  fastapi: "fastapi-fastapi-original",
  vitejs: "vitejs-vitejs-original",
  vite: "vitejs-vitejs-original",
  php: "php-php-original",
  redis: "redis-redis-original-wordmark",
  postman: "postman-postman-original",
  github: "github-github-original",
  supabase: "supabase-supabase-original",
  google: "google-google-original",
  astro: "astro-astro-original",
  cloudflareworkers: "cloudflareworkers-cloudflareworkers-original",
};

/**
 * Build a tech-stack chip with a locally hosted icon.
 * @param {string} name - Display name from the project data
 * @returns {string} HTML for the chip
 */
export function techStackChip(name) {
  const file = ICON_FILES[String(name).toLowerCase().trim()];
  const icon = file
    ? `<img class="tech_stack_icon" src="media/icons/devicon/${file}.svg" alt="" loading="lazy" width="18" height="18" />`
    : "";
  return `<div class="tech_stack_item">${icon}<text>${name}&nbsp;</text></div>`;
}
