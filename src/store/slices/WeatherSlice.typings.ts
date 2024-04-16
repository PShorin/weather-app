import { IWeatherForecastProps } from "../../components/weatherBlock/WeatherBlock.typings";

export interface WeatherState {
    forecastLoading: boolean;
    forecastData: IWeatherForecastProps | null;
    forecastError: string | null;
}