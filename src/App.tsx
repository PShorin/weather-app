import * as React from 'react';
import { useState } from 'react';
import { createGlobalStyle } from 'styled-components';
import { initializeIcons } from '@fluentui/react/lib/Icons';
import { useAppDispatch, useAppSelector } from './store/store';
import { getWeatherData } from './store/slices/WeatherSlice';
import WeatherForm from './components/header/Header';
import WeatherBlock from './components/weatherBlock/WeatherBlock';

initializeIcons();

const App: React.FC = () => {
  const [currentCity, setCurrentCity] = useState('Moscow');
  const [amountOfDays, setAmountOfDays] = useState('1');
    
  const dispatch = useAppDispatch();
  const weather = useAppSelector((state) => state.weather);
  const { forecastData } = weather;
    
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('City:', currentCity, ', days - ', amountOfDays);
    dispatch(getWeatherData({ city: currentCity, days: amountOfDays }));
  };

  return (
    <>
      <GlobalResetStyles />
      <div>
        <header>
          <WeatherForm 
            currentCity={currentCity}
            amountOfDays={amountOfDays}
            onCityChange={setCurrentCity}
            onDaysChange={setAmountOfDays}
            onSubmit={handleSubmit}
          />
        </header>
        <main>
          <WeatherBlock
            forecastData={forecastData} 
          />
        </main>
      </div>
    </>
  );
};

export default App;

const GlobalResetStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: inherit;
  }
`;
