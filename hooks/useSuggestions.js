import { useState } from 'react';

const SEARCH_URL = '/api/search?q=';

export const fetchSuggestions = (input) =>
  fetch(`${SEARCH_URL}${encodeURIComponent(input)}`).then((response) =>
    response.ok
      ? response.json()
      : Promise.reject(new Error(response.statusText))
  );

export const useSuggestions = (delay) => {
  const [timeoutID, setTimeoutID] = useState(null);
  return (input) =>
    new Promise((resolve, reject) => {
      if (timeoutID) clearTimeout(timeoutID);
      setTimeoutID(
        setTimeout(() => fetchSuggestions(input).then(resolve, reject), delay)
      );
    });
};
