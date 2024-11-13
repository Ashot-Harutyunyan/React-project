import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const fetchSearchProduct = createApi({
    reducerPath: 'SearchProductApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com/products/' }),
    endpoints: (builder) => ({
        getSearchProduct: builder.query({
          query: ({ title }) => `/search?q=${title}`,
          providesTags: ['SearchProduct']
        })
    }),
})

export const { useGetSearchProductQuery } = fetchSearchProduct