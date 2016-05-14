import styles from './styles';
import jss from 'jss';
import nested from 'jss-nested'

jss.use(nested());

const { classes } = jss.createStyleSheet(styles).attach();

// classes // {button: '.button--jss-0-0 ', ctaButton: '.ctaButton--jss-0-2'}

document.body.innerHTML = `
  <button class="${classes.button}">Button</button>
  <br />
  <button class="${classes.ctaButton}">CTA Button</button>
  <p class="${classes.p}">Grumpy wizards make toxic brew for the evil Queen and Jack.</p>
`;