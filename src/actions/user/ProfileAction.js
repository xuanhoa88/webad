import httpClient from '../Http';

// Fetch profile
export const FETCH_USER_PROFILE = 'FETCH_USER_PROFILE';
export const FETCH_USER_PROFILE_SUCCESS = 'FETCH_USER_PROFILE_SUCCESS';
export const FETCH_USER_PROFILE_FAILURE = 'FETCH_USER_PROFILE_FAILURE';

// Update profile
export const UPDATE_USER_PROFILE = 'UPDATE_USER_PROFILE';
export const UPDATE_USER_PROFILE_SUCCESS = 'UPDATE_USER_PROFILE_SUCCESS';
export const UPDATE_USER_PROFILE_FAILURE = 'UPDATE_USER_PROFILE_FAILURE';

// Fetch occupations
export const FETCH_ALL_OCCUPATIONS = 'FETCH_ALL_OCCUPATIONS';
export const FETCH_ALL_OCCUPATIONS_SUCCESS = 'FETCH_ALL_OCCUPATIONS_SUCCESS';
export const FETCH_ALL_OCCUPATIONS_FAILURE = 'FETCH_ALL_OCCUPATIONS_FAILURE';

// Fetch countries
export const FETCH_ALL_COUNTRIES = 'FETCH_ALL_COUNTRIES';
export const FETCH_ALL_COUNTRIES_SUCCESS = 'FETCH_ALL_COUNTRIES_SUCCESS';
export const FETCH_ALL_COUNTRIES_FAILURE = 'FETCH_ALL_COUNTRIES_FAILURE';

// Fetch districts
export const FETCH_ALL_DISTRICTS = 'FETCH_ALL_DISTRICTS';
export const FETCH_ALL_DISTRICTS_SUCCESS = 'FETCH_ALL_DISTRICTS_SUCCESS';
export const FETCH_ALL_DISTRICTS_FAILURE = 'FETCH_ALL_DISTRICTS_FAILURE';

export function fetchUserProfile(params) {
  return {
    type: FETCH_USER_PROFILE,
    payload: httpClient.get('/api/users/info', {
      params,
    })
  };
}

export function updateUserProfile(formData) {
  return {
    type: UPDATE_USER_PROFILE,
    payload: httpClient.post('/api/users/update?token=' + formData.token, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    })
  };
}

export function getAllOccupations() {
  return {
    type: FETCH_ALL_OCCUPATIONS,
    payload: httpClient.get('/api/defaults/occupations')
  };
}

export function getAllCountries() {
  return {
    type: FETCH_ALL_COUNTRIES,
    payload: httpClient.get('/api/defaults/countries')
  };
}

export function getAllDistricts(params) {
  return {
    type: FETCH_ALL_DISTRICTS,
    payload: httpClient.get('/api/defaults/countries/areas', {
      params
    })
  };
}
