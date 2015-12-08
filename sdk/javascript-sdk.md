# JavaScript Picker SDK

The [unified OneDrive picker SDK](unified-javascript-picker-saver.md) 
is in Public Preview, which means it is still a work in progress. We've 
released this preview to give developers an early look at the direction 
we're heading with the web picker SDK.

For production applications that need to work flawlessly, you should
continue to use the [existing JavaScript picker SDK](javascript-picker-saver.md),
which only works for OneDrive consumer accounts.

## SDK differences

While our end goal is that the unified JavaScript SDK works uniformly for OneDrive and
OneDrive for Business, we're not there yet. There are several important
differences you'll need to be aware of until the SDK is fully released.

Aspects of SDK that are not available in the unified version
are listed below:

* [Save from IE9](#save-from-ie9) 
* [OneDrive buttons](#onedrive-buttons)

### Save from IE9
The [unified OneDrive picker SDK](unified-javascript-picker-saver.md) does 
not allow users to save a file from OneDrive through a form upload from IE9.

### OneDrive Buttons
The [unified OneDrive picker SDK](unified-javascript-picker-saver.md) only 
supports launching the picking experience programatically.   It does not support
creating a `Open from OneDrive` or `Save to OneDrive` button to launch the 
picking experience.

## Send us feedback!

Please use the community links at the bottom of our website to send us feedback
either through UserVoice or by posting issues in GitHub. We want to hear more
from you about the JavaScript picker SDK.

<!-- {
  "type": "#page.annotation",
  "description": "Read more about the differences in using unified JavaScript Picker SDK",
  "keywords": "release,notes,onedrive,onedrive for business,od4b,odb,files api,files api v2",
  "section": "documentation",
} -->
