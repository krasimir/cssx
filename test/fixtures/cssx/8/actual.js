module.exports = function (cssx) {
  cssx.define('typography', function (value) {
    switch(value) {
      case 'big':
        return { 'font-size': '2em', 'line-height': '2.4em' };
    }
    return { 'font-size': '1em', 'line-height': '1em' };
  });
  var paragraph = cssx.add({ body: { typography: 'big' }}).d({ p: { typography: '' }});
  paragraph.update({ typography: 'big' });

}