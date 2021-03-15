# coldboot.js
A lightweight vanillaJs script to connect server-rendered static HTML to client-rendered application

# Functionality

* show an unhideable loader when certain elements are clicked 
* save user input between static state and interactive state
//todo see if user 'focus' needs to be preserved

# Usage 

install the package using npm

``` npm install coldboot ``` 

load the coldboot.js script in your page 

```html
<script async src="/node_modules/coldboot/dist/coldboot.min.js" onload="coldboot.init()" type="text/javascript"></script>
```

we expose `coldboot` on window which has 2 methods init & complete.

`coldboot.init` needs to be called to start listening to user events, and takes 2 parameters `customLoaderId,customTextContainerId` these ids determine the element to show and the element where loader text is to be injected.

in markup , we can now add attributes `cb-await='loader text'` & `cb-await-id='loaderId'` to add a loader with custom text, the id provided in `cb-await-id` is provided to the client application so that it can perform relevant actions.

add the attribute `cb-persist='uniqueIdentifier'` to add a listener that will listen to 'input' events & store the value property of the element. 

once client application is finished loading, it must call `coldboot.complete()`.
doing this wil detach event listeners, hide the loader, update values for client rendered `cb-persist` based on their unique identifiers.

`coldboot.complete()` will also return an object with the map of all persisted-identifier to value in the `preserve` key & the id provided in `cb-await-id` in the `awaitId` key to indicate which element was clicked.

if an interaction is observed, then the object will have the following form 
```javascript
{
awaitId:'submit',
preserve: { email:'donjoe@example.com'}
}
```

if no interaction is observed, then the object returned would be 
```javascript
{
awaitId : undefined,
preserve: {}
}
``` 

Optionally you can also subscribe to `coldboot.onComplete().then(fn)` if you want to listen to complete on multiple places. When a valid element is present, it resolves with value -
```javascript
{
awaitId:'submit',
preserve: { email:'donjoe@example.com'}
}
```

coldboot.onComplete is resolved after coldboot.complete() is called.