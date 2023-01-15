import { API_URL } from "./config";

export async function SendRequest(
  method = "POST",
  endpoint = "profile",
  text = {}
) {
  if (method === "GET" || method === "DELETE") {
    var dict = {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
    };
  } else {
    var dict = {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(text),
    };
  }
  return fetch(API_URL + endpoint, dict).then((data) =>
    data.json()
  );
}
