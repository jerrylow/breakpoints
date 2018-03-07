/*
 * jQuery Breakpoints
 * Author: Jerry Low
 * Url: https://www.github.com/jerrylow/breakpoints
 */

(function($) {
  var Breakpoints = function(el, options) {
    /**
     * Public
     **/
    this.settings,
    this.originalBreakpoint

    this.getBreakpoint = function() {
      var windowWidth = $(window).width();
      var breakpoints = this.settings.breakpoints;
      var breakpointName;

      breakpoints.forEach(function(bp) {
        if (windowWidth >= bp.width) {
          breakpointName = bp.name;
        }
      });

      // Fallback to largest breakpoint.
      if (!breakpointName) {
        breakpointName = breakpoints[breakpoints.length - 1].name;
      }

      return breakpointName;
    };

    this.getBreakpointWidth = function(breakpointName) {
      var breakpoints = this.settings.breakpoints;
      var breakpointWidth;

      breakpoints.forEach(function(bp) {
        if (breakpointName == bp.name) {
          breakpointWidth = bp.width;
        }
      });

      return breakpointWidth;
    }

    this.compareCheck = function(check, checkBreakpoint, callback) {
      var windowWidth = $(window).width();
      var breakpoints = this.settings.breakpoints;
      var breakpointWidth = this.getBreakpointWidth(checkBreakpoint);
      var isBreakpoint = false;

      switch (check) {
        case "lessThan":
          isBreakpoint = windowWidth < breakpointWidth;
          break;
        case "lessEqualTo":
          isBreakpoint = windowWidth <= breakpointWidth;
          break;
        case "greaterThan":
          isBreakpoint = windowWidth > breakpointWidth;
          break;
        case "greaterEqualTo":
          isBreakpoint = windowWidth > breakpointWidth;
          break;
        case "inside":
          breakpointIndex = breakpoints.findIndex(function(b) {
            return b.name === checkBreakpoint;
          });

          if (breakpointIndex === breakpoints.lenth - 1) {
            isBreakpoint = windowWidth > breakpointWidth;
          } else {
            nextBreakpointWidth = this.getBreakpointWidth(breakpoints[breakpointIndex + 1].name);
            isBreakpoint = windowWidth >= breakpointWidth && windowWidth < nextBreakpointWidth;
          }
          break;
      }

      if (isBreakpoint) {
        callback();
      }
    }

    this.destroy = function() {
      $(window).unbind("breakpoints");
    }

    /**
     * Private
     **/
    var _resizeCallback = function(scope) {
      var newBreakpoint = scope.getBreakpoint();

      if (newBreakpoint !== scope.originalBreakpoint) {
        $(window).trigger({
          "type" : "breakpoint-change",
          "from" : scope.originalBreakpoint,
          "to" : newBreakpoint
        });

        scope.originalBreakpoint = newBreakpoint;
      }
    };

    /**
     * Initiate
     **/
    var $window = $(window);
    var scope = this;

    // Settings
    var settings = $.extend({}, $.fn.breakpoints.defaults, options);

    this.settings = {
      breakpoints: settings.breakpoints,
      buffer: settings.buffer
    };

    // Store info
    el.data("breakpoints", this);
    this.originalBreakpoint = this.getBreakpoint();

    // Resizing
    var resizeThresholdTimerId;

    if ($.isFunction($(window).on)) {
      $(window).on("resize.breakpoints", function(e) {
        resizeThresholdTimerId && clearTimeout(resizeThresholdTimerId);

        resizeThresholdTimerId = setTimeout(function(e) {
          _resizeCallback(scope);
        }, scope.settings.buffer);
      });
    }
  }

  $.fn.breakpoints = function(method, arg1, arg2) {
    if (this.data("breakpoints")) {
      var thisBreakpoint = this.data("breakpoints");

      if (method === "getBreakpoint") {
        return thisBreakpoint.getBreakpoint();
      } else if (method === "getBreakpointWidth") {
        return thisBreakpoint.getBreakpointWidth(arg1);
      } else if (
        method === "lessThan" ||
        method === "lessEqualTo" ||
        method === "greaterThan" ||
        method === "greaterEqualTo" ||
        method === "inside"
      ) {
        return thisBreakpoint.compareCheck(method, arg1, arg2);
      } else if (method === "destroy") {
        thisBreakpoint.destroy();
      }

      return;
    }

    new Breakpoints(this, method);
  };

  $.fn.breakpoints.defaults = {
    breakpoints: [
      {"name": "xs", "width": 0},
      {"name": "sm", "width": 768},
      {"name" : "md", "width": 992},
      {"name" : "lg", "width": 1200}
    ],
    buffer: 300
  };

})(jQuery);
