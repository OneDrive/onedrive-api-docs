# OneDrive API Documentation

This repository is home to the OneDrive developer documentation.
This includes documentation for a portion of the Microsoft Graph that accesses OneDrive and SharePoint content, and documentation for Office 365 file handlers and file pickers.

For easier navigation of content, we recommend consuming this content from the [OneDrive Developer Portal](https://developers.microsoft.com/onedrive) or from [https://docs.microsoft.com/onedrive/developer](https://docs.microsoft.com/onedrive/developer).

## Contribute to OneDrive developer documentation

We welcome contributions from our community (users, customers, partners, MSFT employees, etc.)
How you contribute depends on who you are:

* **Community - minor updates**: If you are contributing minor updates out of the goodness of your heart, you can find the article in this repository, or visit the article on [https://docs.microsoft.com/onedrive/developer](https://docs.microsoft.com/onedrive/developer) and click the **Edit** link in the article that goes to the GitHub source for the article.
Then, just use the GitHub UI to make your updates.
Or, you are welcome to fork the repository and submit updates from your fork.

* **Community - new articles**: If you're part of the OneDrive or SharePoint community and you want to create a new article, you need to work with an employee to help bring that new content in through a combination of work in the public and private repository.

* **Employees**: If you are a technical writer, program manager, or developer from the product team and it's your job to contribute to or author technical articles, you should use the repository in our Visual Studio instance.
If you are making substantial changes to an existing article, adding or changing images, or contributing a new article, you need to fork this repository, install Git, a markdown editor, and learn some git commands.
See [the internal contributor's guide](https://review.docs.microsoft.com/en-us/help/contribute/?branch=master) for more information.

## About your contributions to OneDrive content

### Minor corrections

Minor corrections or clarifications you submit for documentation and code examples in this repo are covered by the [docs.microsoft.com Terms of Use](https://docs.microsoft.com/legal/termsofuse).

### Larger submissions

If you submit a pull request with new or significant changes to documentation and code examples, we'll send a comment in GitHub asking you to submit an online Contribution License Agreement (CLA) if you are not an employee of Microsoft.
We need you to complete the online form before we can accept your pull request.

## Tools and setup

Community contributors can use the GitHub UI or fork the repo to contribute.
Employees should visit [the internal contributor's guide](https://review.docs.microsoft.com/en-us/help/contribute/?branch=master) for more information about how to contribute to the technical documentation set.

## Repository organization

The content in the `onedrive-api-docs` repository follows the organization of documentation on https://docs.microsoft.com/onedrive/developer. This repository contains a few root folders:

### \docs

The *\docs* folder contains the documentation articles formatted as markdown files with an *.md* extension.

The *\docs* folder contains the *\media* folder for root directory article media files, such as inline images.

### \templates

The *\templates* folder contains markdown formatted topic templates when adding a new API or resource to the repository.
Please use these templates when authoring a new topic.

### \tests

The *\tests* folder contains configuration and [Markdown-Scanner](https://github.com/onedrive/markdown-scanner) scenario definitions which are used for automated testing of the documentation.
All pull requests to update the documentation will be validated using these tests, which validate consistency of the documentation and verify that the API implementation matches the documentation.

## How to use markdown to format your topic
All the articles in this repository use GitHub flavored markdown.
Here's a list of resources.

* [Markdown basics](https://help.github.com/articles/markdown-basics/)

## Microsoft Open Source Code of Conduct

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/).
For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.