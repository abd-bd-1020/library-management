const prod = {
  url: {
    API_URL: "http://127.0.0.1:8080",
  },
};
const dev = {
  url: {
    API_URL: "http://127.0.0.1:8080",
  },
};

function removeSpace(str) {
  if (!str) return;
  return str.replace(/\s+/g, "");
}

function getEnvConfig() {
  var config;
  // if (removeSpace(process.env.REACT_APP_ENV_VAR) === "development") {
  //   config = dev;
  // } else {
  //   config = prod;
  // }
  config = dev;
  return config;
}

export const ServerConfig = getEnvConfig();
