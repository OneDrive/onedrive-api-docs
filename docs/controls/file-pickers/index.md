---
author: rgregg
ms.author: rgregg
ms.date: 09/10/2017
ms.topic: overview
title: OneDrive Controls for Developers
localization_priority: Priority
---
# Shared controls for OneDrive integration

While programming with REST APIs is a common practice, we make available client libraries to streamline development and allow you to focus on writing the code that matters, and not a bunch of framework code.

## File picker

The file picker SDKs enable your application to use native OneDrive file browser experiences from your application to quickly open and save files to OneDrive personal and OneDrive for Business.
For Android, iOS, and UWP, this pattern depends on the OneDrive application being installed and available on the device.

| Platform                   | Documentation                                                            |
| -------------------------- | ------------------------------------------------------------------------ |
| Web / JavaScript           | [JavaScript File picker SDK][web-picker]                                 |
|                            | [File Browser SDK][file-browser]                                    |
| Android                    | [Android file picker SDK][android-picker]                                |
| iOS                        | [Use UIDocumentPicker][ios-picker]                                       |
| Universal Windows Platform | [Use FileOpenPicker][windows-picker], or [FileSavePicker][windows-saver] |


[android-picker]: android/index.md
[ios-picker]: https://developer.apple.com/library/ios/documentation/FileManagement/Conceptual/DocumentPickerProgrammingGuide/AccessingDocuments/AccessingDocuments.html
[web-picker]: js-v72/index.md
[file-browser]: react/index.md
[windows-picker]: https://msdn.microsoft.com/library/windows/apps/br207847
[windows-saver]: https://msdn.microsoft.com/en-us/library/windows/apps/windows.storage.pickers.filesavepicker.aspx

## Microsoft Graph SDKs and sample code

[Microsoft Graph makes a wide variety of SDKs and sample code](https://graph.microsoft.io/en-us/code-samples-and-sdks) available for a number of developer platforms that enable you to quickly start writing code to leverage the Microsoft Graph and have access to files in OneDrive and SharePoint.



<!-- {
  "type": "#page.annotation",
  "description": "SDKs to make integrating with OneDrive easy.",
  "keywords": "sdk,windows,ios,android,js,javascript,C#,c-sharp,java,objective-c,python",
  "section": "sdks",
  "tocPath": "OneDrive SDKs",
  "tocBookmarks": {
    "OneDrive SDKs/Client libraries": "#microsoft-graph-sdks-and-sample-code",
    "OneDrive SDKs/File pickers": "#file-picker-sdks"
  }
} -->
