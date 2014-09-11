var EventEmitter = require('events');
var Module = require('module');
var CONF = require('config');


var logCallback = function() {
  console.log.apply(console, arguments);
};

function logConsole(method, module) {
  method = method.toUpperCase();

  var logLevel = CONF.log.customlevels;

  if (logLevel && (method in logLevel) && !logLevel[method]) {
    return;
  }

  var args = [(new Date()).toJSON(), method];
  var index = 1;

  if (module instanceof Module) {
    args.push(module.id);
    index = 2;
  }

  args.push.apply(args, Array.prototype.slice.call(arguments, index));

  logCallback.apply(null, args);
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
};
