export interface IWeatherFormProps {
    currentCity: string;
    amountOfDays: string;
    onCityChange: (newValue: string) => void;
    onDaysChange: (newValue: string) => void;
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}