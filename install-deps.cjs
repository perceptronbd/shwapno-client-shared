// FILE: install-peer-deps.js
const { execSync } = require("child_process");
const path = require("path");
const fs = require("fs");

const packageJsonPath = path.resolve(__dirname, "./package.json");
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));

const dependencies = packageJson.dependencies || {};

const installDependency = (dep, versionRange) => {
  try {
    console.log(`Attempting to install ${dep}@${versionRange}`);
    execSync(`npm install ${dep}@${versionRange}`, {
      stdio: "inherit",
    });
    console.log(`Successfully installed ${dep}@${versionRange}`);
  } catch (error) {
    console.error(`Failed to install ${dep}@${versionRange}`);
    throw error;
  }
};

Object.keys(dependencies).forEach((dep) => {
  const versionRanges = dependencies[dep].split(" || ");
  const secondVersionRange = versionRanges[1];
  const firstVersionRange = versionRanges[0];

  try {
    if (secondVersionRange) {
      installDependency(dep, secondVersionRange);
    } else {
      installDependency(dep, firstVersionRange);
    }
  } catch (error) {
    if (secondVersionRange) {
      console.log(`Falling back to ${dep}@${firstVersionRange}`);
      installDependency(dep, firstVersionRange);
    }
  }
});

console.log("Shared dependencies installation complete.");
