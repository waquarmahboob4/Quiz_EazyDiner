import React from 'react';
import { Container } from 'react-bootstrap';
import './App.css';
import Header from './header/header'
import Question from './question/question'

function App() {
  return (
    <Container>
      <Header/>
      <Question/>
    </Container>
  );
}

export default App;
