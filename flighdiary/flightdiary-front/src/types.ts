export interface Flight {
  id: number;
  date: string;
  weather: string;
  visibility: string;
  comment?: string;
}

export type NewFlight = Omit<Flight, "id">;

export interface Flights {
  flights: Flight[];
}

export interface AddNewFlightFunction {
  addNewFlightProp: (nf: NewFlight) => void;
}
