/* eslint-disable */
const { execSync } = require("child_process");
const path = require("path");
const fs = require("fs");
const packagesToIgnore = require("./ignore-package.js");
const colors = require("./colors.js");

const packageJsonPath = path.resolve(__dirname, "../package.json");
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));
const dependencies = packageJson.devDependencies || {};

// Build an array of dependencies to install while skipping ignored packages.
const dependenciesToInstall = Object.keys(dependencies)
  .filter((dep) => {
    if (packagesToIgnore.includes(dep)) {
      console.log(
        `${colors.yellow}Skipping installation for ${dep} (ignored)${colors.reset}`
      );
      return false;
    }
    return true;
  })
  .map((dep) => {
    const versionRanges = dependencies[dep].split(" || ");
    // Choose the second version range if available, otherwise the first.
    const chosenVersion = versionRanges[1]
      ? versionRanges[1]
      : versionRanges[0];
    return `${dep}@${chosenVersion}`;
  });

// Create a single install command including all the dependencies.
const installCommand = `npm install -D ${dependenciesToInstall.join(" ")}`;

try {
  console.log(
    `${
      colors.yellow
    }Attempting to install dependencies: ${dependenciesToInstall.join(", ")}${
      colors.reset
    }`
  );
  execSync(installCommand, { stdio: "inherit" });
  console.log(
    `${colors.green}Successfully installed all dependencies.${colors.reset}`
  );
} catch (error) {
  console.error(
    `${colors.red}Failed to install dependencies in a single command.${colors.reset}`
  );
  throw error;
}

console.log(
  `${colors.green}Shared dev-dependencies installation complete.${colors.reset}`
);
