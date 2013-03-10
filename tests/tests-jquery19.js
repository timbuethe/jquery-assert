//
// test monkey patched jQuery 1.9 functions
// ========================================

(function($) {

module("jquery19")

test("addBack", function() {
  ok($('#element03').nextAll().addBack().length === 2)
  ok($('#element03').nextAll().addBack(2).length === 2)

//  raises(function(){
//    $('#element04').addBack('.doesNotExist', 2)
//  })
})

})( jQuery );