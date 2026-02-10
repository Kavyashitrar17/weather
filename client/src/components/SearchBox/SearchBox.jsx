import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

export default function SearchBox({ updateWeatherInfo }) {
    let [city, setCity] = useState("");

    let handleChange = (evt) => {
        setCity(evt.target.value);
    };

    let handleSubmit = (evt) => {
        evt.preventDefault();
        updateWeatherInfo(city); // Triggers the fetch in parent
        setCity("");
    };

    return (
        <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
            <TextField 
                id="city" 
                label="City Name" 
                variant="outlined" 
                required 
                value={city} 
                onChange={handleChange} 
            />
            <br /><br />
            <Button variant="contained" type="submit">SEARCH</Button>
        </form>
    );
}