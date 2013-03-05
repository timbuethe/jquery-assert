
QUnit.testStart(function(details){
  console.log(details.module, details.name)
})

module("assert-functions")

test("test assert found 0", function() {
  $('#doesNotExist').assertFound(0)
  ok(true)
})

test("test assert found 1", function() {
  $('#element01').assertFound(1)
  ok(true)
})

test("test assert single", function() {
  $('#element01').assertOne()
  ok(true)
})

test("test assert found 2", function() {
  $('.foo').assertFound(2)
  ok(true)
})

test("test assert found 3", function() {
  $('#element04 > p').assertFound(3)
  ok(true)
})

test("test failing assertFound", function() {
  raises(function(){
    $('#doesNotExist').assertFound(1)
  })
})

module("assert-options")

test("test enabled option", function() {

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

test("test 'extend-jquery' option", function() {

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

module("jquery-add")

test("test extended add", function() {
  $('#element03').add('#element04', 2)
  ok(true)
})

module("jquery-find")

test("test extended find", function() {
  $('#element04').find('p', 3)
  ok(true)
})

test("test failing extended find", function() {
  raises(function(){
    $('#element04').find('.doesNotExist', 1)
  })
})

test("test find without assertion", function() {
  var $p = $('#element04').find('p')
  ok($p.length === 3)
})

module("jquery-children")

test("test extended children", function() {
  $('#element04').children('p', 3)
  ok(true)
})

test("test failing extended children", function() {
  raises(function(){
    $('#element04').children('.doesNotExist', 1)
  })
})

//module("core/init")
//
//test("test extended core/init", function() {
//  ok($('#element04').hasClass('bar'))
//  ok($('#element04', 1).hasClass('bar'))
//})
