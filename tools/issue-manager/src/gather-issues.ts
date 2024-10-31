import { Octokit } from "octokit";
import { ListForRepoData, LoggingFunc } from "./types.js";

export interface GatherIssuesProps {
    owner: string;
    repo: string;
    repo_url: string;
    filterPRs?: boolean;
    log?: LoggingFunc;
}

export async function gatherIssues(props: GatherIssuesProps): Promise<ListForRepoData> {

    // Create a personal access token at https://github.com/settings/tokens/new?scopes=repo
    // YOUR PAT MUST BE ALLOWED FOR OneDrive ORGANIZATION
    const octokit = new Octokit({ auth: process.env.GITHUB_PAT });

    // provide some defaults
    const { owner, repo, repo_url, filterPRs, log } = {
        filterPRs: true,
        log: () => void(0),
        ...props,
    };

    log(`Loading issues from: ${repo_url}`);

    const issues: ListForRepoData = [];

    let page = 1;

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

        const filteredIssues = filterPRs ? newIssues.data.filter(i => i.pull_request === undefined) : newIssues.data;

        issues.push(...filteredIssues);

        if (page > 20) {
            // here for safety
            throw Error("Just looping.");
        }

        page++;
    }

    log(`Total Issues Read from ${repo_url}: ${issues.length}`);

    return issues;
}
