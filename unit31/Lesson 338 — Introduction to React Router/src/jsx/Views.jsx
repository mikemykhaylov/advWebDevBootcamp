/* eslint-disable react/prop-types */
import React from 'react'

export const Homepage = () => <div>Homepage</div>;
export const About = () => <div>About</div>;
export const Hello = ({ match }) => {
  return <div>{`Hello, ${match.params.name.toUpperCase()}`}</div>;
};