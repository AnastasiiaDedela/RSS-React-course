import {
  createApi,
  fetchBaseQuery,
  UseQuery,
} from '@reduxjs/toolkit/query/react';
import { Hero } from '../../types/types';

export const heroesApi = createApi({
  reducerPath: 'heroApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://swapi.dev/api/',
  }),
  endpoints: (builder) => ({
    getHeroes: builder.query<
      { results: Hero[]; count: number },
      { page: number; searchValue?: string }
    >({
      query: ({ page, searchValue }) => {
        let url = `people/?page=${page}`;
        if (searchValue) {
          url += `&search=${searchValue}`;
        }
        return url;
      },
      transformResponse: (response: { results: Hero[]; count: number }) => {
        const transformedResults = response.results.map((hero: Hero) => {
          const id = hero.url.split('/').slice(-2, -1)[0];
          return {
            ...hero,
            image: `https://starwars-visualguide.com/assets/img/characters/${id}.jpg`,
          };
        });
        return { ...response, results: transformedResults };
      },
    }),
  }),
});

export const {
  useGetHeroesQuery,
}: {
  useGetHeroesQuery: UseQuery<
    { results: Hero[]; count: number },
    { page: number; searchValue?: string },
    never,
    { heroApi: string }
  >;
} = heroesApi;
