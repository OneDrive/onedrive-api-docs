import { ArrayElement, ListForRepoData } from "./types.js";

export function isClosed(issue: ArrayElement<ListForRepoData>): boolean {
    return issue.closed_at !== null && issue.closed_at !== undefined && issue.state === "closed";
}