import { useState } from 'react';

export const getSearchURL = (q, n) =>
  `/api/search?q=${encodeURIComponent(q)}${n ? `&n=${Number(n)}` : ''}`;

export const fetchSuggestions = (q, n) =>
  fetch(getSearchURL(q, n)).then((response) =>
    response.ok
      ? response.json()
      : Promise.reject(new Error(response.statusText))
  );

export const useSuggestions = (delay) => {
  const [timeoutID, setTimeoutID] = useState(null);
  return (q, n = 5) =>
    new Promise((resolve, reject) => {
      if (timeoutID) clearTimeout(timeoutID);
      setTimeoutID(
        setTimeout(() => fetchSuggestions(q, n).then(resolve, reject), delay)
      );
    });
};
