import React from 'react';
import styled from 'styled-components';
import { IWeatherIconProps, IWeatherForecastProps, IChartOptionParams } from './WeatherBlock.typings';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const WeatherBlock: React.FC<{ forecastData: IWeatherForecastProps | null }> = ({ forecastData }) => {
    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        return `${date.getDate()} ${date.toLocaleString('en-US', { month: 'long' })}`;
    };

    const getChartOptions = ({ title, dataKey, unit, suffix }: IChartOptionParams) => ({
        chart: {
            type: 'line'
        },
        title: {
            text: title
        },
        xAxis: {
            categories: forecastData?.forecast.forecastday.map(day => formatDate(day.date))
        },
        yAxis: {
            title: {
                text: unit
            }
        },
        accessibility: {
            enabled: false
        },
        series: [{
            name: title,
            data: forecastData?.forecast.forecastday.map(day => day.day[dataKey]),
            tooltip: {
                valueSuffix: suffix
            }
        }],
        responsive: {
            rules: [{
                condition: {
                    maxWidth: 500
                },
                chartOptions: {
                    legend: {
                        layout: 'horizontal',
                        align: 'center',
                        verticalAlign: 'bottom'
                    }
                }
            }]
        }
    });

    const getTemperatureChartOptions = () => ({
        chart: {
            type: 'line'
        },
        title: {
            text: 'Temperature Forecast (°C)'
        },
        xAxis: {
            categories: forecastData?.forecast.forecastday.map(day => formatDate(day.date))
        },
        yAxis: {
            title: {
                text: 'Temperature (°C)'
            }
        },
        accessibility: {
            enabled: false
        },
        series: [{
            name: 'Max Temp (°C)',
            data: forecastData?.forecast.forecastday.map(day => day.day.maxtemp_c),
            tooltip: {
                valueSuffix: ' °C'
            }
        }, {
            name: 'Min Temp (°C)',
            data: forecastData?.forecast.forecastday.map(day => day.day.mintemp_c),
            tooltip: {
                valueSuffix: ' °C'
            }
        }],
        responsive: {
            rules: [{
                condition: {
                    maxWidth: 500
                },
                chartOptions: {
                    legend: {
                        layout: 'horizontal',
                        align: 'center',
                        verticalAlign: 'bottom'
                    }
                }
            }]
        }
    });

    return (
        <CurrentWeatherBlock>
            {forecastData ? (
                <>
                    <p>Current weather in {forecastData.location.name}, {forecastData.location.country}:</p>
                    <TemperatureIconAndDetails>
                        <WeatherIcon iconUrl={forecastData.current.condition.icon} />
                        <TemperatureDetails>
                            <h3>{forecastData.current.temp_c}°C, {forecastData.current.condition.text}</h3>
                            <p>Local time: {(forecastData.location.localtime).split(' ').slice(-1)}</p>
                        </TemperatureDetails>
                    </TemperatureIconAndDetails>

                    {forecastData.forecast.forecastday.length === 1 ? (
                        <p>Weather forecast for {forecastData.forecast.forecastday.length} day:</p>
                    ) : (
                        <p>Weather forecast for {forecastData.forecast.forecastday.length} days:</p>
                    )}
                
                    <HighchartsReact 
                        highcharts={Highcharts}
                        options={getTemperatureChartOptions()}
                    />
                    <HighchartsReact
                        highcharts={Highcharts}
                        options={getChartOptions({ 
                            title: 'Max Wind Speed (kph)', 
                            dataKey: 'maxwind_kph', 
                            unit: 'Wind Speed (kph)', 
                            suffix: ' kph'
                        })} 
                    />
                    <HighchartsReact
                        highcharts={Highcharts} 
                        options={getChartOptions({ 
                            title: 'Average Humidity (%)', 
                            dataKey: 'avghumidity', unit: 'Humidity (%)', 
                            suffix: ' %' 
                        })} 
                    />
                </>
            ) : (
                <p>Click show to see weather forecast</p>
            )}
        </CurrentWeatherBlock>
    );
};

export default WeatherBlock;

const WeatherIcon = ({ iconUrl }: IWeatherIconProps) => {
    const validUrl = iconUrl.startsWith('//') ? 'https:' + iconUrl : iconUrl;

    return (
        <WeatherImage src={validUrl} alt="Weather Icon" />
    );
};

const WeatherImage = styled.img`
    width: 80px;
`;

const CurrentWeatherBlock = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding-top: 16px;
    border-top: 1px solid black;
    padding: 30px 20px;
`;

const TemperatureIconAndDetails = styled.div`
    display: flex;
    flex-direction: row;
    gap: 16px;
`;

const TemperatureDetails = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
`;

