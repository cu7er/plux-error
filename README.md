# plux-error

Simple HTMX error response handling.

This is not an HTMX extension, this extends HTMX by providing a quick and simple solution for displaying alerts on HTMX requests that return non-success status codes.

## How it works

Upon receiving a response code, PLUX-ERROR will replace a region in an HTML template with a similarly named region in the server response. If a response code is returned and the response body does not contain this region, a fallback message will be displayed in this region. If no response is received (e.g., if the device is offline), a 'connection error' message will be shown.

## How to use it

* In a HTML template: Include a blank region <aside id="hx_error"></aside> on all pages. This is where any errors will be displayed.
* In a HTML template: Load the file plux-error.js in the document head, i.e., <script src="<your path here>/plux-error.js"></script>. Add hx-preserve="true" if using it with the extension head-support.js.
* Server-side: On an error, return a region <aside id="hx_error"></aside>. Include any classes here for theming as desired.
