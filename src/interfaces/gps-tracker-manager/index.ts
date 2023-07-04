import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface GpsTrackerManagerInterface {
  id?: string;
  gps_info: string;
  user_id?: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  _count?: {};
}

export interface GpsTrackerManagerGetQueryInterface extends GetQueryInterface {
  id?: string;
  gps_info?: string;
  user_id?: string;
}
