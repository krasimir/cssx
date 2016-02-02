module.exports = function (css) {
  css = css.replace(/\n/g, '');
  css = css.replace(/ {/g, '{');
  css = css.replace(/{  /g, '{');
  css = css.replace(/: /g, ':');
  css = css.replace(/;  /g, ';');
  css = css.replace(/;    /g, ';');
  return css;
};
