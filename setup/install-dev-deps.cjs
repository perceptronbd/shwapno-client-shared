// FILE: install-peer-deps.js
const { execSync } = require("child_process");
const path = require("path");
const fs = require("fs");
const packagesToIgnore = require("./ignore-package");

const packageJsonPath = path.resolve(__dirname, "../package.json");
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));
const dependencies = packageJson.devDependencies || {};

// Build an array of dependencies to install while skipping ignored packages.
const dependenciesToInstall = Object.keys(dependencies)
  .filter((dep) => {
    if (packagesToIgnore.default.includes(dep)) {
      console.log(`Skipping installation for ${dep} (ignored)`);
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
    `Attempting to install dependencies: ${dependenciesToInstall.join(", ")}`
  );
  execSync(installCommand, { stdio: "inherit" });
  console.log("Successfully installed all dependencies.");
} catch (error) {
  console.error("Failed to install dependencies in a single command.");
  throw error;
}

console.log("Shared dependencies installation complete.");
