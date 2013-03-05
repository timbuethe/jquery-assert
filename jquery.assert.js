/*
 * jQuery assert
 * Version 1.1
 * https://github.com/timbuethe/jquery-assert
 */
;(function( $, undefined ){

  /**
   * List of jquery function names that get monkey patched.
   *
   * TODO what about 'first', 'last', 'offsetParent' ?
   * TODO add overload core/init function
   *
   * @type {Array}
   */
  var jqueryFunctions = ['add', 'addBack', 'andSelf', 'children', 'closest', 'end', 'eq', 'filter', 'find', 'has', 'map',
    'next', 'nextAll', 'nextUntil', 'not', 'parent', 'parents', 'parentsUntil', 'prev', 'prevAll', 'prevUntil', 'siblings', 'slice'];

  /**
   * When patched, the original jquery functions get saved here, to restore them later on.
   */
  var originalFunctions = {};

  /**
   *  Save previous settings to detect changes.
   */
  var previousSettings = {};

  $.assert = function (options){

    console.log('init assert ... (options: ', options, ')')

    var settings = $.extend({
      'enabled': true,
      'extend-jquery': false
    }, options);

    /**
     *
     * @param [expectedSize]
     */
    $.fn.assertFound = function(expectedSize) {

      if(settings.enabled === false){
        return this;
      }

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

    // do or revert monkey patching of jquery's functions
    if(settings['extend-jquery'] !== previousSettings['extend-jquery']){

      console.log("option 'extend-jquery' has changed")

      // patch 'em
      if(settings['extend-jquery'] === true){
        console.log("exenting jQuery functions ...")
        $.each(jqueryFunctions, function(index, value) {
          console.log(index + ": " + value)
          originalFunctions[value] = $.fn[value]
          $.fn[value] = addAssert($.fn[value])
        });
        console.log("exenting jQuery functions done. (", originalFunctions.length, ")")
      }

      // restore original jquery functions
      else {
        console.log("restore original jQuery functions ... (", originalFunctions.length, ")")
        $.each(originalFunctions, function(name, func) {
          console.log('restore ' + name)
          $.fn[name] = func;
        });
        console.log("restore original jQuery functions done.")
      }
    }

    /**
     * Extended functions accepts the same parameter as the original,
     * as well as an additional parameter to assert a specific size using assertFound.
     *
     * @param superFunction
     * @return {Function}
     */
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

    previousSettings = settings;
    console.log('init assert done.')
  };

  // call init here so the user doesn't have to. If the user calls it anyway, e.g. to change/set
  // options, that should be ok too.
  $.assert();

})( jQuery );