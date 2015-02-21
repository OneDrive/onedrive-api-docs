# Pretty printing

Debugging for developers writing applications to the OneDrive API is now easier,
with newly added options to format JSON output with whitespace.
You can do this by updating the request's `Accept` header like so:

```
Accept: application/json;format=pretty
```
