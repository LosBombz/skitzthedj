// Reference here: http://benalman.com/talks/unit-testing-qunit.html

$(function(){

	// module() groups the tests following into different modules for better test suite structure
	
	// test() constructs a test case
	// first argument is a string for the test name
	// last argument is a callback that contains the assertions
	
	// expect() tells qunit how many assertions it expects to fire, so you can be sure all callbacks run
	// A shortcut is to pass the expect() as a 2nd param to test() or asyncTest()
	// Get in the habit of doing this!
	
	// the last argument in each assertion is a string to be displayed as the test name
	
	module('ok module');
	// ok() - A boolean assertion that passes if the first argument is truthy.
	test("ok", 3, function() {
		ok(true,  "passes because true is true");
		ok(1,     "passes because 1 is truthy");
		ok("",    "fails because empty string is not truthy");
	});

	module('equal/notEqual module');
	// equal() - A comparison assertion that passes if first argument == second argument.
	test("equal", 3, function() {
		var actual = 5 - 4;

		equal(actual, 1,     "passes because 1 == 1");
		equal(actual, true,  "passes because 1 == true");
		equal(actual, false, "fails because 1 != false");
	});
	
	// notEqual() - A comparison assertion that passes if first argument != second argument.
	test("notEqual", 3, function() {
		var actual = 5 - 4;

		notEqual(actual, 0,     "passes because 1 != 0");
		notEqual(actual, false, "passes because 1 != false");
		notEqual(actual, true,  "fails because 1 == true");
	});
	
	module("strictEqual/notStrictEqual module");
	// strictEqual() - A comparison assertion that passes if first argument === second argument.
	test("strictEqual", 3, function() {
		var actual = 5 - 4;

		strictEqual(actual, 1,     "passes because 1 === 1");
		strictEqual(actual, true,  "fails because 1 !== true");
		strictEqual(actual, false, "fails because 1 !== false");
	});
	
	// notStrictEqual() - A comparison assertion that passes if actual !== expected.
	test("notStrictEqual", 3, function() {
		var actual = 5 - 4;

		notStrictEqual(actual, 1,     "fails because 1 === 1");
		notStrictEqual(actual, true,  "passes because 1 !== true");
		notStrictEqual(actual, false, "passes because 1 !== false");
	});
	
	module('deepEqual/notDeepEqual module');
	// deepEqual() - Recursive comparison assertion, working on primitives, arrays and objects, using ===.
	test("deepEqual", 7, function() {
		var actual = {a: 1};

		equal(    actual, {a: 1},   "fails because objects are different");
		deepEqual(actual, {a: 1},   "passes because objects are equivalent");
		deepEqual(actual, {a: "1"}, "fails because '1' !== 1");

		var a = $("body > *");
		var b = $("body").children();

		equal(    a,       b,       "fails because jQuery objects are different");
		deepEqual(a,       b,       "fails because jQuery objects are not equivalent");
		equal(    a.get(), b.get(), "fails because element arrays are different");
		deepEqual(a.get(), b.get(), "passes because element arrays are equivalent");
	});
	
	// notDeepEqual() - Recursive comparison assertion. The result of deepEqual, inverted.
	test("notDeepEqual", 3, function() {
		var actual = {a: 1};

		notEqual(    actual, {a: 1},   "passes because objects are different");
		notDeepEqual(actual, {a: 1},   "fails because objects are equivalent");
		notDeepEqual(actual, {a: "1"}, "passes because '1' !== 1");
	});

	module("raises module");
	// raises() - Assertion to test if a callback throws an exception when run.
	test("raises", 3, function() {
		raises(function() {
			throw new Error("Look ma, I'm an error!");
		}, "passes because an error is thrown inside the callback");

		raises(function() {
			x // ReferenceError: x is not defined
		}, "passes because an error is thrown inside the callback");

		raises(function() {
			var a = 1;
		}, "fails because no error is thrown inside the callback");
	});
	
	module('asynchronous module');
	// You must tell QUnit to wait for an asynchronous action to complete.
	test("stop & start", function() {
		expect(1);

		var actual = false;

		stop();
		setTimeout(function() {
			ok(actual, "this test actually runs, and fails");
			start();
		}, 1000);
	});

	// Another way to tell QUnit to wait for an asynchronous action to complete.
	asyncTest("asyncTest & start", function() {
		expect(1);

		var actual = false;

		setTimeout(function() {
			ok(actual, "this test actually runs, and fails");
			start();
		}, 1000);
	});

	test("stops & starts", function() {
		expect(4);

		var url = "http://jsfiddle.net/echo/jsonp/?callback=?";

		stop();
		$.getJSON(url, {a: 1}, function(data) {
			ok(data, "data is returned from the server");
			equal(data.a, "1", "the value of data.a should be 1");
			start();
		});

		stop();
		$.getJSON(url, {b: 2}, function(data) {
			ok(data, "data is returned from the server");
			equal(data.b, "2", "the value of data.b should be 2");
			start();
		});
	});
	
	module('mocking AJAX');
	// If you mock your AJAX Requests, you test your JavaScript, not your server.
	
	// Simulate your API.	 
	$.mockAjax("json", {
		"/user": {status: -1},
		"/user/(\\d+)": function(matches) {
			return {status: 1, user: "sample user " + matches[1]};
		}
	});

	// Unit tests.
	test("user tests", function() {
		expect(5);

		stop();
		$.getJSON("/user", function(data) {
			ok(data, "data is returned from the server");
			equal(data.status, "-1", "no user specified, status should be -1");
			start();
		});
		stop();
		$.getJSON("/user/123", function(data) {
			ok(data, "data is returned from the server");
			equal(data.status, "1", "user found, status should be 1");
			equal(data.user, "sample user 123", "user found, id should be 123");
			start();
		});
	});
});