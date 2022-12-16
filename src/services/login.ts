import baseAxios from "../axios/config";

export async function authUser(data: any) {
  let response = await baseAxios.post("/authUser", data);
  return await response.data;
}

export async function getUserData(token: String, email: String) {
  let data = { email };
  let response = await baseAxios.post("/getUserData", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return await response.data;
}
