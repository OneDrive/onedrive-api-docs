# SDKs for OneDrive integration

Use the OneDrive software development kits to quickly get OneDrive integrated
into your apps. While programming with REST APIs is pretty easy, the OneDrive
SDKs aim to make it even easier.

## File picker SDKs
Add OneDrive to your app in minutes with a few lines of code. File picker SDKs
allow you to quickly download or link to files already in OneDrive, or save files
into OneDrive without writing much code. Quickly integrate your app with OneDrive
today!


| Platform         | OneDrive | OneDrive for Business | Documentation                                                                     |
|:-----------------|:---------|:----------------------|:----------------------------------------------------------------------------------|
| Android          | Yes      | Yes                   | [Android File picker SDK][android-picker]                                         |
| iOS              | Yes      | Yes                   | [Use iOS's UIDocumentPicker contract][ios-picker]                                 |
| Web / JavaScript | Yes      | Yes                   | [JavaScript File picker SDK][web-picker]                                          |
| Windows          | Yes      | Yes                   | [Use Windows' FileOpenPicker][windows-picker], or [FileSavePicker][windows-saver] |


[android-picker]: sdk/android-picker/android-picker-overview.md
[ios-picker]: https://developer.apple.com/library/ios/documentation/FileManagement/Conceptual/DocumentPickerProgrammingGuide/AccessingDocuments/AccessingDocuments.html
[web-picker]: sdk/js-v7/js-picker-overview.md
[windows-picker]: https://msdn.microsoft.com/library/windows/apps/br207847
[windows-saver]: https://msdn.microsoft.com/en-us/library/windows/apps/windows.storage.pickers.filesavepicker.aspx

## OneDrive API SDKs

Use the OneDrive SDK for your platform to quickly start using the OneDrive API
without the need to get into all the details of authentication, JSON parsing,
HTTP connections and more. Just install the SDK into your project and get going.

| Platform                                  | OneDrive | OneDrive for Business | Documentation                          |
|:------------------------------------------|:---------|:----------------------|:---------------------------------------|
| [Windows .NET / C# / Xamarin][csharp-sdk] | Yes      | Yes                   | [OneDrive SDK C#][csharp-sdk]          |
| [iOS][ios-sdk]                            | Yes      | Yes                   | [OneDrive SDK for iOS][ios-sdk]        |
| [Python][python-sdk]                      | Yes      | Not Yet               | [OneDrive SDK for Python][python-sdk]  |
| [Android][android-sdk]                    | Yes      | Yes                   | [OneDrive SDK for Android][android-sdk]|

[ios-sdk]: https://github.com/onedrive/onedrive-sdk-ios
[csharp-sdk]: https://github.com/onedrive/onedrive-sdk-csharp
[python-sdk]: https://github.com/onedrive/onedrive-sdk-python
[android-sdk]: https://github.com/onedrive/onedrive-sdk-android

We're working hard to bring SDKs for more platforms in the future. Stay tuned!

Don't see your favorite platform? [Suggest it on UserVoice](http://onedrive.uservoice.com/forums/262982-onedrive/category/89523-developer)!

<!-- {
  "type": "#page.annotation",
  "description": "SDKs to make integrating with OneDrive easy.",
  "keywords": "sdk,windows,ios,android,js,javascript,C#,c-sharp,java,objective-c,python",
  "section": "sdks",
  "tocPath": "OneDrive SDKs",
  "tocBookmarks": {
    "OneDrive SDKs/Windows .NET SDK": "#onedrive-api-sdks",
    "OneDrive SDKs/iOS SDK": "#onedrive-api-sdks",
    "OneDrive SDKs/Python SDK": "#onedrive-api-sdks",
    "OneDrive SDKs/Android SDK": "#onedrive-api-sdks"
  }
} -->
