export function fetchUsers() {
  return fetch("https://jsonplaceholder.typicode.com/users");
}

function delayFor(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function fetchWithRetry(
  url,
  options = { maxRetries: 3, delay: 500 }
) {
  const { maxRetries, delay } = options;
  let attemptCount = 0;
  const fetchUrl = async () => {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      return data;
    } catch (err) {
      if (attemptCount < maxRetries) {
        attemptCount++;
        await delayFor(delay);
        return await fetchUrl();
      } else {
        err.message = `fetchWithRetry failed after ${attemptCount} retry attempts: ${err.message}`;
        throw err;
      }
    }
  };
  return await fetchUrl();
}
