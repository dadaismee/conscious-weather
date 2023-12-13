import React from "react";
import styled from "styled-components";
import { Visualization } from "./index";


const Main = () => {
  return (
    <Wrapper>
      <LeftText >
        <Subheading>The weather now, 10 and 20 years in any city.</Subheading>
        <Text>Over the last 20 years, there has been a noticeable increase in global surface temperatures. According to the National Centers for Environmental Information of the United States, the surface global temperature during the decade leading up to 2020 was +0.82 °C (+1.48 °F) above the 20th-century average. This rise in temperature has been attributed to human activities, particularly the burning of fossil fuels, which has led to an increase in greenhouse gases in the Earth's atmosphere. As a result, extreme weather events and temperature fluctuations have become more frequent and intense, impacting human health and well-being. 
        </Text>

        <ul>
          <li><span style={{color: "#AD3737", fontWeight: 600}}>RED</span> background signals a warming trend</li>
          <li><span style={{color: "#468CC0", fontWeight: 600}}>BLUE</span> — colding trend</li>
          <li><span style={{color: "#8FC7B3", fontWeight: 600}}>GREEN</span> — stangant trend</li>
          <li><span style={{color: "#000", fontWeight: 600}}>GREY</span> — no discernible trend</li>
        </ul>
      </LeftText>
      <Visualization />
    </Wrapper>
  )
}

export default Main;

const Wrapper = styled.div`
  height: 100%;
  margin: 0px 60px 0px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 3.5vw;
  justify-content: space-between;
`;

const LeftText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: 0px;
  padding: 0px;

`;

const Subheading = styled.h2`
  font-weight: 400;
  font-size: 36px;
  line-height: 110%;
  margin: 0px;
`

const Text = styled.p`
  font-size: 16px;
`
