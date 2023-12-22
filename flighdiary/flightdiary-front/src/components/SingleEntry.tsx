import { Flight } from "../types";

const SingleEntry = (props: Flight) => {
  return (
    <>
      <b>{props.date}</b>
      <ul>
        <li key={props.weather}>Weather: {props.weather}</li>
        <li key={props.visibility}>Visibility: {props.visibility}</li>
      </ul>
    </>
  );
};

export default SingleEntry;
