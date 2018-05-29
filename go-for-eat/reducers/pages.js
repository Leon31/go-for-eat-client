import _ from 'lodash';
import moment from 'moment';

const defaultState = {
  currentScreen:'Login',
  Home:{
    events:[],
    mainEvent: null,
    suggestedOpen: false,
    reloadEvents: false,
  },
  Login:{},
  Profile:{},
  Maps:{
    query:{},
    events: [],
  },
  User:{
    userId:null,
  },
  CreateEvent:{
    confirmationAlertOpen: false,
    errorAlertOpen: false,
  },
  EditEvent:{
    confirmationAlertOpen: false,
    errorAlertOpen: false,
  },
  CreateScreen:{
    edit:false,
    event:'',
  },
  Rating:{
    user:null
  }
};

const pages = (state = defaultState, action) => {
  switch (action.type) {
  case 'LOGIN_USER_SUCCESS':
    return {
      ...state,
      prevScreen:'Login',
      currentScreen:'Home'
    };
  case 'NAVIGATE':
    return {
      ...state,
      prevScreen:state.currentScreen,
      currentScreen:action.screen
    };
  case 'NAVIGATE_BACK':
    return {
      ...state,
      prevScreen:state.currentScreen,
      currentScreen:state.prevScreen
    };
  case 'NAVIGATE_LOGIN':
    return {
      ...state,
      prevScreen: null,
      currentScreen: 'Login'
    };
  case 'FORM_PROFILE_PAGE':

    const { created_events, events } = action.user;

    created_events = created_events
      .map(elem => action.events[elem])
      .filter(elem => moment(elem.when) > moment())
      .sort((a,b) => a.distance -b.distance)
      .map(elem => elem._id);

    events = events
      .map(elem => action.events[elem])
      .sort((a,b) => a.distance - b.distance);

    const myComingEvents = events
      .filter(elem => moment(elem.when) > moment())
      .map(elem => elem._id);

    const myPastEvents = events
      .filter(elem => moment(elem.when) < moment())
      .map(elem => elem._id);

    return {
      ...state,
      Profile: {
        ...state.Profile,
        events: [
          {
            title: 'Created Events',
            data: created_events
          },
          {
            title: 'My Upcoming Events',
            data: myComingEvents
          },
          {
            title: 'My Past Events',
            data: myPastEvents
          }
        ]

      }
    };
    case 'UPDATE_QUERY_STATE':
    const newQuery = Object.assign(state.Maps.query, action.newQuery);
    return {
      ...state,
      Maps:{
        ...state.Maps,
        query:{
          ...newQuery
        },
        events: [],
      },
      Home:{
        ...state.Home,
        events: [],
      }
    };
    case 'GET_EVENTS_SUCCESS':
    const eventIds = action.response.result;
    const title = action.response.entities.events[eventIds[0]].when;
    const originalEvents = action.distFetch ? [] : state.Home.events;
    return {
      ...state,
      Home: {
        ...state.Home,
        events: [
          ...originalEvents,
          { title, data: eventIds }
        ],
      },
      Maps: {
        ...state.Maps,
        events: [
          ...new Set(state.Maps.events.concat(...eventIds))
        ],
      },
    };
  case 'SET_MAIN_EVENT':
    if (action.id) {
      return {
        ...state,
        Home: {
          ...state.Home,
          mainEvent: action.id,
        }
      };
    }
    else return state;
    break;
  case 'GET_MAIN_SUCCESS':
    return {
      ...state,
      Home: {
        ...state.Home,
        mainEvent: action.response._id,
        sudggested: action.response._id,
      }
    };
    break;
  // case 'DELETE_EVENTS_SUCCESS':
  //   delete state.Home.events[action.eventId];
  //   return {
  //     ...state,
  //     events: {
  //       ...state.events,
  //     }
  //   };
  //   break;
  case 'TOGGLE_DETAILS':
    return {
      ...state,
      Home: {
        ...state.Home,
        suggestedOpen: !state.Home.suggestedOpen,
      }
    };
  case 'GET_USER_SUCCESS':
    return {
      ...state,
      User: {
        ...state.User,
        userData:action.response
      }
    };
  case 'SELECT_USER':
    return {
      ...state,
      User: {
        ...state.User,
        userId: action.userId
      }
    };
  case 'SELECT_EVENT':
    return {
      ...state,
      EditEvent: {
        ...state.EditEvent,
        eventId: action.eventId
      }
    };
  case 'CREATE_EVENT_SUCCESS':
    return {
      ...state,
      CreateEvent: {
        ...state.CreateEvent,
        confirmationAlertOpen: true,
      }
    };
  case 'CREATE_EVENT_FAILURE':
    return {
      ...state,
      CreateEvent: {
        ...state.CreateEvent,
        errorAlertOpen: true,
      }
    };
  case 'CLOSE_CREATE_EVENT_CONF_ALERT':
    return {
      ...state,
      CreateEvent: {
        ...state.CreateEvent,
        confirmationAlertOpen: false,
      },
      Home: {
        ...state.Home,
        reloadEvents: true,
      }
    };
  case 'CLOSE_CREATE_EVENT_ERR_ALERT':
    return {
      ...state,
      CreateEvent: {
        ...state.CreateEvent,
        errorAlertOpen: false,
      }
    };
  case 'EDIT_EVENT_SUCCESS':
    return {
      ...state,
      EditEvent: {
        ...state.EditEvent,
        confirmationAlertOpen: true,
      }
    };
  case 'EDIT_EVENT_FAILURE':
    return {
      ...state,
      EditEvent: {
        ...state.EditEvent,
        errorAlertOpen: true,
      }
    };
  case 'CLOSE_EDIT_EVENT_CONF_ALERT':
    return {
      ...state,
      EditEvent: {
        ...state.EditEvent,
        confirmationAlertOpen: false,
      },
      Home: {
        ...state.Home,
        reloadEvents: true,
      }
    };
  case 'CLOSE_EDIT_EVENT_ERR_ALERT':
    return {
      ...state,
      EditEvent: {
        ...state.EditEvent,
        errorAlertOpen: false,
      }
    };
  case 'DISABLE_RELOAD_EVENTS':
    return {
      ...state,
      Home: {
        ...state.Home,
        reloadEvents: false,
      }
    };
  case 'SET_RATE_USER':
    return {
      ...state,
      Rating:{
        ...state.Rating,
        user:action.user
      }
    };
  default:
    return state;
  }
};

export default pages;
