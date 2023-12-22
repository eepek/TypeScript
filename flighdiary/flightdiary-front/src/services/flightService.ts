import axios from "axios";
import { Flight, NewFlight } from "../types";

const baseUrl = "http://localhost:3000/api/diaries";

const getFlights = async () => {
  const reply = await axios.get<Flight[]>(baseUrl);
  return reply.data;
};

const addNewFlight = async (flight: NewFlight) => {
  const { data } = await axios.post<Flight>(baseUrl, flight);
  return data;
};

export { getFlights, addNewFlight };
