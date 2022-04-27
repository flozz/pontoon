/*
 * A redux store creator for our testing environment.
 *
 * Notably, this one doesn't have any logging, and supports an initialState.
 */

import React from 'react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import { createMemoryHistory } from 'history';

import { LocationProvider } from '~/context/location';
import * as user from '~/core/user';
import { reducer } from '~/rootReducer';

const HISTORY = createMemoryHistory({
  initialEntries: ['/kg/firefox/all-resources/'],
});

export const createReduxStore = (initialState = {}) =>
  configureStore({
    reducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ serializableCheck: false }),
    preloadedState: initialState,
  });

export const mountComponentWithStore = (
  Component,
  store,
  props = {},
  history = HISTORY,
) =>
  mount(
    <Provider store={store}>
      <LocationProvider history={history}>
        <Component {...props} />
      </LocationProvider>
    </Provider>,
  );

export function createDefaultUser(store, initial = {}) {
  const userData = {
    settings: {
      force_suggestions: false,
    },
    username: 'Franck',
    is_authenticated: true,
    manager_for_locales: ['kg'],
    translator_for_locales: [],
    translator_for_projects: {},
  };

  const data = {
    ...userData,
    ...initial,
  };

  store.dispatch(user.actions.update(data));
}