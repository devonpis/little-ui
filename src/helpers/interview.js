import cloneDeep from "lodash/cloneDeep";

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

const tasks = [
  { id: "a", dependsOn: [] },
  { id: "b", dependsOn: ["a"] },
  { id: "c", dependsOn: ["b"] },
  { id: "d", dependsOn: ["b", "c"] },
];

export function resolveTaskOrder(tasks) {
  const graph = new Map();
  const visited = new Set();
  const visiting = new Set();
  const result = [];

  // Build graph (task.id => dependsOn array)
  for (const task of tasks) {
    graph.set(task.id, task.dependsOn);
  }
  console.log("graph", graph);

  function dfs(taskId) {
    console.log("visited", taskId, visited);
    console.log("visiting", taskId, visiting);
    if (visited.has(taskId)) return;

    if (visiting.has(taskId)) {
      throw new Error(`Circular dependency detected at "${taskId}"`);
    }

    visiting.add(taskId);

    const deps = graph.get(taskId) || [];
    for (const dep of deps) {
      if (!graph.has(dep)) {
        throw new Error(`Unknown dependency "${dep}"`);
      }
      dfs(dep);
    }

    visiting.delete(taskId);
    visited.add(taskId);
    console.log("result.push", taskId);
    result.push(taskId);
  }

  for (const task of tasks) {
    dfs(task.id);
  }

  return result;
}
