import { isClosed } from "../utils.js";
import { ArrayElement, ListForRepoData } from "../types.js";
import { promises } from "fs";

export interface ResolutionTimesProps {
    filter?: (v: ArrayElement<ListForRepoData>) => boolean;
    absCSVOutPath: string;
}

export async function resolutionTimes(issues: ListForRepoData, props: ResolutionTimesProps): Promise<void> {

    const { filter, absCSVOutPath } = {
        filter: () => true,
        ...props,
    }

    const closedIssues = issues.filter((issue) => isClosed(issue));

    const filteredIssues = closedIssues.filter(filter);

    const allValues: number[] = [];

    const output: any[] = [];

    console.log(`Averaging from ${filteredIssues.length} issues`);

    for (let i = 0; i < filteredIssues.length; i++) {

        const issue = filteredIssues[i];

        const created = new Date(issue.created_at);
        const closed = new Date(issue.closed_at!);

        let resolutionDuration = closed.getTime() - created.getTime();

        allValues.push(resolutionDuration);

        // const [days, hours, mins, seconds] = getPeriods(resolutionDuration);

        // console.log(`(${issue.id}) Created: ${created.toDateString()} Closed: ${closed.toDateString()} => ${days} days : ${hours} hours : ${mins} minutes : ${seconds} seconds`);

        output.push([issue.id, `"${created.toISOString()}"`, `"${closed.toISOString()}"`, resolutionDuration].join(","));
    }

    const avg = allValues.reduce((r, c) => r + c, 0) / allValues.length;

    const [days, hours, mins, seconds] = getPeriods(avg);

    console.log(`Average => ${days} days : ${hours} hours : ${mins} minutes : ${seconds} seconds`);

    return promises.writeFile(absCSVOutPath, output.join("\n"));
}

function getPeriods(value: number): [number, number, number, number] {

    var days = Math.floor(value / (1000 * 60 * 60 * 24));
    value -= days * (1000 * 60 * 60 * 24);

    var hours = Math.floor(value / (1000 * 60 * 60));
    value -= hours * (1000 * 60 * 60);

    var mins = Math.floor(value / (1000 * 60));
    value -= mins * (1000 * 60);

    var seconds = Math.floor(value / (1000));
    value -= seconds * (1000);

    return [days, hours, mins, seconds];
}
