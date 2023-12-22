interface ErrorProps {
  errorMessage: string;
}

const ErrorBarr = (props: ErrorProps) => {
  const style = {
    color: "red",
  };

  const message = props.errorMessage.slice(21);

  return <b style={style}>{message}</b>;
};

export default ErrorBarr;
