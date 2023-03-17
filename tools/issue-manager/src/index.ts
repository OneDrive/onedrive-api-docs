import * as dotenv from "dotenv";
import { gatherIssues } from "./gather-issues.js";
import { loadIssues  } from "./issue-store.js";
import { resolve } from "path";

dotenv.config();

// provide some defaults
const props = {
  owner: "OneDrive",
  repo: "onedrive-api-docs",
  repo_url: "https://github.com/OneDrive/onedrive-api-docs"
};

const logger = (msg: string) => {
  console.log(msg);
}

// this function will gather all the issues, we bind the props to it so it can be called later with no props
const issueProvider = gatherIssues.bind(null, {
  log: logger,
  ...props
})

// load issues either from the file system or the service
const issues = await loadIssues({
  absoluteFolderPath: resolve("./issue-store"),
  issueProvider,
  gather: false,
  log: logger,
});

console.log(`Total Issues for processing: ${issues.length}`);

// const { lockIssues } = await import("./processors/lock-issues.js");
// await lockIssues(issues, {
//   octokit: new Octokit({ auth: process.env.GITHUB_PAT }),
//   ...props
// });

// now that we have the issues we can run processors on them
// const { countIssues } = await import("./processors/count-issues.js");
// await countIssues(issues, {
//   absCSVOutPath: resolve("./issue-counts.csv"),
// });

const { resolutionTimes } = await import("./processors/resolution-time.js");
// const filterDate = new Date("2023-02-27");
await resolutionTimes(issues, {
  absCSVOutPath: resolve("./resolution-times.csv"),
  // filter: (issue) => (new Date(issue.closed_at!) < filterDate),
});

// const { massCloseCounter } = await import("./processors/mass-close-counter.js");
// // const filterDate = new Date("2023-02-27");
// await massCloseCounter(issues);
