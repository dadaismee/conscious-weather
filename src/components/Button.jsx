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
  background-color: #000;
  transition: all 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);

  &:hover {
    cursor: pointer;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.95);
  }
`;
