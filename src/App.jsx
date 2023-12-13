import React from 'react';
import './App.css';
import styled from 'styled-components';
import { Main, Footer } from './components/index';
import { motion } from 'framer-motion';

const App = () => {
  return (
    <Wrapper
      initial={{
          opacity: 0,
          y: 10,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
          transition: {
            ease: [0.165, 0.84, 0.44, 1],
            duration: 1,
            delay: 0.25,
          },
        }}
        viewport={{ once: true }}>
      <Heading>Conscious weather</Heading>
      <Main/>
      <Footer/>
    </Wrapper>);
  };

export default App;

const Wrapper = styled(motion.div)`
  height: 100%;
`

const Heading = styled.h1`
  font-size: 72px;
  margin: 40px 0 10px 60px;
`
