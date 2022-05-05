---
author: patrick-rodgers
ms.author: patrodg
ms.date: 05/05/2022
ms.topic: overview
title: v8 File Picker Configuration Schema
ms.localizationpriority: High
---

# Picker Configuration Schema

This outlines the full schema available to configure the picker. These options are passed as shown in the samples.

```TypeScript
{
   sdk: "8.0";
   /**
    * Establishes the messaging parameters used to setup the post message communications between
    * picker and host application
    */
   messaging: {
      /**
       * A unique id assigned by the host app to this File Picker instance.
       */
      channelId: string;
      /**
       * The host app's authority, used as the target origin for post-messaging.
       */
      origin: string;
   };
   /**
    * Configuration for the entry location to which the File Picker will navigate on load.
    * The File Picker app will prioritize path-based navigation if provided, falling back to other address forms
    * on error (in case of Site redirection or content rename) or if path information is not provided.
    */
   entry: {
      sharePoint?: {
         /**
         * Specify an exact SharePoint content location by path segments.
         */
         byPath?: {
            /**
             * Full URL to the root of a Web, or server-relative URL.
             * @example
             *  'https://contoso-my.sharepoint.com/personal/user_contoso_com'
             * @example
             *  '/path/to/web'
             * @example
             *  'subweb'
             */
            web?: string;
            /**
             * Full URL or path segement to identity a List.
             * If not preceded with a `/` or a URL scheme, this is assumed to be a list in the specified web.
             * @example
             *  'Shared Documents'
             * @example
             *  '/path/to/web/Shared Documents'
             * @example
             *  'https://contoso.sharepoint.com/path/to/web/Shared Documents'
             */
            list?: string;
            /**
             * Path segment to a folder within a list, or a server-relative URL to a folder.
             * @example
             *  'General'
             * @example
             *  'foo/bar'
             * @example
             *  '/path/to/web/Shared Documents/General'
             */
            folder?: string;
         };
         /**
         * Indicates SharePoint ID values which may be used as a backup in case path-based navigation to the initial item fails.
         * Id-based lookup in SharePoint is slower, as should only be used as a last-resort.
         * The File Picker will return an error if only ID values are specified.
         */
         byId?: {
            webId?: string;
            listId?: string;
            uniqueId?: string;
         };
      };
      /**
       * Indicates that the File Picker should start in the user's OneDrive.
       */
      oneDrive?: {
         /**
         * Specifies that File Picker should start in the user's Files tab.
         */
         files?: {
         /**
          * Path segment for sub-folder within the user's OneDrive.
          * @example
          *  'Pictures'
          * @example
          *  '/personal/user_contoso_com/Documents/Attachments'
          */
         folder?: string;
      };
      /**
      * Indicates that File Picker should start in the user's recent files.
      */
      recent?: {};
      /**
      * Indicates that File Picker should start in the files shared with the user.
      * (NOT currently working in preview picker)
      */
      sharedWithMe?: {};
   };
   /**
    * Providing this object indicates that the host app can provide OAuth tokens
    * via the existing messaging support.
    */
   authentication: {};
   localization?: {
    /**
     * The language code from the Host application.
     * File Picker will render components which are not user content using the specified language.
     * If the backing SharePoint Web has an override language setting, some strings such as column headers will render
     * using the Web's language instead.
     */
    language: string;

   /**
    * Specifies what types of items may be picked and where they come from. Support for these features is inconsistent currently for external applications.
    */
   typesAndSources?: {
      /**
       * Specifies the general category of items picked. Switches between 'file' vs. 'folder' picker mode,
       * or a general-purpose picker.
       * @default 'all'
       */
      mode?: "files" | "folders" | "all";
      /**
       * @default `['folder']` if `itemTypes` is 'folders', otherwise `[]`
       */
      filters?: string[];

      /**
       * Configures whether or not specific pivots may be browsed for content by the user.
       */
      pivots?: {
         recent?: boolean;
         oneDrive?: boolean;
         sharedLibraries?: boolean;
         shared?: boolean;
         search?: boolean;
      };
   };
   /**
    * Specified how many items may be picked.
    */
   selection?: {
      /**
       * @default 'single'
       */
      mode?: "single" | "multiple" | "pick";
      /**
       * Does not appear to be enforced currently
       */
      maxCount?: number;
   };
   /**
    * Specifies what happens when users pick files and what the user may do with files in the picker.
    */
   commands?: {
      /**
       * Sets the default 'pick' behavior once the user selects items.
       */
      pick?: {
         /**
          * Does not currently have any effect, actions should be handled by the host application
          */ 
         action: "select" | "share" | "download" | "move";
         /**
         * A custom label to apply to the button to pick the items.
         * The default varies based on `action`, but is typically 'Select'.
         * This string must be localized if provided.
         */
         label?: string;
      };
      close?: {
         /**
         * A custom label to apply to the button to close the picker.
         * The default is 'Cancel'.
         * This string must be localized if provided.
         */
         label?: string;
      };
   };
   /**
    * Specifies accessibility cues such as auto-focus behaviors.
    */
   accessibility?: {
      focusTrap?: "initial" | "always" | "none";
   };

   /**
    * No effect, reserved for future development
    */ 
   navigation?: {};
}
```