module("basic");

test("test assert found 0", function() {
  $('#doesNotExist').assertFound(0);
  ok(true);
});

test("test assert found 1", function() {
  $('#element01').assertFound(1);
  ok(true);
});

test("test assert single", function() {
  $('#element01').assertOne();
  ok(true);
});

test("test assert found 2", function() {
  $('.foo').assertFound(2);
  ok(true);
});

test("test assert found 3", function() {
  $('#element04 > p').assertFound(3);
  ok(true);
});

test("test failing assertFound", function() {
  raises(function(){
    $('#doesNotExist').assertFound(1);
  });
});

module("add");

test("test extended add", function() {
  $('#element03').add('#element04', 2);
  ok(true);
});

module("find");

test("test extended find", function() {
  $('#element04').find('p', 3);
  ok(true);
});

test("test failing extended find", function() {
  raises(function(){
    $('#element04').find('.doesNotExist', 1);
  });
});

test("test find without assertion", function() {
  var $p = $('#element04').find('p');
  ok($p.length === 3);
});

module("children");

test("test extended children", function() {
  $('#element04').children('p', 3);
  ok(true);
});

test("test failing extended children", function() {
  raises(function(){
    $('#element04').children('.doesNotExist', 1);
  });
});

