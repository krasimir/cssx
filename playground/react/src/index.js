import React from 'react';
import ReactDOM from 'react-dom';
import Navigation from './Navigation';
import 'cssx';

const ITEMS = [
  'React',
  'Angular',
  'Vue',
  'Ember',
  'Knockout',
  'Vanilla'
];

window.onload = () => {
  ReactDOM.render(
    <Navigation items={ ITEMS } />,
    document.querySelector('#container')
  );
};
