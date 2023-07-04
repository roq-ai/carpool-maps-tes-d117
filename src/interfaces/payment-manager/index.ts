import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface PaymentManagerInterface {
  id?: string;
  payment_info: string;
  user_id?: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  _count?: {};
}

export interface PaymentManagerGetQueryInterface extends GetQueryInterface {
  id?: string;
  payment_info?: string;
  user_id?: string;
}
