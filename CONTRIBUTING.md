# Contribute to OneDrive API documentation

Thank you for your interest in OneDrive API!

* [Ways to contribute](#ways-to-contribute)
* [Process for submissions](#process-for-submissions)
* [How to use Markdown to format your topic](#how-to-use-markdown-to-format-your-topic)

## Ways to contribute

You can contribute to [OneDrive API documentation](https://dev.onedrive.com) in these ways:

* Minor corrections
* Major re-writes or significant content changes

## Process for submissions

For all edits, please submit each change as a separate pull request.

To get started:

1. Fork the repo or update an existing fork.
2. Create a new branch for each correction (logically grouped, not literally every file you change).
3. Submit a pull request to the **master** branch with your change.

The OneDrive team will then review your contribution and decide how to move forward.

## How to use Markdown to format your topic

### Article template

* See [API Method Template](templates/api-template.md) for a template on documenting an API call.
* See [Resource Template](templates/resource-template.md) for a template on documenting a resource.

### Standard Markdown

All of the articles in this repository use GitHub Flavored Markdown.  
For more information on learning the GitHub Flavored Markdown format, see [Mastering Markdown](https://guides.github.com/features/mastering-markdown/).

If you're looking for a good editor, try [Atom](https://atom.io) or [Visual Studio Code](https://code.visualstudio.com/).

## Markdown Scanner

OneDrive API docs use [Markdown Scanner](https://github.com/onedrive/markdown-scanner) to validate changes to the documentation.
Markdown scanner verifies that the documentation is accurate, free of broken links, and that examples match the server implementation.
Each pull request and commit to our repo will be automatically tested and the results are reported back on the pull request page.
Changes to the documentation must pass all of the testing before they can be accepted.

To run markdown scanner on your own local content before submitting your pull request, you can download the latest binary release or build markdown-scanner yourself to use locally.
Once you have the tool binary, you can use the following commands to validate your changes:

```cmd
apidocs.exe check-all --path {path to documentation repo root}
```


<!-- {
  "type": "#page.annotation",
  "description": "Learn how to contribute back to the OneDrive API documentation.",
  "keywords": "onedrive,api,documentation,contribute,edits,changes,corrections",
  "section": "documentation"
} -->
