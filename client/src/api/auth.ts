const URL_BASE = "http://localhost:8000/auth";

export const createAccount = async (username: string, password: string) => {
  const res = await fetch(URL_BASE + "/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
    }),
  });

  return res;
};

export const loginSession = async (username: string, password: string) => {
  const res = await fetch(URL_BASE + "/login", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
    }),
  });

  return res;
};
