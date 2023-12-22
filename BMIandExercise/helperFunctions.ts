export const readCmdLine = () => {
  const args = process.argv;
  args.splice(0, 2);
  const result = args.map((value) => Number(value));
  return result;
};
