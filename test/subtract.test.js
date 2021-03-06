var subtract = require('../').subtract,
  test = require('tap').test,
  fs = require('fs'),
  glob = require('glob');

var REGEN = process.env.REGEN || false;


// Run common test cases
glob.sync(__dirname + '/fixtures/in/common/*.json').forEach(function(input) {
  var name = input.split('/');
  test('subtract -- ' + name[name.length - 1], function (t) {
    var features = JSON.parse(fs.readFileSync(input));
    var output = subtract(features[0], features[1]);
    if (REGEN) {
      fs.writeFileSync(input.replace('/in/common/', '/out/subtract/'), JSON.stringify(output, null, 2));
    }
    t.deepEqual(output, JSON.parse(fs.readFileSync(input.replace('/in/common/', '/out/subtract/'))), input);
    t.end();
  });
});

// Run specific test cases
glob.sync(__dirname + '/fixtures/in/subtract/*.json').forEach(function(input) {
  var name = input.split('/');
  test('subtract -- ' + name[name.length - 1], function (t) {
    var features = JSON.parse(fs.readFileSync(input));
    var output = subtract(features[0], features[1]);
    if (REGEN) {
      fs.writeFileSync(input.replace('/in/', '/out/'), JSON.stringify(output, null, 2));
    }
    t.deepEqual(output, JSON.parse(fs.readFileSync(input.replace('/in/', '/out/'))), input);
    t.end();
  });
});
