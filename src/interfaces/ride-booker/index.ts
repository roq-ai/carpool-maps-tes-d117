import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface RideBookerInterface {
  id?: string;
  booking_info: string;
  user_id?: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  _count?: {};
}

export interface RideBookerGetQueryInterface extends GetQueryInterface {
  id?: string;
  booking_info?: string;
  user_id?: string;
}
