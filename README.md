# su-logger

su-logger adds a few event listeners to a node `process` — which is an `EventEmitter` — allowing you emit logging events; as well as supplying a callback function for custom processing of events broadcasted.

only one event listener is added per `process`, which means you can write individual modules which `require('su-logger')` and emit logging events without having to worry about multiple event listeners being added and callbacks firing more than once.

allowing you to supply a custom callback means, you can then apply whatever logging code you want to at the top level of your application.

## usage

``` javascript

    // use generic `console.log`;
    require('su-logger')();

    // use custom logging callback;
    require('su-logger')(function() {
      // ... do stuff with `arguments`
    });

    // in your code
    process.emit('app:log', module, arg_1, ..., arg_N);
    process.emit('app:debug', module, arg_1, ..., arg_N);
    process.emit('app:error', module, arg_1, ..., arg_N);
    process.emit('app:info', module, arg_1, ..., arg_N);
    process.emit('app:warn', module, arg_1, ..., arg_N);


    process.emit('app:time', module);
    // do something asynchronous
    process.emit('app:timeend', module);

```
