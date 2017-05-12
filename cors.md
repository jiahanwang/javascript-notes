## Simple requests

For methods that cannot modify data: GET, POST with certain MIME types

The only allowed methods are:
- GET
- HEAD
- POST

Apart from the headers set automatically by the user agent (for example, Connection, User-Agent, or any of the other headers with names defined in the Fetch spec as a “forbidden header name”), the only headers which are allowed to be manually set are those which the Fetch spec defines as being a “CORS-safelisted request-header”, which are:
- Accept
- Accept-Language
- Content-Language
- Content-Type (but note the additional requirements below)
- DPR
- Downlink
- Save-Data
- Viewport-Width
- Width

The only allowed values for the Content-Type header are:
- application/x-www-form-urlencoded
- multipart/form-data
- text/plain

Use CORS header to handle the privileges:

- Origin in the request
- Access-Control-Allow-Origin in the response

![simple request](https://mdn.mozillademos.org/files/14293/simple_req.png)

## Preflighted requests
For Ajax and HTTP request methods that can modify data (usually HTTP methods other than GET, or for POST usage with certain MIME types), the specification mandates that browsers "preflight" the request, soliciting supported methods from the server with an HTTP OPTIONS request method, and then, upon "approval" from the server, sending the actual request with the actual HTTP request method. Servers can also notify clients whether "credentials" (including Cookies and HTTP Authentication data) should be sent with requests

In particular, a request is preflighted if any of the following conditions is true:

If the request uses any of the following methods:
- PUT
- DELETE
- CONNECT
- OPTIONS
- TRACE
- PATCH

Or if, apart from the headers set automatically by the user agent (for example, Connection, User-Agent, or any of the other header with a name defined in the Fetch spec as a “forbidden header name”), the request includes any headers other than those which the Fetch spec defines as being a “CORS-safelisted request-header”, which are the following:
- Accept
- Accept-Language
- Content-Language
- Content-Type (but note the additional requirements below)
- DPR
- Downlink
- Save-Data
- Viewport-Width
- Width

Or if the Content-Type header has a value other than the following:
- application/x-www-form-urlencoded
- multipart/form-data
- text/plain

```
Host: bar.other
User-Agent: Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10.5; en-US; rv:1.9.1b3pre) Gecko/20081130 Minefield/3.1b3pre
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8
Accept-Language: en-us,en;q=0.5
Accept-Encoding: gzip,deflate
Accept-Charset: ISO-8859-1,utf-8;q=0.7,*;q=0.7
Connection: keep-alive
Origin: http://foo.example
Access-Control-Request-Method: POST
Access-Control-Request-Headers: X-PINGOTHER, Content-Type


HTTP/1.1 200 OK
Date: Mon, 01 Dec 2008 01:15:39 GMT
Server: Apache/2.0.61 (Unix)
Access-Control-Allow-Origin: http://foo.example
Access-Control-Allow-Methods: POST, GET, OPTIONS
Access-Control-Allow-Headers: X-PINGOTHER, Content-Type
Access-Control-Max-Age: 86400
Vary: Accept-Encoding, Origin
Content-Encoding: gzip
Content-Length: 0
Keep-Alive: timeout=2, max=100
Connection: Keep-Alive
Content-Type: text/plain
```

![preflighted request](https://mdn.mozillademos.org/files/14289/prelight.png)


## Requests with credentials

The most interesting capability exposed by both XMLHttpRequest or Fetch and CORS is the ability to make "credentialed" requests that are aware of HTTP cookies and HTTP Authentication information. By default, in cross-site XMLHttpRequest or Fetch invocations, browsers will not send credentials. A specific flag has to be set on the XMLHttpRequest object or the Request constructor when it is invoked.

```javascript
var invocation = new XMLHttpRequest();
var url = 'http://bar.other/resources/credentialed-content/';
    
function callOtherDomain(){
  if(invocation) {
    invocation.open('GET', url, true);
    invocation.withCredentials = true;
    invocation.onreadystatechange = handler;
    invocation.send(); 
  }
}
```

Line 7 shows the flag on XMLHttpRequest that has to be set in order to make the invocation with Cookies, namely the withCredentials boolean value. By default, the invocation is made without Cookies. Since this is a simple GET request, it is not preflighted, but the browser will reject any response that does not have the Access-Control-Allow-Credentials: true header, and not make the response available to the invoking web content.


![request with credentails](https://mdn.mozillademos.org/files/14291/cred-req.png)

### Credentialed requests and wildcards

When responding to a credentialed request, the server must specify an origin in the value of the Access-Control-Allow-Origin header, instead of specifying the "*" wildcard.

Because the request headers in the above example include a Cookie header, the request would fail if the value of the Access-Control-Allow-Origin header were "*". But it does not fail: Because the value of the Access-Control-Allow-Origin header is "http://foo.example" (an actual origin) rather than the "*" wildcard, the credential-cognizant content is returned to the invoking web content.

Note that the Set-Cookie response header in the example above also sets a further cookie. In case of failure, an exception—depending on the API used—is raised.



https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS