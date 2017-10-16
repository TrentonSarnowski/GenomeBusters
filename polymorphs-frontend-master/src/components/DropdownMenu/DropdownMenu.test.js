import React from 'react';
import ReactDOM from 'react-dom';
import DropdownMenu from './DropdownMenu';
import renderer from 'react-test-renderer';

it('renders without crashing', () => {
  const tree = renderer.create(<DropdownMenu />).toJSON();
  expect(tree).toMatchSnapshot();
});

