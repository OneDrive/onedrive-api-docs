import { GetResponseDataTypeFromEndpointMethod } from "@octokit/types";
import * as dotenv from "dotenv";
// import { lockIssues } from "./lock-issues.js";

import { writeFileSync } from "fs";

import { Octokit } from "octokit";

dotenv.config();

// Create a personal access token at https://github.com/settings/tokens/new?scopes=repo
// YOUR PAT MUST BE ALLOWED FOR OneDrive ORGANIZATION
const octokit = new Octokit({ auth: process.env.GITHUB_PAT });

// provide some defaults
const { owner, repo, repo_url } = {
  owner: "OneDrive",
  repo: "onedrive-api-docs",
  repo_url: "https://github.com/OneDrive/onedrive-api-docs"
};

console.log(repo_url);

// get all the issues in the repository, starting in pages of 100 moving from the oldest forwards
// const issues = await octokit.rest.issues.listForRepo({
//   owner,
//   repo,
//   state: "open",
//   filter: "repos",
//   per_page: 100,
//   direction: "asc",
// });

// await lockIssues(octokit, owner, repo, repo_url, issues);

const issues: ListForRepoData = [];

let page = 1;

type ListForRepoData = GetResponseDataTypeFromEndpointMethod<typeof octokit.rest.issues.listForRepo>;

while (true) {

  const newIssues = await octokit.rest.issues.listForRepo({
    owner,
    repo,
    state: "all",
    filter: "repos",
    per_page: 200,
    page,
  });

  if (newIssues === undefined || newIssues.data.length < 1) {
    break;
  }

  const filteredIssues = newIssues.data.filter(i => i.pull_request === undefined);

  issues.push(...filteredIssues);

  if (page > 20) {
    // here for safety
    throw Error("Just looping.");
  }

  page++;
}

console.log(`Total Issues: ${issues.length}`);

const issuesMatrix = new Map<number, number[]>();

for (let i = 0; i < issues.length; i++) {

  const issue = issues[i];

  const d = new Date(issue.created_at);
  const year = d.getFullYear();
  const month = d.getMonth();

  if (!issuesMatrix.has(year)) {
    issuesMatrix.set(year, Array(12).fill(0));
  }

  issuesMatrix.get(year)![month]++;
}

const output: string[] = [];

issuesMatrix.forEach((value, key) => {

  output.push(`${key},${value.join(",")}`);

});

writeFileSync("test.csv", output.join("\n"));
