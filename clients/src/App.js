import React from 'react';
import { Provider } from 'react-redux';
import { compose, createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import AdvertisementsReducer from "./reducers/Advertisements";
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import VisibleAdvertisement from "./components/Advertisements";
import VisibleLogin from "./components/Login";
import VisibleSignup from "./components/Signup";
import VisibleAdvertisementForm from "./components/AdvertisementForm";
import './App.scss';

const createStorage = compose(
    applyMiddleware(thunkMiddleware)
)(createStore);

class App extends React.Component {
  componentWillMount() {
      this.store = createStorage(AdvertisementsReducer, {});
  }
  render() {
    return (
      <Provider store={this.store}>
        <BrowserRouter>
            <Switch>
                <Route path="/login" component={VisibleLogin} />
                <Route path="/form" component={VisibleAdvertisementForm} />
                <Route path="/signup" component={VisibleSignup} />
                <Route path="/" component={VisibleAdvertisement} />
            </Switch>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
