/*
A bare-bones way to notify of errors.

Uses htmx's evt.detail.xhr evt.detail.failed and to replace
a template region
identified by
#hx_error
with the contents of a response also identified by #hx_error.
Simple and straightforward and also with
fallback handling of 'offline' (user or server connection error)
or when
there's nothing
'#hx_error'
in the response.
*/

document.addEventListener("htmx:sendError", function(evt) {
    var element = document.getElementById("hx_error");
    if (element) {
        element.className = ''; // Remove existing classes
        element.classList.add('error', 'neterror');
        element.innerHTML = '<p>Connection error...</p>';
    }
});

document.addEventListener('DOMContentLoaded', function () {
    // Predefined error messages
    var errorMessages = {
        100: '100 Continue',
        101: '101 Switching Protocols',
        102: '102 Processing',
        200: '200 OK',
        201: '201 Created',
        202: '202 Accepted',
        203: '203 Non-Authoritative Information',
        204: '204 No Content',
        205: '205 Reset Content',
        206: '206 Partial Content',
        207: '207 Multi-Status',
        208: '208 Already Reported',
        226: '226 IM Used',
        300: '300 Multiple Choices',
        301: '301 Moved Permanently',
        302: '302 Found',
        303: '303 See Other',
        304: '304 Not Modified',
        305: '305 Use Proxy',
        307: '307 Temporary Redirect',
        308: '308 Permanent Redirect',
        400: '400 Bad Request',
        401: '401 Unauthorized',
        402: '402 Payment Required',
        403: '403 Forbidden',
        404: '404 Not Found',
        405: '405 Method Not Allowed',
        406: '406 Not Acceptable',
        407: '407 Proxy Authentication Required',
        408: '408 Request Timeout',
        409: '409 Conflict',
        410: '410 Gone',
        411: '411 Length Required',
        412: '412 Precondition Failed',
        413: '413 Payload Too Large',
        414: '414 URI Too Long',
        415: '415 Unsupported Media Type',
        416: '416 Range Not Satisfiable',
        417: '417 Expectation Failed',
        418: "418 I'm a teapot",
        421: '421 Misdirected Request',
        422: '422 Unprocessable Entity',
        423: '423 Locked',
        424: '424 Failed Dependency',
        425: '425 Too Early',
        426: '426 Upgrade Required',
        428: '428 Precondition Required',
        429: '429 Too Many Requests',
        431: '431 Request Header Fields Too Large',
        451: '451 Unavailable For Legal Reasons',
        500: '500 Internal Server Error',
        501: '501 Not Implemented',
        502: '502 Bad Gateway',
        503: '503 Service Unavailable',
        504: '504 Gateway Timeout',
        505: '505 HTTP Version Not Supported',
        506: '506 Variant Also Negotiates',
        507: '507 Insufficient Storage',
        508: '508 Loop Detected',
        510: '510 Not Extended',
        511: '511 Network Authentication Required'
    };

    document.body.addEventListener('htmx:beforeSwap', function(evt) {
        var element = document.getElementById("hx_error");
        if (!element) return;

        var responseDoc = new DOMParser().parseFromString(evt.detail.xhr.responseText, 'text/html');
        var responseErrorElement = responseDoc.querySelector('#hx_error');

        if (responseErrorElement) {
            element.replaceWith(responseErrorElement);
        } else {
            var status = evt.detail.xhr.status;
            var errorMessage = errorMessages[status];

            element.className = ''; // Remove existing classes

            if (evt.detail.failed) {
                element.classList.add('error', 'neterror');
                element.innerHTML = '<p>Connection error...</p>';
            } else if (errorMessage) {
                element.classList.add('error', `code-${status}`, `code-${Math.floor(status / 100)}xx`);
                element.innerHTML = `<p>${errorMessage}</p>`;
            }
        }
    });
});
