import axios from 'axios';
import {GET_POSTAL_ADDRESS, GOOGLE_MAP_API} from '../config/endpoints';
import ApiInstance from '../utils/ApiInstance';

export const SearchLocation = async location => {
  const resp = await axios.get(
    'https://maps.googleapis.com/maps/api/geocode/json',
    {
      params: {
        address: location,
        key: 'AIzaSyAJ_qAklmjyYP_fo6as_npbuVTslECfr_A',
      },
    },
  );
  return resp.data.results[0].geometry.location;
};

export const GetPostalAddress = async (lat, lng) => {
  const location = lat + ',' + lng;

  try {
    const response = await ApiInstance({
      method: 'GET',
      url: `${GET_POSTAL_ADDRESS}?address=${location}&key=${GOOGLE_MAP_API}`,
    });

    return Promise.resolve(response);
  } catch (error) {
    return Promise.reject('lp==>', error);
  }
  // const resp = await axios.get(
  //   'https://maps.googleapis.com/maps/api/geocode/json',
  //   {
  //     params: {
  //       address: location,
  //       key: 'AIzaSyAJ_qAklmjyYP_fo6as_npbuVTslECfr_A',
  //     },
  //   },
  // );
  // return resp.data.results[0];
};
