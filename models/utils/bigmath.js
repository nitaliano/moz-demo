var bigInt = require('big-integer');

module.exports = {
  add: function (vals) {
    var i, num = bigInt(0);

    for (i = 0; i < vals.length; i++) {
      num.add(vals[i]);
    }

    return num;
  }
};