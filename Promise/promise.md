https://promisesaplus.com/

https://medium.com/javascript-scene/master-the-javascript-interview-what-is-a-promise-27fc71e77261

https://developers.google.com/web/fundamentals/getting-started/primers/promises


## Events aren't always the best way

JavaScript is single threaded, meaning that two bits of script cannot run at the same time; they have to run one after another. In browsers, JavaScript shares a thread with a load of other stuff that differs from browser to browser. But typically JavaScript is in the same queue as painting, updating styles, and handling user actions (such as highlighting text and interacting with form controls). Activity in one of these things delays the others.
You've probably used events and callbacks to get around this. Here are events:

```javascript
var img1 = document.querySelector('.img-1');

img1.addEventListener('load', function() {
	// woo yey image loader
});

img1.addEventListener('error', function() {
	// argh everything's broke
});
```
 
This isn't sneezy at all. We get the image, add a couple of listeners, then JavaScript can stop executing until one of those listeners is called.
Unfortunately, in the example above, it's possible that the events happened before we started listening for them, so we need to work around that using the "complete" property of images:

```javascript
var img1 = document.querySelector('.img-1');

function loaded() {
	// woo yey image loaded
}

if (img1.complete) {
	loaded();
} else {
	img1.addEventListener('load', loaded);
}

img1.addEventListener('error', function() {
	// argh everything's broken
}); 
```
This doesn't catch images that error'd before we got a chance to listen for them; unfortunately the DOM doesn't give us a way to do that. Also, this is loading one image, things get even more complex if we want to know when a set of images have loaded.


Events are great for things that can happen multiple times on the same object—keyup, touchstart etc. With those events you don't really care about what happened before you attached the listener. But when it comes to async success/failure, ideally you want something like this:

```javascript
img1.callThisIfLoadedOrWhenLoaded(function() {
  // loaded
}).orIfFailedCallThis(function() {
  // failed
});

// and…
whenAllTheseHaveLoaded([img1, img2]).callThis(function() {
  // all loaded
}).orIfSomeFailedCallThis(function() {
  // one or more failed
});
```

This is what promises do, but with better naming. This is extremely useful for async success/failure, because you're less interested in the exact time something became available, and more interested in reacting to the outcome.

## Promise terminology
A promise can be:

* fulfilled - The action relating to the promise succeeded
* rejected - The action relating to the promise failed
* pending - Hasn't fulfilled or rejected yet
* settled - Has fulfilled or rejected

The spec also uses the term thenable to describe an object that is promise-like, in that it has a then method. 

The promise constructor takes one argument, a callback with two parameters, resolve and reject. Do something within the callback, perhaps async, then call resolve if everything worked, otherwise call reject.

Like throw in plain old JavaScript, it's customary, but not required, to reject with **an Error object**. The benefit of Error objects is they capture a stack trace, making debugging tools more helpful.

JavaScript promises started out in the DOM as "Futures", renamed to "Promises", and finally moved into JavaScript. Having them in JavaScript rather than the DOM is great because they'll be available in non-browser JS contexts such as Node.js (whether they make use of them in their core APIs is another question).

Although they're a JavaScript feature, the DOM isn't afraid to use them. In fact, all new DOM APIs with async success/failure methods will use promises. This is happening already with Quota Management, Font Load Events, ServiceWorker, Web MIDI, Streams, and more.

