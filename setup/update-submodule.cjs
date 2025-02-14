/* eslint-disable */
const { execSync } = require("child_process");
const readline = require("readline");
const fs = require("fs");
const path = require("path");
const colors = require("./colors.js");

const packageJsonPath = path.resolve(__dirname, "../package.json");
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Enter the tag version (e.g., 1.0.0): ", (tagVersion) => {
  if (!tagVersion) {
    tagVersion = packageJson.version;
    console.log(
      `${colors.yellow}No tag version provided. Using version from package.json: ${tagVersion}${colors.reset}`,
    );
  }
  try {
    // Initialize and update the submodule
    console.log(`Initializing and updating submodule...`);
    execSync("git submodule update --init", { stdio: "inherit" });

    // Navigate to the submodule directory and fetch tags
    console.log(`Fetching tags...`);
    execSync("cd src/shared-components && git fetch --tags", {
      stdio: "inherit",
    });

    // Checkout the specified tag
    console.log(
      `${colors.yellow}Checking out tag v${tagVersion}...${colors.reset}`,
    );
    execSync(`cd src/shared-components && git checkout tags/v${tagVersion}`, {
      stdio: "inherit",
    });

    // Navigate back to the main repository
    execSync("cd ../..", { stdio: "inherit" });

    // Add and commit the updated submodule reference
    console.log(`Committing changes...`);
    execSync("git add src/shared-components", { stdio: "inherit" });
    execSync(`git commit -m "Update submodule to tag ${tagVersion}"`, {
      stdio: "inherit",
    });

    console.log(
      `${colors.green}Submodule updated successfully.${colors.reset}`,
    );
  } catch (error) {
    console.error(
      `${colors.red}Failed to update submodule: ${error.message}${colors.reset}`,
    );
  } finally {
    rl.close();
  }
});
