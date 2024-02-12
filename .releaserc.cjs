const path = require("path");
const fs = require("fs");

const tplFile = path.resolve(
  __dirname,
  "./config/release/templates/release-notes-template.hbs"
);
const commitFile = path.resolve(
  __dirname,
  "./config/release/templates/commit-template.hbs"
);
const template = fs.readFileSync(tplFile, "utf-8");
const commitTemplate = fs.readFileSync(commitFile, "utf-8");

const groupedCommits = require("./config/release/helpers/groupedCommits.js");

// Use of Gitmojis to create rules
const gitmojis = require("gitmojis").gitmojis;

const MAJOR = "major";
const MINOR = "minor";
const PATCH = "patch";
// Store rules based on Gitmoji semver key in a object for later
const RULES = {
  major: gitmojis
    .filter(({ semver }) => semver === MAJOR)
    .map(({ emoji }) => emoji),
  minor: gitmojis
    .filter(({ semver }) => semver === MINOR)
    .map(({ emoji }) => emoji),
  patch: gitmojis
    .filter(({ semver }) => semver === PATCH)
    .map(({ emoji }) => emoji),
};

module.exports = {
  branches: ["main"],
  plugins: [
    [
      "semantic-release-gitmoji",
      {
        releaseRules: RULES,
        releaseNotes: {
          template,
          partials: { commitTemplate },
          helpers: {
            groupedCommits,
          },
          issueResolution: {
            template: "{baseUrl}/{owner}/{repo}/issues/{ref}",
            baseUrl: "https://github.com",
            source: "github.com",
            removeFromCommit: false,
            regex: /#\d+/g,
          },
        },
      },
    ],
    "@semantic-release/github",
  ],
};
