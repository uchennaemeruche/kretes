const CORS = require('./cors');
const Serve = require('./serve');
const Security = require('./security');
const Routing = require('./routing');

class Base extends Array {
  async next(context, last, current, done, called, func) {
    if ((done = current > this.length)) return;

    func = this[current] || last;

    return (
      func &&
      func(context, async () => {
        if (called) throw new Error('next() already called');
        called = true;
        return this.next(context, last, current + 1);
      })
    );
  }

  async compose(context, last) {
    return this.next(context, last, 0);
  }
}

module.exports = {
  Base,
  Routing,
  CORS,
  Serve,
  Security,
};
