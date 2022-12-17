import baseAxios from "../axios/config";

export async function editUnitData(token: String | undefined, data: any, id: string | undefined) {
  let response = await baseAxios.put(`/units/edit/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return await response.data;
}

export async function moveUnit(token: String | undefined, data: any, id: string | undefined) {
  let response = await baseAxios.put(`/companies/moveUnit/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return await response.data;
}

export async function moveUser(token: String | undefined, data: any, id: string | undefined) {
  let response = await baseAxios.put(`/companies/moveUser/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return await response.data;
}

export async function moveAsset(token: String | undefined, data: any, id: string | undefined) {
  let response = await baseAxios.put(`/units/moveAsset/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return await response.data;
}
