import * as React from 'react';
import { useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { SpinButton, SearchBox, PrimaryButton } from '@fluentui/react';
import { initializeIcons } from '@fluentui/react/lib/Icons';
// import { useWeatherData } from './api';
// import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import store, { useAppDispatch, useAppSelector } from './store/store';
import { getWeatherData } from './store/slices/WeatherSlice';

initializeIcons();

export default function App() { // убрать???
  return (
    <Provider store={store}>
      <WeatherApp />
    </Provider>
  )
}

const WeatherIcon = ({ iconUrl }: {iconUrl: string}) => { // fix type???
  const validUrl = iconUrl.startsWith('//') ? 'https:' + iconUrl : iconUrl;

  return (
    <WeatherImage src={validUrl} alt="Weather Icon" />
  );
};

const WeatherImage = styled.img`
  width: 64px;
`;

const WeatherApp: React.FC = () => {
  const [currentCity, setCurrentCity] = useState('Moscow');
  const [amountOfDays, setAmountOfDays] = useState('1');
    
  const dispatch = useAppDispatch();
  const weather = useAppSelector((state) => state.weather);
  const { forecastData, forecastLoading, forecastError } = weather;
    
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('City:', currentCity, ', days - ', amountOfDays);
    dispatch(getWeatherData({ city: currentCity, days: amountOfDays }));
  };

  console.log(forecastData, forecastLoading, forecastError);

  return (
    <>
      <GlobalResetStyles />
      <AppContainer>
        <header>
          <form onSubmit={handleSubmit}>
            <HorizontalStack>
              <h4>City:</h4>
              <StyledSearchBox
                value={currentCity}
                disableAnimation={false}
                onChange={(e, newValue: string | undefined) => setCurrentCity(newValue || '')}
              />
              <h4>Days:</h4>
              <StyledSpinButton
                value={amountOfDays}
                onChange={(e, newValue: string | undefined) => setAmountOfDays(newValue || '')}
                min={1}
                max={10}
              />
              <PrimaryButton text="Show" type="submit" />
            </HorizontalStack>
          </form>
        </header>
        <main>
          <CurrentWeatherBlock>
            {forecastData ? (
              <>
                <p>Current weather in {forecastData.location.name}, {forecastData.location.country}:</p>
                <WeatherIcon iconUrl={forecastData.current.condition.icon} />
                <p>{forecastData.current.temp_c}°C, {forecastData.current.condition.text}</p>
                <p>Local time: {(forecastData.location.localtime).split(' ').slice(-1)}</p>
                <CurrentWeatherDetails>
                  <DetailBlock>12</DetailBlock>
                </CurrentWeatherDetails>
              </>
            ) : (
              <p>Click show to see weather forecast</p>
            )}
          </CurrentWeatherBlock>
        </main>
      </AppContainer>
    </>
  );
};

const GlobalResetStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: inherit;
  }
`;

const AppContainer = styled.div`
  padding: 30px 20px;
`;

const HorizontalStack = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;

  @media (max-width: 550px) {
    h4 {
      display: none;
    }
  }
`;

const StyledSearchBox = styled(SearchBox)`
  width: 70%;
`;

const StyledSpinButton = styled(SpinButton)`
  width: 20%;
`;

const CurrentWeatherBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding-top: 16px;
  border-top: 1px solid black;
`;

const CurrentWeatherDetails = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
  padding-top: 16px;
`;

const DetailBlock = styled.div`
  padding: 8px;
  border: 1px solid black; // ?
`;
