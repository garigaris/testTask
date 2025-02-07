import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseApi = createApi({
  credentials: 'include', 
  reducerPath: 'baseApi', 
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000' }), 
  endpoints: (builder) => ({}), 
});

export default baseApi;