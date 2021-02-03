# coldboot.js
A lightweight vanillaJs script to connect server-rendered static HTML to client-rendered application

# Functionality

* show an unhideable loader when certain elements are clicked 
//todo provide this information to client application to invoke the right functionality once loaded
* save user input between static state and interactive state
//todo see if user 'focus' needs to be preserved

# Usage 
//todo npm install

load the coldboot.js script in your page 

```html
<script async src="/node_modules/coldboot/dist/coldboot.min.js" onload="coldboot.init()" type="text/javascript"></script>
```

we expose `coldboot` on window which has 2 methods init & complete.

`coldboot.init` needs to be called to start listening to user events, and takes 2 parameters `customLoaderId,customTextContainerId` these ids determine the element to show and the element where loader text is to be injected.

in markup , we can now add attributes `cb-await='loader text'`  to add a loader with custom text & `cb-persist='uniqueIdentifier'` to add a listener that will listen to 'input' events & store the value property of the element. 

upon client application loading, it must call `coldboot.complete()` to detach event listeners, hide the loader, update values for client rendered `cb-persist` based on their uniqueIdentifiers & return an object with the map of all persisted identifier to values. 

//todo add additional key here to let the client know about the element that invoked loader, if any.

