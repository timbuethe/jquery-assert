/*
 * jQuery Selection
 * Version 1.0
 * https://github.com/timbuethe/jquery-assert
 */
;(function( $ ){

  /**
   *
   * @param expectedSize
   */
  $.fn.assertFound = function(expectedSize) {

    // called without arguments ('.assertFound()') asserts an non empty result
    if(expectedSize === undefined && this.length === 0){
      throw "Assertion failed, expected to find elements using selector '" + this.selector + "', but found none.";
    }

    // if an expected size is provided, test against it
    if (this.length != expectedSize) {
      throw "Assertion failed, expected size: " + expectedSize + ", actual size: " + this.length + ", selector: '" + this.selector + "'.";
    }

    return this;
  };

  /**
   * Convenience function for '.assertFound(1)'
   */
  $.fn.assertOne = function() { return this.assertFound(1); };

  /**
   * Convenience function for '.assertFound()'
   */
  $.fn.assertNotEmpty = function() { return this.assertFound(); };

  /**
   * Extended functions accepts the same parameter as the original <a href="http://api.jquery.com/find/">jQuery find</a>,
   * as well as an additional parameter to assert a specific size.
   *
   * TODO what about 'first', 'last', 'offsetParent' ?
   */
  $.each(['add', 'addBack', 'andSelf', 'children', 'closest', 'end', 'eq', 'filter', 'find', 'has', 'map', 'next', 'nextAll', 'nextUntil', 'not',
         'parent', 'parents', 'parentsUntil', 'prev', 'prevAll', 'prevUntil', 'siblings', 'slice'], function(index, value) {
    $.fn[value] = addAssert($.fn[value]);
  });

  function addAssert(superFunction){
    return function(){
      var expectedSize, result, args = [];

      // if the expected size is provided as the last argument, call find
      // and do the assertion afterwards.
      if(typeof arguments[arguments.length-1] === 'number'){

        // convert arguments to an ordinary array
        args = Array.prototype.slice.call(arguments);

        expectedSize = args.pop();
        result = superFunction.apply(this, args);
        result.assertFound(expectedSize);
        return result;
      }

      // else, just delegate to super
      return superFunction.apply(this, arguments);
    }
  }

})( jQuery );