import * as yup from 'yup';

export const rideBookerValidationSchema = yup.object().shape({
  booking_info: yup.string().required(),
  user_id: yup.string().nullable(),
});
