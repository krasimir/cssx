import React from 'react';
import ReactDOM from 'react-dom';
import Component from './Component';
import 'cssx';

window.onload = () => {
  ReactDOM.render(
    <Component />,
    document.querySelector('#container')
  );
};
