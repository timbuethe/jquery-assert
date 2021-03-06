jquery-assert
=============

jQuery assert, let's you add assertions to your jQuery code, to make sure your selectors find elements or match an expected number of elements. Here are some examples:

Make sure, one or more elements were found, before calling the next function: 
```javascript
$('#element01').assertFound().val('x')
```

Assert that 1 element was selected:
```javascript
$('#element01').assertOne(); // same as assertFound(1)
```

Make sure a given number of elements were found before calling further functions:
```javascript
$('.item').assertFound(10).find('p').assertFound(10).data(...)
```

For more examples take a look at the [unit tests](https://github.com/timbuethe/jquery-assert/blob/master/tests/tests.js)

To use jQuery assert, include after jQuery and you good to go:
```html
<script src="http://code.jquery.com/jquery-latest.min.js"></script>
<script src="jquery.assert.js"></script>
```

If an assertion isn't fullfilled, an exception gets thrown. So, if your code breaks, due to changes in the HTML for example, you will at least notice it. 
When used consequently jQuery assert will solidify and tighten your code. 


Options
-------------

You can set options like this:
```javascript
$.assert({option: 'value'})
```

 * __enabled__ (boolean, default: true) can be used to enable and disable assertions. This might be useful to disable assertions in production.
 * __extend-jquery__ (boolean, default: false) If enabled, jQuery-assert will extend (monkey patch) the original jQuery function, see blow.
 * __debug__ (boolean, default: false) If enabled, jQuery assert will log debug messages to ```console.log```


Extended jQuery functions
-------------

jQuery assert does not only add its own functions (like assertFound) but patches jQuery's built in functions as well. This functionality is disabled by default
and users must opt-in to use it by setting 'extend-jquery' to true. Afterwards applicable functions take an extra parameter, the number of expected elements,
execute the original function and assert the number of elements. Here are some examples:

```html
 <script src="http://code.jquery.com/jquery-1.9.1.min.js"></script>
 <script src="jquery.assert.js"></script>
 <script>

    // enable assertions as well as jQuery extension
    $.assert({enabled: true, 'extend-jquery': true})

    // select an element by id and make sure it was found.
    // then use extended find and expect to find three elements
    $('#element04', 1).find('p', 3)
 </script>
```

The following jQuery function are monkey patched (if activated) and take an additional parameter, the number of expected elements.

 * jQuery
 * add
 * addBack
 * andSelf
 * children
 * closest
 * end
 * eq
 * filter
 * find
 * has
 * map
 * next
 * nextAll
 * nextUntil
 * not
 * parent
 * parents
 * parentsUntil
 * prev
 * prevAll
 * prevUntil
 * siblings
 * slice

For more examples take a look at the [unit tests](https://github.com/timbuethe/jquery-assert/blob/master/tests/tests.js)
