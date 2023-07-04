import axios from 'axios';
import queryString from 'query-string';
import { RideBookerInterface, RideBookerGetQueryInterface } from 'interfaces/ride-booker';
import { GetQueryInterface } from '../../interfaces';

export const getRideBookers = async (query?: RideBookerGetQueryInterface) => {
  const response = await axios.get(`/api/ride-bookers${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createRideBooker = async (rideBooker: RideBookerInterface) => {
  const response = await axios.post('/api/ride-bookers', rideBooker);
  return response.data;
};

export const updateRideBookerById = async (id: string, rideBooker: RideBookerInterface) => {
  const response = await axios.put(`/api/ride-bookers/${id}`, rideBooker);
  return response.data;
};

export const getRideBookerById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/ride-bookers/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteRideBookerById = async (id: string) => {
  const response = await axios.delete(`/api/ride-bookers/${id}`);
  return response.data;
};
