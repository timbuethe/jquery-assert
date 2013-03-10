/*
 * jQuery assert
 * Version 1.2.0
 * https://github.com/timbuethe/jquery-assert
 */
;(function( $, undefined ){

  /**
   * List of jquery function names that get monkey patched.
   *
   * TODO what about 'first', 'last', 'offsetParent' ?
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
  var settings, previousSettings = {};

  var rootjQuery = jQuery(document);

  /**
   * @param [options]
   */
  $.assert = function (options){

    settings = $.extend({
      'enabled': true,
      'extend-jquery': false,
      'debug': false
    }, options);

    /**
     * @private
     */
    function _log(){
      if(settings.debug){
        console.log.apply(console, arguments);
      }
    }

    _log('init assert ... (options: ', options, ')')

    /**
     * @param {Number} [expectedSize]
     */
    $.fn.assertFound = function(expectedSize) {

      var message;

      if(settings.enabled === false){
        return this;
      }

      // called without arguments ('.assertFound()') asserts an non empty result
      if(expectedSize === undefined && this.length === 0){
        message = "Assertion failed, expected to find elements using selector '" + this.selector + "', but found none."
        _log(message)
        throw message;
      }

      // if an expected size is provided, test against it
      if (expectedSize !== undefined && this.length !== expectedSize) {
        message = "Assertion failed, expected size: " + expectedSize + ", actual size: " + this.length + ", selector: '" + this.selector + "'.";
        _log(message)
        throw message;
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

    //
    // do or revert monkey patching of jquery's functions
    if(settings['extend-jquery'] !== previousSettings['extend-jquery']){

      _log("option 'extend-jquery' has changed")

      // patch 'em
      if(settings['extend-jquery'] === true){
        _log("exenting jQuery functions ...")

        // patch core jQuery function, call extend to copy all the properties
        originalFunctions['jQuery'] = jQuery
        assignJQueryVariables(jQuery.extend(extendedJQuery, jQuery))

        // everything else
        $.each(jqueryFunctions, function(index, value) {
          _log(index + ": " + value)
          originalFunctions[value] = $.fn[value]
          $.fn[value] = addAssert($.fn[value], value)
        });

        _log("exenting jQuery functions done.")
      }

      // restore original jquery functions
      else {
        _log("restore original jQuery functions ...")

        // core jQuery function
        if(originalFunctions['jQuery']){
          assignJQueryVariables(originalFunctions['jQuery'])
        }

        // everything else
        $.each(originalFunctions, function(name, func) {
          _log('restore ' + name)
          $.fn[name] = func;
        });

        _log("restore original jQuery functions done.")
      }
    }

    /**
     *
     * @param newJQuery
     */
    function assignJQueryVariables(newJQuery){
      window.jQuery = newJQuery

      if(window.$ === window.jQuery){
        window.$ = window.jQuery
      }
    }

    /**
     * Extension for jQuery's core function. Additional argument 'expectedSize'
     * can be provided to assert the number of matched elements.
     *
     * e.g.
     *  $('.foo', 5)
     *
     * @param selector
     * @param [context]
     * @param {Number} [expectedSize]
     * @return {jQuery.fn.init}
     */
    function extendedJQuery(selector, context, expectedSize) {

      var result;

      _log('extended jQuery called')

      // if the expected size is provided as the last argument, call find
      // and do the assertion afterwards.
      if(typeof arguments[arguments.length-1] === 'number'){

        // expected size maybe on 2nd or 3rd position
        expectedSize = arguments[arguments.length-1];

        // if only two arguments were provided, the second is expectedSize, not context
        if(arguments.length === 2){
          context = undefined
        }

        result = new jQuery.fn.init(selector, context, rootjQuery);
        result.assertFound(expectedSize);
        return result;
      }

      return new jQuery.fn.init(selector, context, rootjQuery);
    }

    /**
     * Extended functions accepts the same parameter as the original,
     * as well as an additional parameter to assert a specific size using assertFound.
     *
     * @param {Function} superFunction
     * @param {String} [name]
     * @return {Function}
     */
    function addAssert(superFunction, name){
      return function(){
        var expectedSize, result, args = [];

        _log('extended', name, 'called')

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
    _log('init assert done.')

    // return jQuery, useful to asign it to a variable in noConflict mode
    return window.jQuery
  }; // assert(options)

  // call init here so the user doesn't have to. If the user calls it anyway, e.g. to change/set
  // options, that should be ok too.
  $.assert();

})( jQuery );