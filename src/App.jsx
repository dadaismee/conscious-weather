import React from 'react';
import './App.css';
import styled from 'styled-components';
import { Main, Footer } from './components/index';

const App = () => {
  return (
    <Wrapper>
      <Heading>Conscious weather</Heading>
      <Main/>
      <Footer/>
    </Wrapper>);
  };

export default App;

const Wrapper = styled.div`
  height: 100%;
`

const Heading = styled.h1`
  font-size: 72px;
  margin: 30px 0 10px 60px;
`
