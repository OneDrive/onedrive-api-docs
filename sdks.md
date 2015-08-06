# SDKs for OneDrive integration

Use the OneDrive software development kits to quickly get OneDrive integrated
into your apps. While programming with REST APIs is pretty easy, the OneDrive
SDKs aim to make it even easier.

## Picker and saver SDKs
Add OneDrive to your app in minutes with a few lines of code.

Get a link from OneDrive for sharing or downloading the contents of a file.
Save a file on the user's local device to OneDrive so it's available on all your users' devices.

| Platform | OneDrive | OneDrive for Business | Documentation                                                     |
|:---------|:---------|:----------------------|:------------------------------------------------------------------|
| Android  | Yes      | Yes                   | [Picker and saver SDK][android-picker]                            |
| iOS      | Yes      | Not yet               | [UIDocumentPicker][ios-picker]                                    |
| Web      | Yes      | Not yet               | [Picker and saver SDK][web-picker]                                |
| Windows  | Yes      | Not yet               | [FileOpenPicker][windows-picker], [FileSavePicker][windows-saver] |

[android-picker]:https://msdn.microsoft.com/EN-US/library/dn833235.aspx
[ios-picker]:https://developer.apple.com/library/ios/documentation/FileManagement/Conceptual/DocumentPickerProgrammingGuide/AccessingDocuments/AccessingDocuments.html
[web-picker]:sdk/javascript-picker-saver.md
[windows-picker]:https://msdn.microsoft.com/library/windows/apps/br207847
[windows-saver]:https://msdn.microsoft.com/en-us/library/windows/apps/windows.storage.pickers.filesavepicker.aspx

## OneDrive API SDKs

Use the OneDrive SDK for your platform to quickly start using the OneDrive API
without the need to get into all the details of authentication, JSON parsing,
HTTP connections and more. Just install the SDK into your project and get going.

| Platform | OneDrive | OneDrive for Business | Documentation                                                            |
|:---------|:---------|:----------------------|:-------------------------------------------------------------------------|
| iOS      | Yes      | Yes                   | [OneDriveSDK on cocoadocs.org](http://cocoadocs.org/docsets/OneDriveSDK) |

We're working hard to bring SDKs for Android, Windows universal apps, and more
as soon as possible. Stay tuned!

Don't see your favorite platform?   [Suggest it on UserVoice](http://onedrive.uservoice.com/forums/262982-onedrive/category/89523-developer).

<!-- {
  "type": "#page.annotation",
  "description": "SDKs to make integrating with OneDrive easy.",
  "keywords": "sdk,windows,ios,android,js,javascript,C#,c-sharp,java,objective-c",
  "section": "sdks"
} -->
