// FILE: install-peer-deps.js
const { execSync } = require("child_process");
const path = require("path");
const fs = require("fs");

const packageJsonPath = path.resolve(__dirname, "../package.json");
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));

const dependencies = packageJson.dependencies || {};

const dependenciesToInstall = Object.keys(dependencies).map((dep) => {
  const versionRanges = dependencies[dep].split(" || ");
  const chosenVersion = versionRanges[1] ? versionRanges[1] : versionRanges[0];
  return `${dep}@${chosenVersion}`;
});

// Create the install command that includes all dependencies.
const installCommand = `npm install ${dependenciesToInstall.join(" ")}`;

try {
  console.log(
    `Attempting to install dependencies: ${dependenciesToInstall.join(", ")}`
  );
  execSync(installCommand, { stdio: "inherit" });
  console.log("Successfully installed all dependencies.");
} catch (error) {
  console.error("Failed to install dependencies in a single command.");
  // Optionally, you could implement a fallback by installing dependencies individually here.
  throw error;
}

console.log("Shared dependencies installation complete.");
