import React from 'react';
import { IWeatherFormProps } from './Header.typings';
import styled from 'styled-components';
import { PrimaryButton, SearchBox, SpinButton } from '@fluentui/react';

const WeatherForm: React.FC<IWeatherFormProps> = ({
  currentCity,
  amountOfDays,
  onCityChange,
  onDaysChange,
  onSubmit
}) => {
  return (
    <form onSubmit={onSubmit}>
        <HorizontalStack>
            <h4>City:</h4>
            <StyledSearchBox
                value={currentCity}
                disableAnimation={false}
                onChange={(e, newValue: string | undefined) => onCityChange(newValue || '')}
            />
            <h4>Days:</h4>
            <StyledSpinButton
                value={amountOfDays}
                onChange={(e, newValue: string | undefined) => onDaysChange(newValue || '')}
                min={1}
                max={10}
            />
            <PrimaryButton text="Show" type="submit" />
        </HorizontalStack>
    </form>
  );
};

export default WeatherForm;

const HorizontalStack = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 16px;
  padding: 30px 20px;

  @media (max-width: 600px) {
    h4 {
      display: none;
    }
  }

  @media (max-width: 500px) {
    flex-direction: column;
    align-items: normal;
  }
`;

const StyledSearchBox = styled(SearchBox)`
  width: 70%;

  @media (max-width: 500px) {
    width: 100%;
  }
`;

const StyledSpinButton = styled(SpinButton)`
  width: 20%;
`;
