import React from 'react';
import ReactDOM from 'react-dom';
import Component from './Component';
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
    <Component items={ ITEMS } />,
    document.querySelector('#container')
  );
};
