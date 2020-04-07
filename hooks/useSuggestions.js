import { useState } from 'react';

const getSearchURL = (q, n) =>
  `/api/search?q=${encodeURIComponent(q)}${n ? `&n=${Number(n)}` : ''}`;

const fetchSuggestions = (q, n) =>
  fetch(getSearchURL(q, n)).then((response) =>
    response.ok
      ? response.json()
      : Promise.reject(new Error(response.statusText))
  );

export const useSuggestions = (delay) => {
  const [suggestions, setSuggestions] = useState([]);
  const [timeoutID, setTimeoutID] = useState(null);
  const loadSuggestions = (q, n = 5) =>
    new Promise((resolve, reject) => {
      if (timeoutID) clearTimeout(timeoutID);
      setTimeoutID(
        setTimeout(() => fetchSuggestions(q, n).then(resolve, reject), delay)
      );
    }).then(setSuggestions, () => {});
  return { suggestions, loadSuggestions };
};
