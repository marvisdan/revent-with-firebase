import { combineReducers  } from 'redux';
import { reducer as FormReducer } from 'redux-form';
import {reducer as toastrReducer } from 'react-redux-toastr';
import testReducer from '../../features/testarea/testReducer';
import eventReducer from '../../features/event/eventReducer';
import modalsReducer from '../../features/modals/modalReducer';
import authreducer from '../../features/auth/authReducer';
import asyncReducer from '../../features/async/asyncReducer';


const rootReducer =  combineReducers({
  form: FormReducer,
  test: testReducer,
  events: eventReducer,
  modals: modalsReducer,
  auth: authreducer,
  async: asyncReducer,
  toastr: toastrReducer
});

export default rootReducer;