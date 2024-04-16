export interface IWeatherForecastProps {
    location: LocationProps;
    current: CurrentWeatherProps;
    forecast: {
        forecastday: ForecastForDayProps[]
    };
}
  
interface LocationProps {
    name: string;
    country: string;
    localtime: string;
}

interface CurrentWeatherProps {
    temp_c: number;
    condition: WeatherConditionProps;
}

interface WeatherConditionProps {
    text: string;
    icon: string;
}

interface ForecastForDayProps {
    date: string;
    day: {
        maxtemp_c: number;
        mintemp_c: number;
        maxwind_kph: number;
        avghumidity: number;
    }
}

export interface IWeatherIconProps {
    iconUrl: string;
}

export interface IChartOptionParams {
    title: string;
    dataKey: keyof ForecastForDayProps['day'];
    unit: string;
    suffix: string;
}
