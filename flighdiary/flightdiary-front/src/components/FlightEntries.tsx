import { Flights, Flight } from "../types";
import SingleEntry from "./SingleEntry";

const FlightEntries = ({ flights }: Flights) => {
  return (
    <>
      <h2>Flight entries:</h2>
      {flights.map((flight: Flight) => {
        return <SingleEntry key={flight.id} {...flight} />;
      })}
    </>
  );
};

export default FlightEntries;
