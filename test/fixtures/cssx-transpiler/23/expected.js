var getId = function () {
  return 'a' + 1;
};
var id = getId();

var sheetA = cssx(id);
var sheetB = cssx(getId());