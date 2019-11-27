import React from 'react';
import ReactDOM from 'react-dom';
import DailyReports from './DailyReports';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<DailyReports />, div);
  ReactDOM.unmountComponentAtNode(div);
});
