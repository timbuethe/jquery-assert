//
// test jQuery assert functions
// ============================

(function($) {

  module("functions")

  test("assertFound", function() {
    ok($('#doesNotExist').assertFound(0).length === 0)
    ok($('#element01').assertFound(1).length === 1)
    ok($('.foo').assertFound(2).length === 2)
    ok($('#element04 > p').assertFound(3).length === 3)

    raises(function(){
      $('#doesNotExist').assertFound(1)
    })
  })

  test("assertOne", function() {
    ok($('#element01').assertOne().length === 1)

    raises(function(){
      $('#doesNotExist').assertOne()
    })
  })

  test("assertNotEmpty", function() {
    ok($('#element01').assertNotEmpty().length > 0)

    raises(function(){
      $('#doesNotExist').assertNotEmpty()
    })
  })

//
// test jQuery assert options
// ==========================

  module("options")

  test("enabled", function() {

    // enabled
    $.assert({enabled: false})
    $('#doesNotExist').assertFound(1)
    ok(true)

    // disabled
    $.assert({enabled: true})
    raises(function(){
      $('#doesNotExist').assertFound(1)
    })
  })

  test("extend-jquery", function() {

    // extension disabled
    $.assert({'extend-jquery': false})
    ok($('#element03').find('.doesNotExist', 999).length === 0)  // expected number should be ignored

    // extension enabled
    $.assert({'extend-jquery': true})
    ok($('#element04').find('.doesNotExist', 0).length === 0)
    raises(function(){
      $('#element04').find('.doesNotExist', 999)
    })
  })

})( jQuery );