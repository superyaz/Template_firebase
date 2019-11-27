import React from 'react';
import ReactDOM from 'react-dom';
import Contest from './Contest';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Contest />, div);
  ReactDOM.unmountComponentAtNode(div);
});