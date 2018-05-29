import { CALL_API } from '../middleware/api';
import { schema } from 'normalizr';


const userSchema = new schema.Entity('users', {}, {idAttribute:'_id'});
const userSchemaArray = [userSchema];
const eventSchema = new schema.Entity('events', {attendees:userSchemaArray}, {idAttribute:'_id'});
const eventSchemaArray = [eventSchema];

const mySchema = new schema.Entity('user', {events:eventSchemaArray, created_events:eventSchemaArray}, {idAttribute:'_id'});
const outerSchema = new schema.Entity('me', {user:mySchema}, {idAttribute:'user'});

export const LOGIN_USER_REQUEST = 'LOGIN_USER_REQUEST';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAILURE = 'LOGIN_USER_FAILURE';

export const loginUser = (data) => ({
  [CALL_API]: {
    types: [ LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS, LOGIN_USER_FAILURE ],
    endpoint: '/auth',
    method: 'POST',
    schema:outerSchema,
    data,
  }
});

export const LOGOUT_USER = 'LOGOUT_USER';

export const logoutUser = () => ({
  type: LOGOUT_USER
});

export const SET_USER = 'SET_USER';

export const setUser = (data) => ({
  type: SET_USER,
  data,
});

export const RELOAD_USER_REQUEST = 'RELOAD_USER_REQUEST';
export const RELOAD_USER_SUCCESS = 'RELOAD_USER_SUCCESS';
export const RELOAD_USER_FAILURE = 'RELOAD_USER_FAILURE';

export const reloadUser = (position) => ({
  [CALL_API]: {
    types: [ RELOAD_USER_REQUEST, RELOAD_USER_SUCCESS, RELOAD_USER_FAILURE ],
    endpoint: `/me?lat=${position.lat}&lng=${position.lng}`,
    schema:mySchema,
  },
});

export const setMainEvent= (id) => ({
  type: 'SET_MAIN_EVENT',
  id,
});

export const setQueryState = (newQuery) => ({
  type: 'UPDATE_QUERY_STATE',
  newQuery,
});

export const UPDATE_USER_REQUEST = 'UPDATE_USER_REQUEST';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const UPDATE_USER_FAILURE = 'UPDATE_USER_FAILURE';

export const updateUser = (data) => ({
  [CALL_API]: {
    types: [UPDATE_USER_REQUEST, UPDATE_USER_SUCCESS, UPDATE_USER_FAILURE],
    endpoint: '/me',
    method:'PUT',
    data:{edit:data}
  },
  data:{edit:data}
});

export const CREATE_EVENT_REQUEST = 'CREATE_EVENT_REQUEST';
export const CREATE_EVENT_SUCCESS = 'CREATE_EVENT_SUCCESS';
export const CREATE_EVENT_FAILURE = 'CREATE_EVENT_FAILURE';

export const createEvent = (data) => ({
  type: 'CREATE_EVENT',
  [CALL_API]: {
    types: [CREATE_EVENT_REQUEST, CREATE_EVENT_SUCCESS, CREATE_EVENT_FAILURE],
    endpoint: '/events',
    method: 'POST',
    data
  }
});

export const EDIT_EVENT_REQUEST = 'EDIT_EVENT_REQUEST';
export const EDIT_EVENT_SUCCESS = 'EDIT_EVENT_SUCCESS';
export const EDIT_EVENT_FAILURE = 'EDIT_EVENT_FAILURE';

export const editEvent = (eventId, data) => ({
  type: 'EDIT_EVENT',
  [CALL_API]: {
    types: [EDIT_EVENT_REQUEST, EDIT_EVENT_SUCCESS, EDIT_EVENT_FAILURE],
    endpoint: `/events/${eventId}`,
    method: 'PUT',
    data
  }
});

export const DELETE_EVENTS_REQUEST = 'DELETE_EVENTS_REQUEST';
export const DELETE_EVENTS_SUCCESS = 'DELETE_EVENTS_SUCCESS';
export const DELETE_EVENTS_FAILURE = 'DELETE_EVENTS_FAILURE';

export const deleteEvent = (eventId, userId) => ({
  [CALL_API]: {
    types: [DELETE_EVENTS_REQUEST, DELETE_EVENTS_SUCCESS, DELETE_EVENTS_FAILURE],
    endpoint: `/events/${eventId}`,
    method: 'DELETE',
  },
  eventId,
  userId
});

export const GET_EVENTS_REQUEST = 'GET_EVENTS_REQUEST';
export const GET_EVENTS_SUCCESS = 'GET_EVENTS_SUCCESS';
export const GET_EVENTS_FAILURE = 'GET_EVENTS_FAILURE';

