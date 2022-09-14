import qs from 'qs';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { updateQueryParams } from 'reducers/search';

export const useSetValuesByQuery = (values, setValue) => {
  const { search } = useLocation();
  const dispatch = useDispatch();
  const queryParams = qs.parse(search, { ignoreQueryPrefix: true });

  useEffect(() => {
    dispatch(updateQueryParams(queryParams));
    for (const param in queryParams) {
      if (values.hasOwnProperty(param)) {
        setValue(param, queryParams[param]);
      }
    }
  }, []);
};
