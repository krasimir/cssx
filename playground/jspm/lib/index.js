import styles from './styles.js!cssx';

function init() {
  document.querySelector('body').innerHTML = '<pre>' + JSON.stringify(styles, null, 2) + '<pre>';
}

init();