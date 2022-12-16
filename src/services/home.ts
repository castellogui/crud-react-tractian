import baseAxios from "../axios/config";

export async function getUsersData(token: String) {
  let response = await baseAxios.get("/users/find", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return await response.data;
}

export async function getUnitsData(token: String) {
  let response = await baseAxios.get("/units/find", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return await response.data;
}

export async function getAssetsData(token: String) {
  let response = await baseAxios.get("/assets/find", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return await response.data;
}