export const getNearbyEvents = (queryString, distFetch=false) => ({
  [CALL_API]: {
    types: [GET_EVENTS_REQUEST, GET_EVENTS_SUCCESS, GET_EVENTS_FAILURE],
    endpoint: `/events?lat=${queryString.lat}&lng=${queryString.lng}&dist=${queryString.dist}&to=${queryString.to}&from=${queryString.from}&ratings=${queryString.ratings}&profession=${queryString.profession}`,
    schema: eventSchemaArray,
  },
  distFetch
});

export const GET_MAIN_REQUEST = 'GET_MAIN_REQUEST';
export const GET_MAIN_SUCCESS = 'GET_MAIN_SUCCESS';
export const GET_MAIN_FAILURE = 'GET_MAIN_FAILURE';

export const getSudggested = (queryString) => ({
  [CALL_API]: {
    types: [GET_MAIN_REQUEST, GET_MAIN_SUCCESS, GET_MAIN_FAILURE],
    endpoint: `/events?lat=${queryString.lat}&lng=${queryString.lng}&dist=${queryString.dist}&to=${queryString.to}&from=${queryString.from}&sort=${true}`,
  },
});

export const JOIN_EVENTS_REQUEST = 'JOIN_EVENTS_REQUEST';
export const JOIN_EVENTS_SUCCESS = 'JOIN_EVENTS_SUCCESS';
export const JOIN_EVENTS_FAILURE = 'JOIN_EVENTS_FAILURE';

export const joinEvent = (eventId, userId) => ({
  [CALL_API]: {
    types: [JOIN_EVENTS_REQUEST, JOIN_EVENTS_SUCCESS, JOIN_EVENTS_FAILURE],
    endpoint: `/events/${eventId}/users`,
    method: 'PUT',
  },
  eventId,
  userId
});

export const GET_USER_REQUEST = 'GET_USER_REQUEST';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USER_FAILURE = 'GET_USER_FAILURE';

export const getUser = (userId) => ({
  [CALL_API]: {
    types: [GET_USER_REQUEST, GET_USER_SUCCESS, GET_USER_FAILURE],
    endpoint: `/users/${userId}`,
    method: 'GET',
  },
});

export const RATE_USER_REQUEST = 'RATE_USER_REQUEST';
export const RATE_USER_SUCCESS = 'RATE_USER_SUCCESS';
export const RATE_USER_FAILURE = 'RATE_USER_FAILURE';

export const rateUser = (userId,rating) => ({
  [CALL_API]: {
    types: [RATE_USER_REQUEST, RATE_USER_SUCCESS, RATE_USER_FAILURE],
    endpoint: `/users/${userId}/rating`,
    method: 'PUT',
    data:{rating}
  },
  userId,
  rating
});

export const LEAVE_EVENTS_REQUEST = 'LEAVE_EVENTS_REQUEST';
export const LEAVE_EVENTS_SUCCESS = 'LEAVE_EVENTS_SUCCESS';
export const LEAVE_EVENTS_FAILURE = 'LEAVE_EVENTS_FAILURE';

export const leaveEvent = (eventId, userId) => ({
  [CALL_API]: {
    types: [LEAVE_EVENTS_REQUEST, LEAVE_EVENTS_SUCCESS, LEAVE_EVENTS_FAILURE],
    endpoint: `/events/${eventId}/users`,
    method: 'DELETE',
  },
  eventId,
  userId
});

export const goToEditEvent = (eventId) => ({
  type: 'SELECT_EVENT',
  eventId
});

export const goToUser = (userId) => ({
  type: 'SELECT_USER',
  userId
});


export const setEntities = (data) => ({
  type:'SET_ENTITIES',
  data
});

export const navigate = (screen) => ({
  type: 'NAVIGATE',
  screen
});

export const navigateBack = () => ({
  type: 'NAVIGATE_BACK',
});

export const navigateLogin = () => ({
  type: 'NAVIGATE_LOGIN',
});

export const toggleDetails = () => ({
  type: 'TOGGLE_DETAILS',
});

export const closeCreateEventConfirmationAlert = () => ({
  type: 'CLOSE_CREATE_EVENT_CONF_ALERT',
});

export const closeCreateEventErrorAlert = () => ({
  type: 'CLOSE_CREATE_EVENT_ERR_ALERT',
});

export const closeEditEventConfirmationAlert = () => ({
  type: 'CLOSE_EDIT_EVENT_CONF_ALERT',
});

export const closeEditEventErrorAlert = () => ({
  type: 'CLOSE_EDIT_EVENT_ERR_ALERT',
});

export const disableReloadEvents = () => ({
  type: 'DISABLE_RELOAD_EVENTS',
});

export const setRatingUser = (user) => ({
  type:'SET_RATE_USER',
  user
});



export const formProfilePage = (events, user) => ({
  type:'FORM_PROFILE_PAGE',
  events,
  user
});
