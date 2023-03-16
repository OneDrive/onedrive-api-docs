import { dateAdd, combine } from "@pnp/core";
import { Octokit } from "octokit";

export async function lockIssues(octokit: Octokit, owner: string, repo: string, repo_url: string, issues: { data: any[] }): Promise<void> {

    const oneYearAgo = <Date>dateAdd(new Date(), "year", -1);

    console.log(`Cutoff Date: ${oneYearAgo.toLocaleDateString()}`);

    try {

        for (let i = 0; i < issues.data.length; i++) {

            const issue = issues.data[i];

            const issueCreatedDate = new Date(issue.created_at);
            const issueUrl = combine(repo_url, "/issues/", issue.number.toString());

            console.log(`Start: [${issueUrl}] ${issue.title}  ${issueCreatedDate.toLocaleDateString()}`);

            if (issueCreatedDate < oneYearAgo) {

                console.log("Beginning Processing");

                // apply the automation label
                console.log("Adding label");
                await octokit.rest.issues.addLabels({
                    owner,
                    repo,
                    issue_number: issue.number,
                    labels: ["automation:Closed"]
                });
                console.log("Added label");

                // update the issue with the automation comment
                console.log("Creating comment");
                await octokit.rest.issues.createComment({
                    owner,
                    repo,
                    issue_number: issue.number,
                    body: "As part of a repository clean up effort we are closing older issues. If this issue remains, please: open a new issue, reference this issue, and provide any additional details that may help in resolution. Thank you for your understanding as we work to improve our responsiveness.",
                });
                console.log("Created comment");

                // update the issue as closed
                console.log("Closing issue");
                await octokit.rest.issues.update({
                    owner,
                    repo,
                    issue_number: issue.number,
                    state: "closed",
                });
                console.log("Closed issue");

                // lock the issue
                console.log("Locking issue");
                await octokit.rest.issues.lock({
                    owner,
                    repo,
                    issue_number: issue.number,
                    lock_reason: "resolved"
                });
                console.log("Locked issue");

            } else {

                console.log("Issue is too new");
            }

            console.log(`End: [${issueUrl}]`);
        }

    } catch (e) {

        // we just end on error
        console.error(e);
    }
}