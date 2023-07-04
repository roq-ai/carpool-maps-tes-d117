import * as yup from 'yup';

export const gpsTrackerManagerValidationSchema = yup.object().shape({
  gps_info: yup.string().required(),
  user_id: yup.string().nullable(),
});
