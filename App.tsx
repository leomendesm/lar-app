import React from 'react';

import {NativeRouter, Route} from 'react-router-native';
import Login from './src/Containers/Login';
import Register from './src/Containers/Register';
import Dates from "./src/Containers/Dates";
import Menu from "./src/Containers/Menu";
import Places from "./src/Containers/Places";
import Place from "./src/Containers/Place";
import Ranking from "./src/Containers/Ranking";
import Location from "./src/Containers/Location";
import BodyPain from "./src/Containers/BodyPain";
import Exercise from "./src/Containers/Exercise";

const App = () => (
  <NativeRouter>
    <Route exact path="/" component={Login} />
    <Route exact path="/login" component={Login} />
    <Route exact path="/register" component={Register} />
    <Route exact path="/dates" component={Dates} />
    <Route exact path="/menu" component={Menu} />
    <Route exact path="/location" component={Location} />
    <Route path="/places/:location" component={Places} />
    <Route path="/places/detail/:id" component={Place} />
    <Route path="/ranking" component={Ranking} />
    <Route path="/body" component={BodyPain} />
    <Route path="/exercise" component={Exercise} />
  </NativeRouter>
);

export default App;