## Browser support & polyfill
There are already implementations of promises in browsers today.
As of Chrome 32, Opera 19, Firefox 29, Safari 8 & Microsoft Edge, promises are enabled by default.
To bring browsers that lack a complete promises implementation up to spec compliance, or add promises to other browsers and Node.js, check out the [polyfill](https://github.com/stefanpenner/es6-promise#readme).


## Promisifying XMLHttpRequest
Old APIs will be updated to use promises, if it's possible in a backwards compatible way. XMLHttpRequest is a prime candidate, but in the mean time let's write a simple function to make a GET request:

```javascript
function get(url) {
  // Return a new promise.
  return new Promise(function(resolve, reject) {
    // Do the usual XHR stuff
    var req = new XMLHttpRequest();
    req.open('GET', url);

    req.onload = function() {
      // This is called even on 404 etc
      // so check the status
      if (req.status == 200) {
        // Resolve the promise with the response text
        resolve(req.response);
      }
      else {
        // Otherwise reject with the status text
        // which will hopefully be a meaningful error
        reject(Error(req.statusText));
      }
    };

    // Handle network errors
    req.onerror = function() {
      reject(Error("Network Error"));
    };

    // Make the request
    req.send();
  });
}

```

## Chaining
then() isn't the end of the story, you can chain thens together to transform values or run additional async actions one after another.

#### Transforming values
You can transform values simply by returning the new value:

```javascript
get('story.json').then(JSON.parse).then(function(response) {
  console.log("Yey JSON!", response);
})
```

#### Queuing asynchronous actions
You can also chain thens to run async actions in sequence.
When you return something from a then() callback, it's a bit magic. If you return a value, the next then() is called with that value. However, if you return something promise-like, the next then() waits on it, and is only called when that promise settles (succeeds/fails). 
```javascript
getJSON('story.json').then(function(story) {
  return getJSON(story.chapterUrls[0]);
}).then(function(chapter1) {
  console.log("Got chapter 1!", chapter1);
})
```

## Error handling
As we saw earlier, then() takes two arguments, one for success, one for failure (or fulfill and reject, in promises-speak).

```javascript
get('story.json').then(function(response) {
  console.log("Success!", response);
}, function(error) {
  console.log("Failed!", error);
})
```
```javascript
get('story.json').then(function(response) {
  console.log("Success!", response);
}).catch(function(error) {
  console.log("Failed!", error);
})
```
Note that the two code examples above do not behave the same, the latter is equivalent to:
```javascript
get('story.json').then(function(response) {
  console.log("Success!", response);
}).then(undefined, function(error) {
  console.log("Failed!", error);
})
```
The difference is subtle, but extremely useful. Promise rejections skip forward to the next then() with a rejection callback (or catch(), since it's equivalent). With then(func1, func2), func1 or func2 will be called, never both. But with then(func1).catch(func2), both will be called if func1 rejects, as they're separate steps in the chain. Take the following:

```javascript
asyncThing1().then(function() {
  return asyncThing2();
}).then(function() {
  return asyncThing3();
}).catch(function(err) {
  return asyncRecovery1();
}).then(function() {
  return asyncThing4();
}, function(err) {
  return asyncRecovery2();
}).catch(function(err) {
  console.log("Don't worry about it");
}).then(function() {
  console.log("All done!");
})
```

The flow above is very similar to normal JavaScript try/catch, errors that happen within a "try" go immediately to the catch() block. Here's the above as a flowchart:
[flow chart]()


Rejections happen when a promise is explicitly rejected, but also implicitly if an error is thrown in the constructor callback.

This means it's useful to do all your promise-related work inside the promise constructor callback, so errors are automatically caught and become rejections.The same goes for errors thrown in then() callbacks.

## Parallelism and sequencing: getting the best of both

### Creating a sequence
We want to turn our chapterUrls array into a sequence of promises. 
```javascript
getJSON('story.json').then(function(story) {
  addHtmlToPage(story.heading);

  return story.chapterUrls.reduce(function(sequence, chapterUrl) {
    // Once the last chapter's promise is done…
    return sequence.then(function() {
      // …fetch the next chapter
      return getJSON(chapterUrl);
    }).then(function(chapter) {
      // and add it to the page
      addHtmlToPage(chapter.html);
    });
  }, Promise.resolve());
}).then(function() {
  // And we're all done!
  addTextToPage("All done");
}).catch(function(err) {
  // Catch any error that happened along the way
  addTextToPage("Argh, broken: " + err.message);
}).then(function() {
  // Always hide the spinner
  document.querySelector('.spinner').style.display = 'none';
})
```

This is the first time we've seen Promise.resolve(), which creates a promise that resolves to whatever value you give it. If you pass it an instance of Promise it'll simply return it (note: this is a change to the spec that some implementations don't yet follow). If you pass it something promise-like (has a then() method), it creates a genuine Promise that fulfills/rejects in the same way. If you pass in any other value, e.g., Promise.resolve('Hello'), it creates a promise that fulfills with that value. If you call it with no value, as above, it fulfills with "undefined".
There's also Promise.reject(val), which creates a promise that rejects with the value you give it (or undefined).

Browsers are pretty good at downloading multiple things at once, so we're losing performance by downloading chapters one after the other. What we want to do is download them all at the same time, then process them when they've all arrived

```javascript
getJSON('story.json').then(function(story) {
  addHtmlToPage(story.heading);

  // Take an array of promises and wait on them all
  return Promise.all(
    // Map our array of chapter urls to
    // an array of chapter json promises
    story.chapterUrls.map(getJSON)
  );
}).then(function(chapters) {
  // Now we have the chapters jsons in order! Loop through…
  chapters.forEach(function(chapter) {
    // …and add to the page
    addHtmlToPage(chapter.html);
  });
  addTextToPage("All done");
}).catch(function(err) {
  // catch any error that happened so far
  addTextToPage("Argh, broken: " + err.message);
}).then(function() {
  document.querySelector('.spinner').style.display = 'none';
})
```

However, we can still improve perceived performance. When chapter one arrives we should add it to the page. This lets the user start reading before the rest of the chapters have arrived. When chapter three arrives, we wouldn't add it to the page because the user may not realise chapter two is missing. When chapter two arrives, we can add chapters two and three, etc etc.
To do this, we fetch JSON for all our chapters at the same time, then create a sequence to add them to the document

```javascript
getJSON('story.json').then(function(story) {
  addHtmlToPage(story.heading);

  // Map our array of chapter urls to
  // an array of chapter json promises.
  // This makes sure they all download parallel.
  return story.chapterUrls.map(getJSON)
    .reduce(function(sequence, chapterPromise) {
      // Use reduce to chain the promises together,
      // adding content to the page for each chapter
      return sequence.then(function() {
        // Wait for everything in the sequence so far,
        // then wait for this chapter to arrive.
        return chapterPromise;
      }).then(function(chapter) {
        addHtmlToPage(chapter.html);
      });
    }, Promise.resolve());
}).then(function() {
  addTextToPage("All done");
}).catch(function(err) {
  // catch any error that happened along the way
  addTextToPage("Argh, broken: " + err.message);
}).then(function() {
  document.querySelector('.spinner').style.display = 'none';
})
```