import React from 'react';
import ReactDOM from 'react-dom';
import DropdownMenu from './DropdownMenu';
import renderer from 'react-test-renderer';

it('renders without crashing', () => {
  const tree = renderer.create(<Chart />).toJSON();
  expect(tree).toMatchSnapshot();
});

