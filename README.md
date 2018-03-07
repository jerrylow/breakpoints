# Breakpoints

## What is this?

Breakpoints is a light weight jQuery library to detect and manage breakpoint changes. Breakpoint was originally written to optimize large single page sites with too many binds on `resize` causing performance issues. While still achieving the previous goal it has also been re-written to assist with general breakpoint management.

## How to use

Include breakpoints library after jQuery, then initialize globally or on any page you want to use breakpoints.

```js
$(document).ready(function() {
  $(window).breakpoints();
});
```

Bind to `$(window).on("breakpoint-change");` and trigger actions based on changes.

## Examples

### Listening for Breakpoint Changes

Breakpoints will trigger `breakpoint-change` when the viewport enters a new breakpoint. The returned event will include a `from` and `to` indicating the new breakpoint.

```js
// Basic Bind
$(window).bind("breakpoint-change", function(event) {
  console.log(event.from, event.to);
});

// Example Usage
$(window).bind("breakpoint-change", function(event) {
  if (event.to === "md") {
    ...
  }
});
```

### Use Namespacing

Using namespaces will allow unbinding of specific `breakpoint-change` if necessary.

```js
$(window).bind("breakpoint-change.megamenu", function(event) {
  // Will get unbinded
});

$(window).bind("breakpoint-change.footer", function(event) {
  // Won"t get unbinded
});

$(window).unbind("breakpoint-change.megamenu");
```

### Specific Breakpoints

Checking against the current breakpoint and if it matches the criteria execute the callback function. This method is **not** constantly listening for changes until the viewport hits the criteria see _Constant Check Example_ below. See comparing methods for all available options.

```js
// Basic Example
$(window).breakpoints("lessThan", "md", function() {
  // If viewport is less than 992px do something here.
});

// Constant Check Example
$(window).bind("breakpoint-change", function(event) {
  $(window).breakpoints("lessThan", "md", function() {
    ...
  });
});

// Usage Example
$("button").click(function() {
  $(window).breakpoints("lessThan", "sm", function() {
    // Use a modal
  });

  $(window).breakpoints("greaterEqualTo", "md", function() {
    // Do something else
  });
});
```

### Realistic Examples

Use cases where the two m

## Options

### breakpoints

`array` `default:`
```json
[
  {
    "name": "xs",
    "width": 0
  }, {
    "name": "sm",
    "width": 768
  }, {
    "name": "md",
    "width": 992
  }, {
    "name": "lg",
    "width": 1200
  }
]
```

These are the breakpoints to monitor. The default set is aligned with Bootstraps grid system. The width pertains to the lower limit. For example `992px` represents the beginning of `md` until it gets to `1200px`.

### buffer

`integer` `default: 300`

A buffer is set before breakpoints trigger `breakpoint-change`. The buffer keeps resizing more performant by not triggering actions prematurely.

these

## Methods

### getBreakPoint

Return the current breakpoint name

```js
$(window).breakpoints("getBreakpoint");
```

### getBreakpointWidth

Return the current breakpoint width given the break point name.

```js
$(window).breakpoints("getBreakpointWidth", [breakpoint name]);
```

### destroy

This will stop ALL breakpoints from listening for changes. Look at the examples

```js
$(window).breakpoints("destroy");
```

## Comparing Methods

### lessThan

Returns true if the current viewport is less than the breakpoint.

```js
$(window).breakpoints("lessThan", [breakpoint name], [callback]);
```

### lessEqualTo

Returns true if the current viewport is less but also equal to the breakpoint value.

```js
$(window).breakpoints("lessEqualTo", [breakpoint name], [callback]);
```

### greaterThan

Returns true if the current viewport is greater than the breakpoint.

```js
$(window).breakpoints("greaterThan", [breakpoint name], [callback]);
```

### greaterEqualTo

Returns true if the current viewport is greater but also equal to the breakpoint.

```js
$(window).breakpoints("greaterEqualTo", [breakpoint name], [callback]);
```

### inside

Returns true if the current viewport is within the breakpoint and its lower limits. With the default breakpoints: If the current viewport width is `900px` this would be true for `sm`. This will return true for the last (largest) breakpoint while the viewport width is greater than its value.

```js
$(window).breakpoints("inside", [breakpoint name], [callback]);
```
