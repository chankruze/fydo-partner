import axios from 'axios';

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
