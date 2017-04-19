const spawn = require("child_process").spawn;
const _execSync = require("child_process").execSync;
require("dotenv").config();

function env(key) {
  const value = process.env[key];
  if (!value) throw new Error(`Missing required environment variable ${key}`);
  return value;
}

function execSync(command) {
  _execSync(command, { stdio: "inherit" });
}

execSync("touch dist/.static && cp config/app-nginx.conf.sigil dist/");
execSync(
  `tar -cz dist/ $* | ssh dokku@${env("DOKKU_HOST")} tar:in ${env("DOKKU_APP")}`
);
