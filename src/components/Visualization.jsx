import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { Button } from './index';
import { motion } from 'framer-motion';


const Visualization = () => {
  const [city, setCity] = useState('');

  const [currentWeather, setCurrentWeather] = useState();
  const [tenYWeather, setTenYWeather] = useState();
  const [twentyYWeather, setTwentyYWeather] = useState();
  const [nowColor, setNowColor] = useState('gray');
  const [tenYColor, setTenYColor] = useState('gray');
  const [twentyYColor, setTwentyYColor] = useState('gray');
  const [currentTemp, setCurrentTemp] = useState();

  const [weatherIsShown, setWeatherIsShown] = useState(false);
  const API_Key = process.env.API_KEY;

  const getYear = (date, years) => {
    date.setFullYear(date.getFullYear() - years);
    return date.toISOString().slice(0, 10);
  };

  const tenY = getYear(new Date(), 10);
  const twentyY = getYear(new Date(), 20);

  // Color selection logic
  const getColor = (weather) => {
    let color;
    if (weather <= -10) color = '#3055B4';
    else if (weather > -10 && weather <= 0) color = '#0f87ff';
    else if (weather > 0 && weather <= 10) color = '#1BAECE';
    else if (weather > 10 && weather <= 15) color = '#A6F1B2';
    else if (weather > 15 && weather <= 20) color = '#F1E9A6';
    else if (weather > 20 && weather <= 25) color = '#F1C1A6';
    else if (weather > 25 && weather <= 30) color = '#DF7171';
    else if (weather > 30) color = '#C04646';
    return color;
  };

  const getTrend = (now, ten, twenty) => {
    let trend = '';
    if (now < ten && ten < twenty) trend = '#468CC0'; //colding
    else if (now > ten && ten >= twenty) trend = '#AD3737'; //warming
    else if (now < ten && ten >= twenty) trend = '#B6B6B6'; //no trend
    else if ((now > ten && ten <= twenty) || (now < ten && ten >= twenty))
      trend = '#B6B6B6'; //no trend
    else trend = '#8FC7B3';
    return trend;
  };

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
        lon: lon,
      };

      setCurrentWeather(weatherData);
      setCurrentTemp(weatherData.temp);
      setNowColor(getColor(temp));
      console.log('current weather >>', data);

      const fetchTenY = async () => {
        const tenYearsAgoTemp = `https://api.openweathermap.org/data/3.0/onecall/day_summary?lat=${weatherData.lat}&lon=${weatherData.lon}&date=${tenY}&units=metric&appid=${API_Key}`;

        try {
          const res = await fetch(tenYearsAgoTemp);
          const data = await res.json();
          const temp = Math.floor(data.temperature.afternoon);
          console.log('ten years ago >>', data);
          // console.log(weather);

          setTenYWeather(temp);
          setTenYColor(await getColor(temp));
        } catch (error) {
          console.error('Error fetching ten years ago temp', error);
        }
      };
      await fetchTenY();

      const fetchTwentyY = async () => {
        const twentyYearsAgoTemp = `https://api.openweathermap.org/data/3.0/onecall/day_summary?lat=${weatherData.lat}&lon=${weatherData.lon}&date=${twentyY}&units=metric&appid=${API_Key}`;

        try {
          const res = await fetch(twentyYearsAgoTemp);
          const data = await res.json();
          const temp = Math.floor(data.temperature.afternoon);
          setTwentyYWeather(temp);
          setTwentyYColor(getColor(temp));
          console.log('twenty years ago >>', data);
        } catch (error) {
          console.error('Error fetching ten years ago temp', error);
        }
      };
      await fetchTenY();
      await fetchTwentyY();
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
    // console.log(getTrend(currentWeather, tenYWeather, twentyYWeather));
  }, [city]);

  // console.log(nowColor, tenYColor, twentyYColor);
  const handleClick = async (event) => {
    event.preventDefault();
    await fetchCurrent();
    setWeatherIsShown(true);
    // console.log('The weather in', city, 'is', currentWeather);
  };

  const handleChange = (event) => {
    setCity(event.target.value);
  };

  const RenderWeatherContainer = (colorNow) => {
    const { now, ten, twenty } = colorNow;
    // console.log(now, ten, twenty);

    return (
      <WeatherContainer now={now} ten={ten} twenty={twenty}
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
          backgroundColor: `linear-gradient(180deg, ${now}, ${ten}, ${twenty})`,
          transition: {
            ease: [0.165, 0.84, 0.44, 1],
            duration: 3,
          },
        }}
        viewport={{ once: true }}>
        <WeatherLineFlex style={{ alignItems: 'center' }}>
          <p>now</p>
          {/* <p style={{ fontSize: '24px', color: 'gray' }}>
            {currentWeather.weather}
          </p> */}
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
    );
  };

  return (
    <Wrapper 
      bgcolor={getTrend(currentTemp, tenYWeather, twentyYWeather)}
      initial={{
          opacity: 0,
          y: 10,
        }}
        animate={{
          opacity: 1,
          backgroundColor: getTrend(currentTemp, tenYWeather, twentyYWeather),
          y: 0,
          transition: {
            ease: [0.165, 0.84, 0.44, 1],
            duration: 2,
          },
        }}
        viewport={{ once: true }}>
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
          <RenderWeatherContainer
            now={nowColor}
            ten={tenYColor}
            twenty={twentyYColor}
          />
          <Form onSubmit={handleClick}>
            <Input
              id='city'
              required={true}
              type='text'
              placeholder='Type your city'
              onChange={handleChange}
              value={city}
            />
            <Button onClick={handleClick}>Get Weather</Button>
          </Form>
        </VertFlex>
      )}
    </Wrapper>
  );
};

const Wrapper = styled(motion.div)`
  background-color: ${({ bgcolor }) => bgcolor};
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
`;
const VertFlex = styled.div`
  width: 100%;
  margin: 40px;
  display: flex;
  gap: 20px;
  flex-direction: column;
  justify-content: space-between;
`;
const FormContainer = styled.div`
  margin: 0px 40px;
  width: 100%;
  display: flex;
  align-self: center;
`;
const WeatherContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: ${({ now, ten, twenty }) =>
    `linear-gradient(180deg, ${now}, ${ten}, ${twenty})`};
  height: 100%;
  padding: 20px;
  border-radius: var(--border-radius);
`;

export default Visualization;
