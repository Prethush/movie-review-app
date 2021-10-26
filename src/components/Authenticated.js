import React from 'react'
import Movies from './Movies';
import Search from './Search';
import Movie from './Movie';
import Profile from './Profile';
import { Switch, Route } from 'react-router-dom';
import Nomatch from './Nomatch';
import UpdateProfile from './UpdateProfile';

export default function Authenticated() {
  return (
      < Switch>
            < Route exact path="/">
              < Movies />
            </Route>
            < Route path="/movie/:id">
              < Movie />
            </Route>
            < Route path="/search/:id">
              < Search />
            </Route>
            < Route exact path="/profile/:username">
              < Profile />
            </Route>
            < Route path="/profile/:username/update">
              < UpdateProfile />
            </Route>
            < Route path="*">
              < Nomatch />
            </Route>
          </Switch>   
        )
      }
