import { mount, shallow } from 'enzyme';
import React from 'react';
import { act } from 'react-dom/test-utils';

import { NotificationPanel } from './NotificationPanel';

describe('<NotificationPanel>', () => {
  const EMPTY_NOTIF = {
    message: null,
  };
  const NOTIF = {
    message: {
      type: 'info',
      content: 'Hello, World!',
    },
  };

  it('returns an empty element when there is no notification', () => {
    const wrapper = shallow(<NotificationPanel notification={EMPTY_NOTIF} />);
    expect(wrapper.children()).toHaveLength(1);
    expect(wrapper.find('span').text()).toEqual('');
  });

  it('shows a message when there is a notification', () => {
    const wrapper = shallow(<NotificationPanel notification={NOTIF} />);
    expect(wrapper.find('span').text()).toEqual(NOTIF.message.content);
  });

  it('hides a message after a delay', () => {
    jest.useFakeTimers();

    // Create a NotificationPanel with no message.
    const wrapper = mount(<NotificationPanel notification={EMPTY_NOTIF} />);

    expect(wrapper.find('span').text()).toEqual('');

    // Add a message to the NotificationPanel, that message is shown.
    wrapper.setProps({ notification: NOTIF });
    wrapper.update();

    expect(wrapper.find('span').text()).toEqual(NOTIF.message.content);
    expect(wrapper.find('.showing')).toHaveLength(1);

    // Run time forward, the message with disappear.
    act(() => jest.runAllTimers());
    wrapper.update();

    expect(wrapper.children()).toHaveLength(1);
    expect(wrapper.find('.showing')).toHaveLength(0);
  });

  it('hides a message on click', () => {
    const wrapper = mount(<NotificationPanel notification={NOTIF} />);
    wrapper.update();

    expect(wrapper.find('.showing')).toHaveLength(1);
    wrapper.simulate('click');
    expect(wrapper.find('.showing')).toHaveLength(0);
  });
});
