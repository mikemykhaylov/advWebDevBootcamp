import React from 'react'
import {Switch as SwitchWrap, Route, Redirect} from 'react-router-dom';
import { Homepage, About, Hello} from './Views';

export default function Switch() {
  return (
    <SwitchWrap>
      <Route path="/about" component={About} />
      <Route path="/somewhere">
        <Redirect to="/" />
      </Route>
      <Route path="/:name" component={Hello} />
      <Route path="/" component={Homepage} />
    </SwitchWrap>
  )
}
