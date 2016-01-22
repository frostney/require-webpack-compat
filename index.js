var path = require('path');

module.exports = function(module, req) {
  getFolderContents = function(folder, recursive) {
    var fs = require('fs');

    return fs.readdirSync(folder).reduce(function(list, file) {

      var name = path.resolve(folder, file);
      var isDir = fs.statSync(name).isDirectory();

      return list.concat((isDir && recursive) ? getFolderContents(name, recursive) : [name]);
    }, []);
  };

  req.context = req.context || function(folder, recursive, pattern) {
    var normalizedFolder = path.resolve(path.dirname(module.filename), folder);
    var folderContents = getFolderContents(normalizedFolder, recursive)
    .filter(function(item) {
      // Don't include current file
      if (item === module.filename) {
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
