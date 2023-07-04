import * as yup from 'yup';

export const paymentManagerValidationSchema = yup.object().shape({
  payment_info: yup.string().required(),
  user_id: yup.string().nullable(),
});
