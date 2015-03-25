# su-logger

## usage

``` javascript

    // use generic `console.log`;
    require('su-logger')();

    // use custom logging callback;
    require('su-logger')(function() {
      // ... do stuff with `arguments`
    });

    process.emit('app:log', module, arg_1, ..., arg_N);
    process.emit('app:debug', module, arg_1, ..., arg_N);
    process.emit('app:error', module, arg_1, ..., arg_N);
    process.emit('app:info', module, arg_1, ..., arg_N);
    process.emit('app:warn', module, arg_1, ..., arg_N);


    process.emit('app:time', module);
    // do something asynchronous stuff
    process.emit('app:timeend', module);

```
