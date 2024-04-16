import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { WEATHER_API_KEY } from "../../config";
import { IWeatherForecastProps } from "../../components/weatherBlock/WeatherBlock.typings";
import { WeatherState } from "./WeatherSlice.typings";

export const getWeatherData = createAsyncThunk<IWeatherForecastProps | null, { city: string; days: string }>(
  "weather/getWeather",
  async ({ city, days }, { rejectWithValue }) => {
    try {
      const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${WEATHER_API_KEY}&q=${city}&days=${days}`);
      if (!response.ok) throw new Error('Network response was not ok.');
      return await response.json() as IWeatherForecastProps;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('An unexpected error occurred');
    }
  }
);

const initialState: WeatherState = {
  forecastLoading: false,
  forecastData: null,
  forecastError: null,
};

export const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getWeatherData.pending, (state) => {
        state.forecastLoading = true;
        state.forecastData = null;
        state.forecastError = null;
      })
      .addCase(getWeatherData.fulfilled, (state, action: PayloadAction<IWeatherForecastProps | null>) => {
        state.forecastLoading = false;
        state.forecastData = action.payload;
      })
      .addCase(getWeatherData.rejected, (state, action) => {
        state.forecastLoading = false;
        state.forecastError = action.error.message ?? 'Unknown error';
      });
  },
});

export default weatherSlice.reducer;
