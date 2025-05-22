export const createQueryString = ({
  nameValuePairs,
  searchParams,
}: {
  nameValuePairs: { name: string; value: string }[];
  searchParams: URLSearchParams;
}) => {
  const params = new URLSearchParams(searchParams.toString());
  nameValuePairs.forEach(({ name, value }) => {
    params.set(name, value);
  });
  return params.toString();
};
