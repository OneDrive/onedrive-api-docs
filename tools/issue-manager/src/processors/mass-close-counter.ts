import { isClosed } from "../utils.js";
import { ListForRepoData } from "../types.js";

export async function massCloseCounter(issues: ListForRepoData): Promise<void> {

    let count = 0;

    for (let i = 0; i < issues.length; i++) {

        const issue = issues[i];

        if (!isClosed(issue)) {
            continue;
        }
        
        const closed = new Date(issue.closed_at!);

        if (closed.getFullYear() === 2023 && closed.getDate() === 17 && closed.getMonth() === 1) {
            count++;
        }
    }

    console.log(`Mass closed: ${count}`);
}