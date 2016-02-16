import React from 'react';
import ReactDOM from 'react-dom';
import Component from './Component';
import 'cssx';

cssx(
      .form {
        margin: 2;
        padding: 0;
      }
    );

window.onload = () => {
  ReactDOM.render(
    <Component />,
    document.querySelector('#container')
  );
};
