## debounce
Creates and returns a new debounced version of the passed function which will postpone its execution until after wait milliseconds have elapsed since the last time it was invoked.

```javascript
var debounce = function (func, threshold, immidiate) {
    var timeout;
 
    return function debounced () {
        var that = this, args = arguments;
        function delayed () {
            timeout = null; 

            if (!immidiate)
                func.apply(that, args);
        };
 
        if (timeout)
            clearTimeout(timeout);
        else if (immidiate)
            func.apply(that, args);
 
        timeout = setTimeout(delayed, threshold || 100); 
    };
}
```

## throttle
Creates and returns a new, throttled version of the passed function, that, when invoked repeatedly, will only actually call the original function at most once per every wait milliseconds. Useful for rate-limiting events that occur faster than you can keep up with.

```javascript
function throttle (callback, limit) {
    var wait = false;                 // Initially, we're not waiting
    return function () {              // We return a throttled function
        if (!wait) {                  // If we're not waiting
            callback.call();          // Execute users function
            wait = true;              // Prevent future invocations
            setTimeout(function () {  // After a period of time
                wait = false;         // And allow future invocations
            }, limit);
        }
    }
}
```
## Illustration
![Illustration](https://raw.githubusercontent.com/jiahanwang/javascript-notes/master/images/debounce-throttle.png)

http://demo.nimius.net/debounce_throttle/

See implementation of underscore
	http://underscorejs.org/docs/underscore.html
