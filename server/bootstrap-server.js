var fs = require('fs');

require.extensions['.gql'] = function (module, filename) {
    module.exports = fs.readFileSync(filename, 'utf8');
};

require('babel-register')({
  presets: [ 'es2015' ]
});

require('./app');