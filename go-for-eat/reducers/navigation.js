import { NavigationActions } from 'react-navigation';

import { AppNavigator } from '../navigation/index.js';

const firstAction = AppNavigator.router.getActionForPathAndParams('Loading');
const tempNavState = AppNavigator.router.getStateForAction(firstAction);
const secondAction = AppNavigator.router.getActionForPathAndParams('Login');
const initialNavState = AppNavigator.router.getStateForAction({
  secondAction,
  tempNavState
});

const nav = (state = initialNavState, action) => {
  let nextState;
  switch (action.type) {
  case 'LOGIN_USER_REQUEST':
    nextState = AppNavigator.router.getStateForAction(
      NavigationActions.navigate({ routeName: 'Loading' }),
      state
    );
    break;
  case 'LOGIN_USER_SUCCESS':
    nextState = AppNavigator.router.getStateForAction(
      NavigationActions.navigate({ routeName: 'Home' }),
      state
    );
    break;
  case 'LOGIN_USER_FAILURE':
    nextState = AppNavigator.router.getStateForAction(
      NavigationActions.navigate({ routeName: 'Login' }),
      state
    );
    break;
  case 'NAVIGATE':
    nextState = AppNavigator.router.getStateForAction(
      NavigationActions.navigate({ routeName: action.screen }),
      state
    );
    break;
  case 'NAVIGATE_BACK':
    nextState = AppNavigator.router.getStateForAction(
      NavigationActions.back(),
      state
    );
    break;
  case 'NAVIGATE_LOGIN':
    nextState = AppNavigator.router.getStateForAction(
      NavigationActions.reset({
        index: 0,
        key: null,
        actions: [NavigationActions.navigate({ routeName: 'Login' })]
      }),
      state
    );
    break;
  case 'CREATE_EVENT_REQUEST':
    nextState = AppNavigator.router.getStateForAction(
      NavigationActions.navigate({ routeName: 'CreateEventConfirmation'}),
      state
    );
    break;
  default:
    break;
  }
  return nextState || state;
};

export default nav;
