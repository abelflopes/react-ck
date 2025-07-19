import { execSync } from "node:child_process";
import { currPackagePath, logger, rootPackageLock } from "./common";

try {
  logger.info("Adding to git...", currPackagePath);

  execSync(`git add ${rootPackageLock}`, { stdio: "inherit" });
  execSync(`git add ${currPackagePath}`, { stdio: "inherit" });

  logger.info("Sending commit to git...", currPackagePath);

  execSync(`git commit -m "feat(react-ck): global library package"`, { stdio: "inherit" });

  logger.info("Done");
} catch (error) {
  logger.error(error instanceof Error ? error.message : error);
}
