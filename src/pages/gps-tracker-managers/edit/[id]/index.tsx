import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
  Center,
} from '@chakra-ui/react';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useFormik, FormikHelpers } from 'formik';
import { getGpsTrackerManagerById, updateGpsTrackerManagerById } from 'apiSdk/gps-tracker-managers';
import { Error } from 'components/error';
import { gpsTrackerManagerValidationSchema } from 'validationSchema/gps-tracker-managers';
import { GpsTrackerManagerInterface } from 'interfaces/gps-tracker-manager';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { UserInterface } from 'interfaces/user';
import { getUsers } from 'apiSdk/users';

function GpsTrackerManagerEditPage() {
  const router = useRouter();
  const id = router.query.id as string;
  const { data, error, isLoading, mutate } = useSWR<GpsTrackerManagerInterface>(
    () => (id ? `/gps-tracker-managers/${id}` : null),
    () => getGpsTrackerManagerById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: GpsTrackerManagerInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateGpsTrackerManagerById(id, values);
      mutate(updated);
      resetForm();
      router.push('/gps-tracker-managers');
    } catch (error) {
      setFormError(error);
    }
  };

  const formik = useFormik<GpsTrackerManagerInterface>({
    initialValues: data,
    validationSchema: gpsTrackerManagerValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Edit Gps Tracker Manager
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        {formError && (
          <Box mb={4}>
            <Error error={formError} />
          </Box>
        )}
        {isLoading || (!formik.values && !error) ? (
          <Center>
            <Spinner />
          </Center>
        ) : (
          <form onSubmit={formik.handleSubmit}>
            <FormControl id="gps_info" mb="4" isInvalid={!!formik.errors?.gps_info}>
              <FormLabel>Gps Info</FormLabel>
              <Input type="text" name="gps_info" value={formik.values?.gps_info} onChange={formik.handleChange} />
              {formik.errors.gps_info && <FormErrorMessage>{formik.errors?.gps_info}</FormErrorMessage>}
            </FormControl>
            <AsyncSelect<UserInterface>
              formik={formik}
              name={'user_id'}
              label={'Select User'}
              placeholder={'Select User'}
              fetcher={getUsers}
              renderOption={(record) => (
                <option key={record.id} value={record.id}>
                  {record?.email}
                </option>
              )}
            />
            <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
              Submit
            </Button>
          </form>
        )}
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'gps_tracker_manager',
    operation: AccessOperationEnum.UPDATE,
  }),
)(GpsTrackerManagerEditPage);