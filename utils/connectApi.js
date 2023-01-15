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
  return fetch("http://172.31.47.150:3002/" + endpoint, dict).then((data) =>
    data.json()
  );
}
