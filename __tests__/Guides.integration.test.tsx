/**
 * @jest-environment jsdom
 */
import { render } from 'enzyme';
import * as React from 'react';

import Guides from '../src/react-guides/Guides';
import { ref } from '../src/react-guides/utils';

describe('Guides', () => {
  it('should render correctly', () => {
    const wrapper = render(
      <Guides
        ref={ref(this, 'guides2')}
        type="vertical"
      />,
    );

    expect(wrapper.find('canvas').length).toBeTruthy();
  });
});
