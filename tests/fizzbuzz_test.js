// Goal: In `app/fizzbuzz.js`, export a function that takes 2 argument - a print function and an integer number to count up to. Your exported function should call this function for all numbers from 1 to the count argument passed in. But for multiples of three call it with “Fizz” instead of the number and for the multiples of five call it with “Buzz”. For numbers which are multiples of both three and five call it with “FizzBuzz”.
// Requirements: Make all of these tests pass.
// To run: node_modules/.bin/mocha -w tests/fizzbuzz_test.js

var assert = require('chai').assert,
    sinon = require('sinon'),
    _ = require('lodash'),
    fizzbuzz;

describe('fizzbuzz', function() {
  before(function() {
    try {
      fizzbuzz = require('../app/fizzbuzz.js');
    } catch(e) {}
  });

  it('Make sure to export a function using `module.exports`. @export', function() {
    assert.equal(typeof(fizzbuzz), "function", "Make sure to export a function using `module.exports`.");
  });

  it('Your function should accept 2 argument - the `print` function and a `count` number. @export', function() {
    assert.equal(fizzbuzz.length, 2, "Your function should accept 2 argument - the `print` function and a `count` number.");
  });

  describe('execution', function() {
    it("Your function didn't finish running. Is there an infinite loop? @export", function() {
      try {
        fizzbuzz(function() {}, 0);
      } catch(e) {
        assert(false, "We tried calling your function with a count of `0` and it came back with an error: `"+e.message+"`.");
      }
    });
  });

  describe('results', function() {
    var spy, count = 235;

    beforeEach(function() {
      spy = sinon.spy();
      try {
        fizzbuzz(spy, count);
      } catch(e) {}
    });

    afterEach(function() {
    });

    it("calls `print` @fizzbuzz", function() {
      assert(spy.called, "Make sure to call the passed in `print` in your function to print the results.");
    });

    describe('first 5', function() {
      it("starts off right @fizzbuzz", function() {
        var first = spy.firstCall.args[0],
            second = spy.secondCall;
        assert.equal(+first, 1, "Make sure the 1st call to `console.log` is `1`. The 1st call from your `fizzBuzz` function was with the argument: `"+first+"`.");
        assert(second, "We couldn't find a second call to the print function.");
        assert.equal(+second.args[0], 2, "Make sure the 2nd call to `console.log` is `2`. The 2nd call from your `fizzBuzz` function was with the argument: `"+second.args[0]+"`.");
      });
      it("uses fizz @fizzbuzz", function() {
        var third = spy.getCall(2)
        assert(third, "We couldn't find a third call to the print function.");
        assert.equal(third.args[0], "Fizz", "The 3rd call to `print` should pass in `Fizz`, but your 3rd call passed the argument: `"+third.args[0]+"`.");
      });
      it("goes back to numbers @fizzbuzz", function() {
        var fourth = spy.getCall(3);
        assert(fourth, "We couldn't find a fourth call to the print function.");
        assert.equal(fourth.args[0], 4, "The 4th call to `print` should pass in `4`, but your 4th call passed the argument: `"+fourth.args[0]+"`.");
      });
      it("uses buzz @fizzbuzz", function() {
        var fifth = spy.getCall(4);
        assert(fifth, "We couldn't find a fifth call to the print function.");
        assert.equal(fifth.args[0], "Buzz", "The 5th call to `print` should pass in `Buzz`, but your 4th call passed the argument: `"+fifth.args[0]+"`.");
      });
    });

    describe('overall', function() {
      it('calls `print` the correct number of times @fizzbuzz', function() {
        assert.equal(spy.callCount, count, "Make sure to call `print` exactly as many times as the `count`. Your function calls it `"+spy.callCount+"` times, when we expected it to be called "+count+" times.");
      });

      it('prints the correct thing for each iteraction @fizzbuzz', function() {
        var spyCall, spyCallArg, expected;
        for(var i=1; i<=count; i++) {
          spyCall = spy.getCall(i-1);
          assert(spyCall, "We ran into an error getting call number "+i+". Make sure you are calling `print` the passed in number of times.");

          spyCallArg = spyCall.args[0];

          if((i%3 == 0) && (i%5 == 0)) {
            expected = "FizzBuzz";
          } else if(i%5 == 0) {
            expected = "Buzz";
          } else if(i%3 == 0) {
            expected = "Fizz"
          } else {
            expected = i;
          }

          assert.equal(spyCallArg, expected, "Looks like for call number `"+i+"`, we expected your code to call `print` with `"+expected+"`, but it called `print` with `"+spyCallArg+"`.");
        }
      });
    });
  });
});
