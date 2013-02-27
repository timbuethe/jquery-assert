jquery-assert
=============

jQuery assert, let's you add assertions, to make sure your selectors match the expected number of elements.

Make sure, one or more elements were found, before calling the next function: 
```javascript
$('#element01').assertFound().val('x')
```

Make sure a given number of elements were found before calling further functions:
```javascript
$('.item').assertFound(10).find('p').assertFound(10).data(...)
```

If an assertion isn't fullfilled, an exception gets thrown. So, if your code breaks, due to changes in the HTML for example, you will at least notice it. 
When used consequently jQuery assert will solidify and tighten your code. 
