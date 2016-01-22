var path = require('path');

module.exports = function(req) {
  if (req.context) {
    return req;
  }

  getFolderContents = function(folder, recursive) {
    var fs = require('fs');

    return fs.readdirSync(folder).reduce(function(list, file) {
      var name = path.join(folder, file);
      var isDir = fs.statSync(name).isDirectory();

      return list.concat((isDir && recursive) ? getFolderContents(name, recursive) : [name]);
    }, []);
  };

  req.context = function(folder, recursive, pattern) {
    var folderContents = getFolderContents(folder, recursive)
    .map(function(item) {
      return './' + item;
    }).filter(function(item) {
      // Don't include current file
      if (item === './' + path.basename(__filename)) {
        return false;
      }

      return pattern.test(item);
    });

    var keys = function() {
      return folderContents;
    };

    var returnContext = function returnContext(item) {
      return require(item);
    };

    returnContext.keys = keys;

    return returnContext;
  };

  return req;
};
