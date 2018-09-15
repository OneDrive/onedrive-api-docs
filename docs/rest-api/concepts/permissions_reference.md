---
author: rgregg
ms.author: rgregg
ms.date: 09/10/2017
title: Understanding OneDrive API permission scopes
---
# Permissions for OneDrive API

OneDrive and SharePoint expose a few granular permissions that control the access that apps have to resources.
When a user signs in to your app they, or, in some cases, an administrator, are required to consent to these permissions.
If consent is given, your app is given access to the resources and APIs that it has requested.
For apps that don't take a signed-in user, permissions can be pre-consented to by an administrator when the app is installed or during sign-up. 

## Files permissions

#### Delegated permissions

| Permission                  | Display String                                         | Description                                                                                                                                                                                             | Admin Consent Required |
| :-------------------------- | :----------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | :--------------------- |
| _Files.Read_                | Read user files                                        | Allows the app to read the signed-in user's files.                                                                                                                                                      | No                     |
| _Files.Read.All_            | Read all files that user can access                    | Allows the app to read all files the signed-in user can access.                                                                                                                                         | No                     |
| _Files.ReadWrite_           | Have full access to user files                         | Allows the app to read, create, update, and delete the signed-in user's files.                                                                                                                          | No                     |
| _Files.ReadWrite.All_       | Have full access to all files user can access          | Allows the app to read, create, update, and delete all files the signed-in user can access.                                                                                                             | No                     |

#### Application permissions

| Permission            | Display String                               | Description                                                                                                    | Admin Consent Required |
| :-------------------- | :------------------------------------------- | :------------------------------------------------------------------------------------------------------------- | :--------------------- |
| _Files.Read.All_      | Read files in all site collections           | Allows the app to read all files in all site collections without a signed in user.                             | Yes                    |
| _Files.ReadWrite.All_ | Read and write files in all site collections | Allows the app to read, create, update, and delete all files in all site collections without a signed in user. | Yes                    |

### Example usage
#### Delegated

* _Files.Read_ : Read files stored in the signed-in user's OneDrive (`GET /drive/root/children`)
* _Files.Read.All_ : Read files shared with the signed-in user (`GET /drive/root/oneDrive.sharedWithMe`)
* _Files.ReadWrite_ : Write a file in the signed-in user's OneDrive (`PUT /drive/root/children/filename.txt/content`)
* _Files.ReadWrite.All_ : Write a file shared with the user (`PUT /drives/abac235/root/children/file.txt/content`)

--- 

## Sites permissions

#### Delegated permissions

| Permission              | Display String                                                   | Description                                                                                                                   | Admin Consent Required |
| :---------------------- | :--------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------- | :--------------------- |
| _Sites.Read.All_        | Read items in all site collections                               | Allows the app to read documents and list items in all site collections on behalf of the signed-in user.                      | No                     |
| _Sites.ReadWrite.All_   | Read and write items in all site collections                     | Allows the app to edit or delete documents and list items in all site collections on behalf of the signed-in user.            | No                     |
| _Sites.Manage.All_      | Create, edit, and delete items and lists in all site collections | Allows the app to manage and create lists, documents, and list items in all site collections on behalf of the signed-in user. | No                     |
| _Sites.FullControl.All_ | Have full control of all site collections                        | Allows the app to have full control to SharePoint sites in all site collections on behalf of the signed-in user.              | Yes                    |

#### Application permissions

| Permission              | Display String                                                   | Description                                                                                                                   | Admin Consent Required |
| :---------------------- | :--------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------- | :--------------------- |
| _Sites.Read.All_        | Read items in all site collections                               | Allows the app to read documents and list items in all site collections without a signed in user.                             | Yes                    |
| _Sites.ReadWrite.All_   | Read and write items in all site collections                     | Allows the app to create, read, update, and delete documents and list items in all site collections without a signed in user. | Yes                    |
| _Sites.Manage.All_      | Have full control of all site collections                        | Allows the app to manage and create lists, documents, and list items in all site collections without a signed-in user.        | Yes                    |
| _Sites.FullControl.All_ | Create, edit, and delete items and lists in all site collections | Allows the app to have full control to SharePoint sites in all site collections without a signed-in user.                     | Yes                    |


### Example usage

#### Delegated

* _Sites.Read.All_ : Read the lists on the SharePoint root site (`GET /v1.0/sites/root/lists`)
* _Sites.ReadWrite.All_ : Create new list items in a SharePoint list (`POST /v1.0/sites/root/lists/123/items`)
* _Sites.Manage.All_ : Add a new list to a SharePoint site (`POST /v1.0/sites/root/lists`)
* _Sites.FullControl.All_ : Complete access to SharePoint sites and lists.
