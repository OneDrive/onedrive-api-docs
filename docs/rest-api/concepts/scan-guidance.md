---
author: killerewok2000
ms.author: Sibourda
ms.date: 10/02/2025
title: Best practices for discovering files and detecting changes at scale
ms.localizationpriority: High
redirect_url: https://learn.microsoft.com/en-us/graph/api/resources/onedrive
---
SharePoint and OneDrive store trillions of files.  It is critical to use the right calling patterns when trying to understand all files and changes at scale. Historically, there are many APIs to access files at an atomic level.  Many of these APIs are not efficient at a large scale but work well for a single user interaction. This guidance walks through how to monitor an Office 365 tenant or OneDrive so that your application integrates with Office 365 with maximum performance and efficiency. Applications that typically have this type of need are sync engines, backup providers, search indexers, classification engines, and data loss prevention providers.
