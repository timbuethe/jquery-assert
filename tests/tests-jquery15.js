//
// test monkey patched jQuery 1.5 functions
// ========================================

(function($) {

module("jquery15")

test("$", function() {

  // jQuery(selector)
  ok($('#element03', 1).hasClass('foo'))
  ok($('#element04').hasClass('bar'))
  ok($('#element04', 1).hasClass('bar'))

  raises(function(){
    $('#element03', 99)
  })

  raises(function(){
    $('.doesNotExist', 1)
  })

  // jQuery(selector, context)
  var $testData = $('#test-data')
  ok($('#element03', $testData, 1).hasClass('foo'))
  ok($('#element04', $testData).hasClass('bar'))
  ok($('#element04', $testData, 1).hasClass('bar'))

  raises(function(){
    $('#element03', $testData, 99)
  })

  raises(function(){
    $('.doesNotExist', $testData, 1)
  })

  // jQuery( html [, ownerDocument ] )
  // jQuery( html, attributes )
  // jQuery( callback )
})

test("add", function() {
  ok($('#element03').add('#element04').length === 2)
  ok($('#element03').add('#element04', 2).length === 2)
  ok($('#element04').add('.doesNotExist').length === 1)
  ok($('#element04').add('.doesNotExist', 1).length === 1)

  raises(function(){
    $('#element04').add('.doesNotExist', 2)
  })
})

test("andSelf", function() {
  ok($('#element04').find('p').andSelf().length === 4)
  ok($('#element04').find('p').andSelf(4).length === 4)
  ok($('#element04').find('.doesNotExist').andSelf(1).length === 1)

  raises(function(){
    $('#element04').find('p').andSelf(99)
  })
})

test("children", function() {
  ok($('#element04').children('p', 3).length === 3)

  raises(function(){
    $('#element04').children('.doesNotExist', 1)
  })
})

test("closest", function() {
  ok($('#element04').closest('div').length === 1)
  ok($('#element04').closest('div', 1).length === 1)
  ok($('#element04').closest('img').length === 0)
  ok($('#element04').closest('img', 0).length === 0)

  raises(function(){
    $('#element04').closest('div', 99)
  })
})

test("end", function() {
  ok($('#element04').find('p').end().length === 1)
  ok($('#element04').find('p').end(1).length === 1)

  raises(function(){
    $('#element04').find('p').end(99)
  })
})

// TODO 'eq', 'filter'

test("find", function() {
  ok($('#element04').find('p').length === 3)
  ok($('#element04').find('p', 3).length === 3)

  raises(function(){
    $('#element04').find('.doesNotExist', 1)
  })
})

test("has", function() {
  ok($('#element04').has('p').length === 1)
  ok($('#element04').has('p', 1).length === 1)
  ok($('#element04').has('.doesNotExist', 0).length === 0)

  raises(function(){
    $('#element04').has('.doesNotExist', 1)
  })
})

// TODO 'map'
// TODO 'next', 'nextAll', 'nextUntil', 'not', 'parent', 'parents', 'parentsUntil', 'prev', 'prevAll', 'prevUntil', 'siblings', 'slice'

})( jQuery );

