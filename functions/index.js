// SELF-DEFINING FUNCTIONS

let scareMe = function () {
  console.log('Boo!');

  scareMe = function () {
    console.log('Double boo!');
  };
};

// scareMe(); // boo!
// scareMe(); // double boo!

scareMe.props = 'property';

let prank = scareMe;

const spooky = {
  boo: scareMe,
};

// prank(); // Boo!
// cant redifine fn -> variable name is not the same
// prank(); // Boo!
// console.log(prank.props); // property

// spooky.boo(); // boo!
// spooky.boo(); // boo!
// console.log(spooky.boo.props); // property

// console.log(scareMe); // f () { console.log('Double boo!') }

// IMMEDIATE FUNCTION INVOCATION

// with params

(function (who, when) {
  console.log(`Who? ${who} When? ${when}`);
})('Me', new Date());

// returned values

const result1 = (function () {
  return 2 + 2;
})();

const getResult = (function () {
  const result = 2 + 2;
  return function () {
    return result;
  };
})();

// defining object properties

const object = {
  message: (function () {
    const who = 'me',
      what = 'call';

    return `${what} ${who}`;
  })(),
  getMessage: function () {
    return this.message;
  },
};

// IMMEDIATE OBJECT INITIALIZATION

({
  maxwidth: 600,
  maxheight: 400,

  gimmeMax: function () {
    return `${this.maxwidth}x${this.maxheight}`;
  },

  init: function () {
    console.log(this.gimmeMax());
  },
}.init());

// INIT-TIME BRANCHING - sniff certain behavior only once to define the way your script works

// example
// before: conditions are always checked - not as efficient

const utils1 = {
  addListener: function (el, type, fn) {
    if (typeof window.addEventListener === 'function') {
      el.addEventListener(type, fn, false);
    } else if (typeof document.attachEvent === 'function') {
      // IE
      el.attachEvent('on' + type, fn);
    } else {
      el['on' + type] = fn;
    }
  },

  removeListener: function (el, type, fn) {
    // the same code
  },
};

// after:
// the interface

const utils2 = {
  addListener: null,
  removeListener: null,
};

if (typeof window.addEventListener === 'function') {
  utils2.addListener = function (el, type, fn) {
    el.addEventListener(type, fn, false);
  };
  utils2.removeListener = function (el, type, fn) {
    el.removeEventListener(type, fn, false);
  };
} else if (typeof document.attachEvent === 'function') {
  utils2.addListener = function (el, type, fn) {
    el.attachEvent('on' + type, fn);
  };
  utils2.removeListener = function (el, type, fn) {
    el.detachEvent('on' + type, fn);
  };
} else {
  utils2.addListener = function (el, type, fn) {
    el['on' + type] = fn;
  };
  utils2.removeListener = function (el, type, fn) {
    el['on' + type] = null;
  };
}

// FUNCTION PROPERTIES -> MEMOIZATION PATTERN
// for exprensive computing operations

const memoFn = function (param) {
  if (!memoFn.cache[param]) {
    const result = {};
    // expensive operation
    memoFn.cache[param] = result;
  }

  return memoFn.cache[param];
};

memoFn.cache = {};

// if parameter is more complex we can serialize it

const memoFnWithSerializer = function () {
  const cacheKey = JSON.stringify(Array.prototype.slice.call(arguments));
  let res;

  if (!memoFnWithSerializer.cache[cacheKey]) {
    res = {};

    for (let i = 0; i < 10; i += 1) {
      res[i] = i * 5;
    }

    memoFnWithSerializer.cache[cacheKey] = res;
  }

  return memoFnWithSerializer.cache[cacheKey];
};

// CURRYING

function add(x, y) {
  if (typeof y === 'undefined') {
    return function (y) {
      return x + y;
    };
  }

  return x + y;
}

const newadd = add(3);
newadd(5);

// general purpose currying example
function schonfunkelize(fn) {
  const slice = Array.prototype.slise;
  const storedArgs = slice.call(arguments, 1);

  return function () {
    const newArgs = slice.call(arguments);
    const args = storedArgs.concat(newArgs);

    return fn.apply(null, args);
  };
}
