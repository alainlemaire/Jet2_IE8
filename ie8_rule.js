Rule

function (session, cb) {
  var waitForWindowVars = function (time) {
    var $ = window.jQuery;
    var qubit = window.__qubit
    var qubitReady = qubit && qubit.uv && qubit.uv.emit

    if ($ && qubitReady) {
      cb();
    } else {
      setTimeout(function () {
        waitForWindowVars(time * 2);
      }, time);
    }
  };

  waitForWindowVars(50);
}