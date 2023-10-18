import { ListForRepoData } from "../types.js";
import { promises } from "fs";

export interface CountIssueProps {
    absCSVOutPath: string;
}

export async function countIssues(issues: ListForRepoData, props: CountIssueProps): Promise<void> {

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

    return promises.writeFile(props.absCSVOutPath, output.join("\n"));
}
