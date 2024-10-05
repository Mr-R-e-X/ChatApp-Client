import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { server } from "../../constants/config";

const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: `${server}/api` }),
  tagTypes: ["Chat", "User", "Messages"],
  endpoints: (builder) => ({
    userChats: builder.query({
      query: () => ({
        url: "/chats/get-chats",
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["Chat"],
    }),

    searchUser: builder.query({
      query: (name) => ({
        url: `/user/search?name=${name}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["User"],
    }),

    sendFriendRequest: builder.mutation({
      query: (data) => ({
        url: "/user/send-request",
        method: "POST",
        credentials: "include",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),

    getNotification: builder.query({
      query: () => ({
        url: `/user/notifications`,
        method: "GET",
        credentials: "include",
      }),
      keepUnusedDataFor: 0,
    }),

    acceptFriendRequest: builder.mutation({
      query: (data) => ({
        url: "/user/accept-request",
        method: "PUT",
        credentials: "include",
        body: data,
      }),
      invalidatesTags: ["Chat"],
    }),

    getChatDetails: builder.query({
      query: ({ chatId, populate = false }) => {
        let url = `/chats/${chatId}`;
        if (populate) {
          url += "?populate=true";
        }
        return {
          url,
          credentials: "include",
        };
      },
      providesTags: ["Chat"],
    }),

    getUserMessages: builder.query({
      query: ({ chatId, page }) => ({
        url: `/chats/messages/${chatId}?page=${page}`,
        credentials: "include",
      }),
      keepUnusedDataFor: 0,
    }),

    sendAttachments: builder.mutation({
      query: (data) => ({
        url: "/chats/message",
        method: "POST",
        credentials: "include",
        body: data,
      }),
    }),

    getUserFriends: builder.query({
      query: (chatId) => {
        let url = "/user/friends";
        if (chatId) url = `${url}?chatId=${chatId}`;
        return {
          url,
          credentials: "include",
        };
      },
      providesTags: ["Chat"],
    }),

    userGroups: builder.query({
      query: () => ({
        url: "/chats/get-groups",
        credentials: "include",
      }),
      providesTags: ["Chat"],
    }),

    createNewGroup: builder.mutation({
      query: ({ name, members }) => ({
        url: "/chats/new-group",
        method: "POST",
        credentials: "include",
        body: { name, members },
      }),
      invalidatesTags: ["Chat"],
    }),

    renameGroup: builder.mutation({
      query: ({ chatId, name }) => ({
        url: `/chats/${chatId}`,
        method: "PUT",
        credentials: "include",
        body: { name },
      }),
      invalidatesTags: ["Chat"],
    }),
    removeMemberFromGroup: builder.mutation({
      query: ({ chatId, userId }) => ({
        url: `/chats/remove-member`,
        method: "PUT",
        credentials: "include",
        body: { chatId, userId },
      }),
      invalidatesTags: ["Chat"],
    }),
    addMemberToGroup: builder.mutation({
      query: ({ members, chatId }) => ({
        url: `/chats/add-members`,
        method: "PUT",
        credentials: "include",
        body: { members, chatId },
      }),
      invalidatesTags: ["Chat"],
    }),
    deleteChat: builder.mutation({
      query: ({ id }) => ({
        url: `/chats/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["Chat"],
    }),
    leaveGroup: builder.mutation({
      query: ({ id }) => ({
        url: `/chats/leave/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["Chat"],
    }),
    assignGroupCreator: builder.mutation({
      query: ({ userId, chatId }) => ({
        url: "/chats/assign-creator",
        method: "PUT",
        credentials: "include",
        body: { userId, chatId },
      }),
      invalidatesTags: ["Chat"],
    }),
    assignGroupAdmin: builder.mutation({
      query: ({ userId, chatId }) => ({
        url: "/chats/assign-admin",
        method: "PUT",
        credentials: "include",
        body: { userId, chatId },
      }),
      invalidatesTags: ["Chat"],
    }),
  }),
});

export default api;
export const {
  useUserChatsQuery,
  useLazySearchUserQuery,
  useSendFriendRequestMutation,
  useGetNotificationQuery,
  useAcceptFriendRequestMutation,
  useGetChatDetailsQuery,
  useLazyGetChatDetailsQuery,
  useGetUserMessagesQuery,
  useSendAttachmentsMutation,
  useGetUserFriendsQuery,
  useUserGroupsQuery,
  useCreateNewGroupMutation,
  useRenameGroupMutation,
  useRemoveMemberFromGroupMutation,
  useAddMemberToGroupMutation,
  useDeleteChatMutation,
  useLeaveGroupMutation,
  useAssignGroupCreatorMutation,
  useAssignGroupAdminMutation,
} = api;
