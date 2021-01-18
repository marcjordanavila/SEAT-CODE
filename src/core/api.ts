import axios, { AxiosResponse } from "axios";

import { ICities } from "../models/city";

const url: string = 'http://localhost:8080/cities';

export function deleteDBField(id: number): Promise<AxiosResponse<any>> {
  return axios
    .delete(`${url}/${id}`)
}

export function addDBField(cityToSave: ICities): Promise<AxiosResponse<any>> {
  return axios.post(url, {
    "id": cityToSave.id,
    "name": cityToSave.name,
    "country": cityToSave.country,
    "population": cityToSave.population,
    "latitude": cityToSave.latitude,
    "longitude": cityToSave.longitude
  })
}

export function getDBCities(): Promise<AxiosResponse<any>> {
  return axios.get<ICities[]>(url, {
    headers: {
      "Content-Type": "application/json",
    },
  })
}

