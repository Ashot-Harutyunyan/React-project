import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const fetchProductCategory = createApi({
    reducerPath: 'categoryApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com/products/' }),
    endpoints: (builder) => ({
        getProduct: builder.query({
          query: ({ name }) => `/category/${name}`,
          providesTags: ['category']
        })
    }),
})

export const { useGetProductQuery } = fetchProductCategory