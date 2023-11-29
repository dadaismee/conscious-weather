import React from "react";
import styled from "styled-components";
import { Visualization } from "./index";


const Main = () => {
  return (
    <Wrapper>
      <LeftText >
        <Subheading>The weather now, 10 and 20 years in any city.</Subheading>
        <Text>Weather consciousness refers to the awareness and perception of weather patterns and their potential connection to climate change. Over the last 20-30 years, there has been a noticeable increase in global surface temperatures. According to the National Centers for Environmental Information of the United States, the surface global temperature during the decade leading up to 2020 was +0.82 °C (+1.48 °F) above the 20th-century average[2]. This rise in temperature has been attributed to human activities, particularly the burning of fossil fuels, which has led to an increase in greenhouse gases in the Earth's atmosphere[4]. As a result, extreme weather events and temperature fluctuations have become more frequent and intense, impacting human health and well-being[4][5]. Personal experiences of extreme weather events and local weather anomalies, such as temperature fluctuations, have been found to shape perceptions of climate change, making the risk more tangible and familiar to individuals[3]. This increased awareness of the impact of weather on daily life has the potential to influence attitudes and behaviors towards climate change mitigation and adaptation.
        </Text>
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
  gap: 2.89vw;
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
