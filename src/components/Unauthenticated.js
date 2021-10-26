import React from 'react'
import Movies from './Movies';
import Search from './Search';
import Movie from './Movie';
import Profile from './Profile';
import Login from './Login';
import Register from "./Register";
import { Switch, Route } from 'react-router-dom';
import Nomatch from './Nomatch';

export default function Unauthenticated() {
  return (
      < Switch>
            < Route exact path="/">
              < Movies />
            </Route>
            < Route path="/movie/:id">
              < Movie />
            </Route>
            < Route path="/register">
              < Register />
            </Route>
            < Route path="/login">
              < Login />
            </Route>
            < Route path="/search/:id">
              < Search />
            </Route>
            < Route path="/profile/:username">
              < Profile />
            </Route>
            < Route path="*">
              < Nomatch />
            </Route>
          </Switch>
        )
      }
