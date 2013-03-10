//
// test jQuery assert functions
// ============================

module("noconflict")

test("assertFound", function() {
  ok($noConflict('#doesNotExist').assertFound(0).length === 0)
  ok($noConflict('#element01').assertFound(1).length === 1)
  ok($noConflict('.foo').assertFound(2).length === 2)
  ok($noConflict('#element04 > p').assertFound(3).length === 3)

  raises(function(){
    $noConflict('#doesNotExist').assertFound(1)
  })
})

test("$", function() {
  // jQuery(selector)
  ok($noConflict('#element03', 1).hasClass('foo'))
  ok($noConflict('#element04').hasClass('bar'))
  ok($noConflict('#element04', 1).hasClass('bar'))
})



