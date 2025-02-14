/*eslint-disable*/
const { execSync } = require("child_process");
const path = require("path");
const fs = require("fs");
const colors = require("./colors.js");

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
    `${
      colors.yellow
    }Attempting to install dependencies: ${dependenciesToInstall.join(", ")}${
      colors.reset
    }`,
  );
  execSync(installCommand, { stdio: "inherit" });
  console.log(
    `${colors.green}Successfully installed all dependencies.${colors.reset}`,
  );
} catch (error) {
  console.error(
    `${colors.red}Failed to install dependencies in a single command.${colors.reset}`,
  );
  // Optionally, you could implement a fallback by installing dependencies individually here.
  throw error;
}

console.log(
  `${colors.green}Shared dependencies installation complete.${colors.reset}`,
);
