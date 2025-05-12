// import { simpleFetch } from "./simple-fetch/index.mjs";
const { simpleFetch } = require("./simple-fetch");

console.log("hello");

function delayFor(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const checkIsTokenExpired = (expires) => {
  console.log(Date.now(), expires)
  return Date.now() > expires;
};

const getToken = async () => {
  console.log("getToken");

  const response = await simpleFetch("/api/2/auth", {
    method: "POST",
    // headers: { headerOne: 1 },
    body: { apiKey: "4a8e3990b0e0559b77430f4ddb28a3cb" },
  });
  if (response.status !== 200)
    throw new Error(`getLatestBlog http status: ${response.status}`);

  // const response = await simpleFetch("/hello");
  const { token, expires } = response.response;
  console.log("token response", response);

  // console.log("checkIsTokenExpired", checkIsTokenExpired(expire));

  return { token, expires };
};

const getLatestBlog = async (token) => {
  console.log("getLatestBlog");

  const response = await simpleFetch("/api/blog/latest", {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (response.status !== 200)
    throw new Error(`getLatestBlog http status: ${response.status}`);

  console.log("response", response);

  return response.response;
};

const main = async () => {
  let cachedToken = await getToken();
  try {
    const { expires } = cachedToken;
    console.log("old", cachedToken.token);
    await delayFor(5000);

    console.log("checkIsTokenExpired", checkIsTokenExpired(expires));
    if (checkIsTokenExpired(expires)) {
      cachedToken = await getToken();
    }
    const { token } = cachedToken;

    console.log("new", token);
    const latestBlog = await getLatestBlog(token);
    console.log("latestBlog", latestBlog);
  } catch (err) {
    console.error(err);
  }
};

main();
