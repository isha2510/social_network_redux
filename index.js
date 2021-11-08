import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import reducer from './Reducers';
import UserApi from './API/UserApi';

const initialState = {};

export const store = createStore(reducer,
  initialState,
  //main use cases for this middleware is for handling actions that might not be synchronous
  applyMiddleware(thunk)
);


ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  </Provider>,
  document.getElementById('root')

);

UserApi.interceptors.request.use(
  request => {
    if (store.getState().login.token) {
      request.headers['Authorization'] = `Bearer ${store.getState().login.token}`;
    }
    return request;
  },
  error => {
    return Promise.reject(error);
  }
);

UserApi.interceptors.response.use(response => {
  return response;
}, error => {
  console.log("errpr", error.response);
  if (error.response.status === 401 && !error.response.config.url.includes("authenticate")) {
    alert("token expired, please login");
  }
  return Promise.reject(error);
});
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
