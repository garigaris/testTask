import { baseApi } from './baseApi';

const seminarsApi = baseApi.injectEndpoints({
  reducerPath: 'seminarsApi',
  endpoints: (builder) => ({
    // Получение семинаров
    getSeminars: builder.query({
      query: () => 'seminars',
      providesTags: ['Seminars'],  // Кэшируем данные под тегом Seminars
    }),

    // Удаление семинара
    deleteSeminar: builder.mutation({
      query: (id) => ({
        url: `seminars/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Seminars'],  // Инвалидируем тег Seminars после удаления
    }),

    // Редактирование семинара
    editSeminar: builder.mutation({
      query: (seminar) => ({
        url: `seminars/${seminar.id}`,
        method: 'PUT',
        body: seminar,
      }),
      invalidatesTags: ['Seminars'],  // Инвалидируем тег Seminars после редактирования
    }),
  }),
});

export default seminarsApi;
export const { useGetSeminarsQuery, useDeleteSeminarMutation, useEditSeminarMutation } = seminarsApi;
