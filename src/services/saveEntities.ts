import baseAxios from "../axios/config";
import { UpdatedAsset } from "../interfaces/models/asset.interface";
import { UpdatedCompany } from "../interfaces/models/company.interface";

export async function editUnitData(token: String | undefined, data: any, id: string | undefined) {
  let response = await baseAxios.put(`/units/edit/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return await response.data;
}

export async function editCompanyData(
  token: String | undefined,
  data: UpdatedCompany,
  id: string | undefined
) {
  let response = await baseAxios.put(`/companies/edit/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return await response.data;
}

export async function editAssetData(
  token: String | undefined,
  data: UpdatedAsset,
  id: string | undefined
) {
  let response = await baseAxios.put(`/assets/edit/${id}`, data, {
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
