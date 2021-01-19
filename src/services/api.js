export const getData = async (apiEndpoint) => {
  const response = await fetch(apiEndpoint);
  const data = await response.json();
  return data;
}