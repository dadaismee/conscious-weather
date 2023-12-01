import React from 'react';
import styled from 'styled-components';

const Button = ({ handleClick }) => {
  return <Wrapper onClick={handleClick}>Get the weather</Wrapper>;
};

export default Button;

const Wrapper = styled.button`
  border-radius: var(--border-radius);
  width: 100%;
  font-size: 36px;
  padding: 20px;
  font-size: 36px;
  font-family: inherit;
  border: none;
  transition: all 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);

  &:hover {
    background-color: #000;
    cursor: pointer;
  }
`;
