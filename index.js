var EventEmitter = require('events');
var Module = require('module');
var path = require('path');
var CONF = require('config');

var cache = new WeakMap;

var logCallback = function() {
  console.log.apply(console, arguments);
};

function logConsole(method, module) {
  method = method.toUpperCase();

  var logLevel = CONF.log ? CONF.log.customlevels : null;

  if (logLevel && (method in logLevel) && !logLevel[method]) {
    return;
  }

  var args = [(new Date()).toJSON(), method];
  var index = 1;

  if (module instanceof Module) {
    args.push(path.relative(process.cwd(),module.id));
    index = 2;
  }

  args.push.apply(args, Array.prototype.slice.call(arguments, index));

  logCallback.apply(null, args);
}

function timeEnd(module) {
  if (!cache.has(module)) {
    return;
  }

  var cached = cache.get(module);
  var time = (Date.now() - cached.start) + 'ms';

  logConsole('app:time', module, time);

  cache.delete(module);
}

function timeStart(module) {
  if (cache.has(module)) {
    return;
  }

  cache.set(module, {
    start : Date.now()
  });
}

module.exports = function init(callback) {
  if (callback && typeof callback === 'function') {
    logCallback = callback;
  }

  ['debug', 'error', 'info', 'log', 'warn'].forEach(function(consoleMethod) {
    var event = 'app:' + consoleMethod;

    if (EventEmitter.listenerCount(process, event) < 1) {
      process.on(event, logConsole.bind(null, consoleMethod));
    }
  });

  if (EventEmitter.listenerCount(process, 'app:time') < 1) {
    process.on('app:time', timeStart);
  }

  if (EventEmitter.listenerCount(process, 'app:timeend') < 1) {
    process.on('app:timeend', timeEnd);
  }
};
