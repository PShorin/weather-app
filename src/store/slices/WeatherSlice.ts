import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const WEATHER_API_KEY = '2119091749b44a42ad8130728241204'; // TODO: move to config (gitignore)

export const getWeatherData = createAsyncThunk(
  "weather/getWeather",
  async ({ city, days } : {city: string, days: string}) => { // ?
    try {
      const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${WEATHER_API_KEY}&q=${city}&days=${days}`);
      const data = await response.json();
      return data;
    } catch (error: any) { // TODO: change types?
      throw Error(error.message);
    }
  }
);

const weatherSlice = createSlice({
  name: "weather",
  initialState: {
    forecastLoading: false,
    forecastData: null as any, // TODO: change types?
    forecastError: null as string | undefined | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getWeatherData.pending, (state) => {
        state.forecastLoading = true;
        state.forecastData = null;
        state.forecastError = null;
      })
      .addCase(getWeatherData.fulfilled, (state, action) => {
        state.forecastLoading = false;
        state.forecastData = action.payload;
      })
      .addCase(getWeatherData.rejected, (state, action) => {
        state.forecastLoading = false;
        state.forecastError = action.error.message;
      });
  },
});

export default weatherSlice.reducer;
