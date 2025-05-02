import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";


export const useChatStore = create((set,get) => ({
    messages: [],
    users: [],
    selectedUser: null,
    isUsersLoading: false,
    isMessagesLoading: false,

    getUsers: async () => {
        set({isUsersLoading: true});
        try{
            const res = await axiosInstance.get("/messages/users");
            set({users: res.data});
        }catch (error){
            toast.error(error.response.data.message);
        }finally{
            set({isUsersLoading: false});
        }
    },


    getMessages: async (userId) => {
        set({isMessagesLoading: true});
        try{
            const res = await axiosInstance.get(`/messages/${userId}`);
            set({messages: res.data});

        }catch (error){
            toast.error(error.response.data.message);
        }finally{
            set({isMessagesLoading: false});
        }

    },

    sendMessage: async (messageData) => {
        const {selectedUser, messages} = get();
        try {
            if (!selectedUser?._id) {
                throw new Error('No user selected');
            }
            const res = await axiosInstance.post(`messages/send/${selectedUser._id}`, messageData);
            if (!res?.data) {
                throw new Error('Invalid response from server');
            }
            set({messages: [...messages, res.data]});
            return { success: true, data: res.data };
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message || 'Failed to send message';
            return { success: false, error: errorMessage };
        }
    },

    setSelectedUser: (selectedUser) => set({selectedUser}),

}))