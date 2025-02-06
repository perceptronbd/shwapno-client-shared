// FILE: install-peer-deps.js
const { execSync } = require("child_process");
const path = require("path");
const fs = require("fs");
const packagesToIgnore = [
  "@storybook/addon-essentials",
  "@storybook/addon-interactions",
  "@storybook/addon-onboarding",
  "@storybook/blocks",
  "@storybook/react",
  "@storybook/react-vite",
  "@storybook/test",
  "@chromatic-com/storybook",
];

const packageJsonPath = path.resolve(__dirname, "./package.json");
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));

const dependencies = packageJson.devDependencies || {};

const installDevDependency = (dep, versionRange) => {
  try {
    console.log(`Attempting to install ${dep}@${versionRange}`);
    execSync(`npm install -D ${dep}@${versionRange}`, {
      stdio: "inherit",
    });
    console.log(`Successfully installed ${dep}@${versionRange}`);
  } catch (error) {
    console.error(`Failed to install ${dep}@${versionRange}`);
    throw error;
  }
};

Object.keys(dependencies).forEach((dep) => {
  if (packagesToIgnore.includes(dep)) {
    console.log(`Skipping installation for ${dep} (ignored)`);
    return;
  }

  const versionRanges = dependencies[dep].split(" || ");
  const secondVersionRange = versionRanges[1];
  const firstVersionRange = versionRanges[0];

  try {
    if (secondVersionRange) {
      installDevDependency(dep, secondVersionRange);
    } else {
      installDevDependency(dep, firstVersionRange);
    }
  } catch (error) {
    if (secondVersionRange) {
      console.log(`Falling back to ${dep}@${firstVersionRange}`);
      installDevDependency(dep, firstVersionRange);
    }
  }
});

console.log("Shared dependencies installation complete.");
