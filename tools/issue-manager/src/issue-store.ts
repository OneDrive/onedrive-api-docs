import { ListForRepoData, LoggingFunc } from "./types.js";
import { promises } from "fs";
import { join } from "path";

export interface LoadIssuesProps {
    absoluteFolderPath: string;
    gather?: boolean;
    clean?: boolean;
    issueProvider: () => Promise<ListForRepoData>;
    log?: LoggingFunc;
}

export async function loadIssues(props: LoadIssuesProps): Promise<ListForRepoData> {

    // provide some defaults
    const { absoluteFolderPath, gather, clean, log, issueProvider } = {
        clean: false,
        gather: true,
        log: () => void (0),
        ...props,
    };

    try {

        log(`Checking for path ${absoluteFolderPath}`);

        // if we have the folder than we assume we are up to date
        // we don't do any smart checking or backfill currently
        await promises.access(absoluteFolderPath);

        log(`Path ${absoluteFolderPath} found!`);

        if (clean) {

            log(`Clean flag is set, deleting all files in ${absoluteFolderPath}...`);

            // delete all files in folder
            for (const file of await promises.readdir(absoluteFolderPath)) {
                await promises.unlink(join(absoluteFolderPath, file));
            }

            log(`Deleted all files in ${absoluteFolderPath}`);
        }

    } catch (error) {

        log(`Path ${absoluteFolderPath} missing!`);

        if (!gather) {

            log(`Gather is ${gather}, throwing error`);
            throw error;
        }

        // create the folder if needed
        log(`Creating folder ${absoluteFolderPath}...`);
        await promises.mkdir(absoluteFolderPath);
        log(`Created folder ${absoluteFolderPath}`);
    }

    let issues: ListForRepoData;

    if (gather) {

        issues = await issueProvider();

        const fileWritePromises: Promise<void>[] = [];

        issues.forEach((value) => {

            fileWritePromises.push(promises.writeFile(join(absoluteFolderPath, `issue_${value.id}.json`), JSON.stringify(value), {
                encoding: "utf-8",
            }));
        });

        await Promise.all(fileWritePromises);

        // return all the issues we just gathered
        return issues;
    }

    // if we fall through to here we need to read all the files from the folder
    const fileReadPromises: Promise<any>[] = [];

    for (const file of await promises.readdir(absoluteFolderPath)) {
        fileReadPromises.push(promises.readFile(join(absoluteFolderPath, file)));
    }

    const contents = await Promise.all(fileReadPromises);

    return contents.map((s) => JSON.parse(s));
}
