import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { Button } from './index';

const Visualization = () => {
  const [city, setCity] = useState('');
  
  const [currentWeather, setCurrentWeather] = useState(undefined);
  const [tenYWeather, setTenYWeather] = useState(undefined);
  const [twentyYWeather, setTwentyYWeather] = useState(undefined);

  const [weatherIsShown, setWeatherIsShown] = useState(false);
  const API_Key = '79d1ca96933b0328e1c7e3e7a26cb347';

  const getYear = (date, years) => {
    date.setFullYear(date.getFullYear() - years);
    return date.toISOString().slice(0, 10);
  };

  const tenY = getYear(new Date(), 10);
  const twentyY = getYear(new Date(), 20);

  // Weather calls
  const fetchCurrent = useCallback(async () => {
    const currentWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_Key}`;
    if (!city) {
      return;
    }

    try {
      const res = await fetch(currentWeatherURL);
      const data = await res.json();

      const weather = data['weather'][0]['main'].toLowerCase();
      const temp = Math.floor(data['main']['temp']);
      const { lat, lon } = data['coord'];
      const weatherData = {
        weather: weather,
        temp: temp,
        lat: lat,
        lon: lon
      };

      setCurrentWeather(weatherData);

      const fetchTenY = async () => {
        const tenYearsAgoTemp = `https://api.openweathermap.org/data/3.0/onecall/day_summary?lat=${weatherData.lat}&lon=${weatherData.lon}&date=${tenY}&units=metric&appid=${API_Key}`;

        try {
        const res = await fetch(tenYearsAgoTemp);
        const data = await res.json();
        const temp = Math.floor(data.temperature.afternoon);
        setTenYWeather(temp);
      } catch (error) {
        console.error('Error fetching ten years ago temp', error);
      }
    }
      await fetchTenY();

      const fetchTwentyY = async () => {
        const twentyYearsAgoTemp = `https://api.openweathermap.org/data/3.0/onecall/day_summary?lat=${weatherData.lat}&lon=${weatherData.lon}&date=${twentyY}&units=metric&appid=${API_Key}`;

        try {
        const res = await fetch(twentyYearsAgoTemp);
        const data = await res.json();
        const temp = Math.floor(data.temperature.afternoon);
        setTwentyYWeather(temp);

      } catch (error) {
        console.error('Error fetching ten years ago temp', error);
      }
    }
      await fetchTenY();
      await fetchTwentyY();
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  }, [city]);

 
  const handleClick = async (event) => {
    event.preventDefault(); 
    await fetchCurrent();
    setWeatherIsShown(true);
    console.log(twentyYWeather);
    console.log('The weather in', city, 'is', currentWeather);
  };

  const handleChange = (event) => {
    setCity(event.target.value);
  };

  return (
    <Wrapper>
      {Boolean(!weatherIsShown) ? (
        <FormContainer>
          <Form onSubmit={handleClick}>
            <Input
              id='city'
              type='text'
              placeholder='Type your city'
              onChange={handleChange}
              value={city}
            />
            <Button onClick={handleClick}>Get Weather</Button>
          </Form>
        </FormContainer>
      ) : (
        <VertFlex>
          <WeatherContainer>
            <WeatherLineFlex>
              <p>now</p>   
              <p>{currentWeather.weather}</p>   
              <p>{currentWeather.temp}°</p>   
            </WeatherLineFlex>
            <WeatherLineFlex>
              <p>{tenY.slice(0, 4)}</p>
              <p>{tenYWeather}°</p>
            </WeatherLineFlex>
            <WeatherLineFlex>
              <p>{twentyY.slice(0, 4)}</p>
              <p>{twentyYWeather}°</p>
            </WeatherLineFlex>
          </WeatherContainer>
          <Form onSubmit={handleClick}>
            <Input
              id='city'
              type='text'
              placeholder='Type your city'
              onChange={handleChange}
              value={city}
            />
            <Button onClick={handleClick}>Get Weather</Button>
        </Form>
  
        </VertFlex>
        )
      }
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background-color: #8fc7b3;
  border-radius: 25px;
  height: 66vh;
  display: flex;
  justify-content: center;
`;

const Form = styled.form`
  width: 100%;
  margin: 0px 0px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-self: center;
`;

const Input = styled.input`
  border: solid 2px black;
  border-radius: var(--border-radius);
  text-indent: 20px;
  padding: 20px;
  background-color: transparent;
  color: black;
  font-size: 36px;
`;

const WeatherLineFlex = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  font-size: 36px;

`
const VertFlex = styled.div`
  width: 100%;
  margin: 40px;
  display: flex;
  gap: 20px;
  flex-direction: column;
  justify-content: space-between;

`
const FormContainer = styled.div`
  margin: 0px 40px;
  width: 100%;
  display: flex;
  align-self: center;
`
const nowcolor = "#5679D2";
const tenYcolor = "#A6F1B2";
const twentyYcolor = "#1BAECE";

const WeatherContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: linear-gradient(180deg, ${nowcolor}, ${tenYcolor}, ${twentyYcolor});
  height: 100%;
  padding: 20px;
  border-radius: var(--border-radius);
`

export default Visualization;
