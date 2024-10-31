import { Endpoints } from "@octokit/types";

/**
 * Array containing issues data
 */
export type ListForRepoData = Endpoints["GET /repos/{owner}/{repo}/issues"]["response"]["data"];

export type LoggingFunc = (msg: string) => void;

export type ArrayElement<ArrayType extends readonly unknown[]> = ArrayType extends readonly (infer ElementType)[] ? ElementType : never;
