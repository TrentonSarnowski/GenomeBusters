import renderer from 'react-test-renderer';
import SidePanel from './SidePanel';
import React from 'react';
import ReactDOM from 'react-dom'
import ReactTestUtils from 'react-addons-test-utils'

test('Link renders correctly', () => {
  const tree = renderer.create(<SidePanel />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders without crashing', () => {
  const renderer = ReactTestUtils.createRenderer();
  renderer.render(<SidePanel />);
  const result = renderer.getRenderOutput();

  expect(result.type).toBe('div');
});
