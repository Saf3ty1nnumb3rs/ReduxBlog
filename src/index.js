import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { BrowserRouter, Route } from "react-router-dom";
import promise from 'redux-promise'


import reducers from "./reducers";
import PostsIndex from './components/PostsIndex'
import PostsShow from './components/PostsShow'
import NewPost from './components/NewPost'

const createStoreWithMiddleware = applyMiddleware()(createStore);


ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
      <div>
        <Route exact path="/" component={PostsIndex} />
        <Route path="/posts/:id" component={PostsShow} />
        <Route path="/posts/new" component={NewPost} />
      </div>
    </BrowserRouter>
  </Provider>,
  document.querySelector(".container")
);
