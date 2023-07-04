import axios from 'axios';
import queryString from 'query-string';
import { PaymentManagerInterface, PaymentManagerGetQueryInterface } from 'interfaces/payment-manager';
import { GetQueryInterface } from '../../interfaces';

export const getPaymentManagers = async (query?: PaymentManagerGetQueryInterface) => {
  const response = await axios.get(`/api/payment-managers${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createPaymentManager = async (paymentManager: PaymentManagerInterface) => {
  const response = await axios.post('/api/payment-managers', paymentManager);
  return response.data;
};

export const updatePaymentManagerById = async (id: string, paymentManager: PaymentManagerInterface) => {
  const response = await axios.put(`/api/payment-managers/${id}`, paymentManager);
  return response.data;
};

export const getPaymentManagerById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/payment-managers/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deletePaymentManagerById = async (id: string) => {
  const response = await axios.delete(`/api/payment-managers/${id}`);
  return response.data;
};
