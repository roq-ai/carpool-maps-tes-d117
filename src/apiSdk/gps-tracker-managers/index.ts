import axios from 'axios';
import queryString from 'query-string';
import { GpsTrackerManagerInterface, GpsTrackerManagerGetQueryInterface } from 'interfaces/gps-tracker-manager';
import { GetQueryInterface } from '../../interfaces';

export const getGpsTrackerManagers = async (query?: GpsTrackerManagerGetQueryInterface) => {
  const response = await axios.get(`/api/gps-tracker-managers${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createGpsTrackerManager = async (gpsTrackerManager: GpsTrackerManagerInterface) => {
  const response = await axios.post('/api/gps-tracker-managers', gpsTrackerManager);
  return response.data;
};

export const updateGpsTrackerManagerById = async (id: string, gpsTrackerManager: GpsTrackerManagerInterface) => {
  const response = await axios.put(`/api/gps-tracker-managers/${id}`, gpsTrackerManager);
  return response.data;
};

export const getGpsTrackerManagerById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/gps-tracker-managers/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteGpsTrackerManagerById = async (id: string) => {
  const response = await axios.delete(`/api/gps-tracker-managers/${id}`);
  return response.data;
};
