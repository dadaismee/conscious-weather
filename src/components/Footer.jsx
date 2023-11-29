import React from "react";
import styled from "styled-components";

const Footer = () => {
  return (
    <Wrapper>
      <Text>Conscious Weather © 2023</Text>
      <Text>by v—sh</Text>
    </Wrapper>
  )
}

export default Footer;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 60px 60px 0px;
`
const Text = styled.p`
  font-size: 16px;
  font-weight: 600;
`

