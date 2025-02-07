// FILE: update-submodule.js
const { execSync } = require("child_process");
const readline = require("readline");
const fs = require("fs");
const path = require("path");

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
      `No tag version provided. Using version from package.json: ${tagVersion}`
    );
  }
  try {
    // Initialize and update the submodule
    execSync("git submodule update --init", { stdio: "inherit" });

    // Navigate to the submodule directory and fetch tags
    execSync("cd src/shared-components && git fetch --tags", {
      stdio: "inherit",
    });

    // Checkout the specified tag
    execSync(`cd src/shared-components && git checkout tags/v${tagVersion}`, {
      stdio: "inherit",
    });

    // Navigate back to the main repository
    execSync("cd ../..", { stdio: "inherit" });

    // Add and commit the updated submodule reference
    execSync("git add src/shared-components", { stdio: "inherit" });
    execSync(`git commit -m "Update submodule to tag ${tagVersion}"`, {
      stdio: "inherit",
    });

    console.log("Submodule updated successfully.");
  } catch (error) {
    console.error("Failed to update submodule:", error.message);
  } finally {
    rl.close();
  }
});
