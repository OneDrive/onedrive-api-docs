# Long running actions

Some scenarios, like [copy](../items/copy.md) or [upload from URL](../items/upload_url.md) cannot always be completed in a finite amount of time.
To handle these scenarios and keep API response latency low, these actions are implemented using a long running actions pattern.

1. App requests a long running action via the API. The API accepts the action and returns a `202 Accepted` response along with a Location header for the API URL to retrieve action status reports.
2. App requests the action status report URL and receives an [AsyncJobStatus](../resources/asyncJobStatus.md) response with the progress of the long running action
3. The long running action completes. Next time the app requests the action status report URL and receives an [AsyncJobStatus](../resources/asyncJobStatus.md) response with the completion of the action.

# Example

## 1. Initial action request
Let's walk through the steps for an example [copy](../items/copy.md) scenario.
In this scenario, an app requests to copy a folder with a large amount of data contained within.
This request will likely take several seconds to complete since the amount of data is large.

<!-- { "blockType": "request", "name": "lro-copy-item-example", "scopes": "files.readwrite" } -->
```http
POST /drive/items/{folder-item-id}/copy
Content-Type: application/json
Prefer: respond-async

{
  "parentReference": {
    "path": "/drive/root:/Documents"
  },
  "name": "Copy of LargeFolder1"
}
```

The API responds that the action was accepted and the URL for retriving the status of the long running action.

<!-- { "blockType": "response" } -->
```http
HTTP/1.1 202 Accepted
Location: https://api.onedrive.com/monitor/4A3407B5-88FC-4504-8B21-0AABD3412717
```

In many cases this many be the end of the request, since the copy action will complete without the app doing any additional work.
However, if the app wants to show the status of the copy action or ensure that it completes without error, it can do so using the monitor URL.

## 2. Retrieve a status report from the monitor URL

To check on the status of the copy action, the app makes a request to the URL provided in the previous response.
*Note:* This request does not require authentication, since the URL is short-lived and unique to the original caller. 

<!-- { "blockType": "request", "name": "lro-check-status", "scopes": "files.readwrite" } -->
```http
GET https://api.onedrive.com/monitor/4A3407B5-88FC-4504-8B21-0AABD3412717
```

The service responses with information that the long running action is still in progress:

<!-- { "blockType": "response", "@odata.type": "oneDrive.asyncOperationStatus" } -->
```http
HTTP/1.1 202 Accepted
Content-type: application/json

{
  "operation": "ItemCopy",
  "percentageComplete": 27.8,
  "status": "inProgress"
}
```

This information can be used to provide an update to the user about the progress of the copy action.
The app can continue to poll the monitor URL to request status updates and keep track of the progress of the action.

## 3. Retrieve a completed status report from the monitor URL

After a few seconds the copy operation has completed.
This time when the app makes a request to the monitor URL the response is a redirection to the finished result of the action.

<!-- { "blockType": "request", "name": "lro-check-status-complete", "scopes": "files.readwrite" } -->
```http
GET https://api.onedrive.com/monitor/4A3407B5-88FC-4504-8B21-0AABD3412717
```

The `303 See Other` response indicates the action has completed.
The Location header provides the URL for the result of the action, in this case the new copy of the folder.

<!-- { "blockType": "response", "@odata.type": "oneDrive.asyncOperationStatus" } -->
```http
HTTP/1.1 303 See Other
Location: https://api.onedrive.com/items/{item-id}
```



<!-- {
  "type": "#page.annotation",
  "description": "Monitor the progress of long-running actions in the API.",
  "keywords": "monitor,long,running,operation,action",
  "section": "documentation",
  "tocPath": "Concepts/Long running actions"
} -->
