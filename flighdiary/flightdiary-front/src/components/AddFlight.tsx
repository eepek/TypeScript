import { SyntheticEvent, useEffect, useState } from "react";
import { NewFlight, AddNewFlightFunction } from "../types";

const AddFlight = ({ addNewFlightProp }: AddNewFlightFunction) => {
  const [date, setDate] = useState("");
  const [weather, setWeather] = useState("");
  const [visibility, setVisibility] = useState("");
  const [comment, setComment] = useState("");
  const visibilities = ["great", "good", "ok", "poor"];
  const weathers = ["sunny", "rainy", "stormy", "windy"];

  useEffect(() => {
    currentDate();
  }, []);

  const currentDate = () => {
    const currentTime = new Date();
    const month = currentTime.getMonth() + 1;
    const day = currentTime.getDay();
    const year = currentTime.getFullYear();
    setDate(`${year}-${month}-${day}`);
  };

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    const newFlight: NewFlight = {
      date: date,
      weather: weather,
      visibility: visibility,
      comment: comment,
    };
    addNewFlightProp(newFlight);
    currentDate();
    setVisibility("");
    setWeather("");
    setComment("");
  };

  return (
    <>
      <h2>Add a new flight:</h2>
      <form onSubmit={handleSubmit}>
        <b>Date:</b>
        <input
          type="date"
          value={date}
          max={date}
          onChange={(event) => setDate(event.target.value)}
        ></input>
        <br />
        <b>Weather:</b>
        {weathers.map((weather) => {
          return (
            <div key={weather}>
              {weather}
              <input
                type="radio"
                name="weather"
                key={weather}
                onChange={() => setWeather(weather)}
              />
            </div>
          );
        })}
        <br />
        <b>Visibility:</b>
        {visibilities.map((visibility) => {
          return (
            <div key={visibility}>
              {visibility}
              <input
                type="radio"
                name="visibility"
                onChange={() => setVisibility(visibility)}
              />
            </div>
          );
        })}
        <br />
        <b>Comment:</b>
        <input
          value={comment}
          onChange={(event) => setComment(event.target.value)}
        ></input>
        <br />
        <button type="submit">Add Flight</button> <br /> <br />
      </form>
    </>
  );
};

export default AddFlight;
