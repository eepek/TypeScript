import { useState, useEffect } from "react";
import { Flight, NewFlight } from "./types";
import { getFlights, addNewFlight } from "./services/flightService";
import FlightEntries from "./components/FlightEntries";
import AddFlight from "./components/AddFlight";
import axios from "axios";
import ErrorBarr from "./components/ErrorBar";

function App() {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!flights.length) {
      getFlights().then((response) => {
        setFlights(flights.concat(response));
      });
    }
  }, []); //eslint-disable-line

  const errorHandler = (message: string) => {
    setErrorMessage(message);
    console.log(errorMessage);
    setTimeout(() => setErrorMessage(""), 5000);
  };

  const addNewFlightProp = async (newFlight: NewFlight) => {
    try {
      const reply = await addNewFlight(newFlight);
      setFlights(flights.concat(reply));
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message: string = error.response?.data;
        errorHandler(message);
      } else {
        console.log(error);
      }
    }
  };

  return (
    <>
      <ErrorBarr errorMessage={errorMessage} />
      <AddFlight addNewFlightProp={addNewFlightProp} />
      <FlightEntries flights={flights} />
    </>
  );
}

export default App;
