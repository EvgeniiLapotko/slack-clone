import {
    addDoc,
    collection,
    getDocs,
    orderBy,
    query,
} from "@firebase/firestore";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { RootState } from "../app/store";
import { db } from "../firebase";

export interface Iroom {
    id: string;
    room: string;
}
export interface Imessage {
    id: string;
    message: string;
    img: string;
    name: string;
    time: number;
}
export interface IUser {
    name: string;
    userAvatar: string;
    nikName: string;
}

export interface appState {
    roomId: string | null;
    roomName: string | null;
    status: "idle" | "loading" | "failed";
    rooms: Iroom[];
    messages: Imessage[];
    user: IUser | null;
}

const initialState: appState = {
    roomId: null,
    roomName: null,
    status: "idle",
    rooms: [],
    messages: [],
    user: null,
};

export const addRoomsAsync = createAsyncThunk(
    "rooms/fetchRooms",
    async (nameChanel: string) => {
        try {
            const docRef = await addDoc(collection(db, "rooms"), {
                name: nameChanel,
            });
            console.log("Document written " + docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }
);

export const getRoomsAsync = createAsyncThunk(
    "rooms/fetchGetRooms",
    async () => {
        const querySnapshot = await getDocs(query(collection(db, "/rooms")));
        const rooms: any = [];

        querySnapshot.forEach((doc) => {
            rooms.push({ id: doc.id, room: doc.data().name });
        });

        return rooms;
    }
);
export const getMessagesRoomAsync = createAsyncThunk(
    "messages/fetchGetMessagesRoom",
    async (id: string) => {
        try {
            const queryMessages = await getDocs(
                query(
                    collection(db, `/rooms/${id}/message`),
                    orderBy("timestamp", "asc")
                )
            );

            const messages: any = [];
            queryMessages.forEach((doc) => {
                messages.push({
                    id: doc.id,
                    message: doc.data().message,
                    img: doc.data().img,
                    name: doc.data().name,
                    time: doc.data().timestamp.seconds,
                });
            });

            return messages;
        } catch (error) {
            console.log(error);
        }
    }
);

export const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        enterRoom: (state, action) => {
            state.roomId = action.payload.roomId;
            state.roomName = action.payload.roomName;
        },

        getMessagesRoom: (state, action) => {
            state.messages = action.payload;
        },
        setUser: (state, action) => {
            state.user = action.payload;
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(addRoomsAsync.pending, (state) => {
                state.status = "loading";
            })
            .addCase(addRoomsAsync.fulfilled, (state, action) => {
                state.status = "idle";
            })
            .addCase(getRoomsAsync.fulfilled, (state, action) => {
                state.status = "idle";
                state.rooms = action.payload;
            })
            .addCase(getMessagesRoomAsync.pending, (state) => {
                state.status = "loading";
            })
            .addCase(getMessagesRoomAsync.fulfilled, (state, action) => {
                state.status = "idle";
                state.messages = action.payload;
            });
    },
});

export const { enterRoom, getMessagesRoom, setUser } = appSlice.actions;

export const selectRoomId = (state: RootState) => state.app.roomId;
export const selectRoomName = (state: RootState) => state.app.roomName;
export const selectMessages = (state: RootState) => state.app.messages;
export const selectStatus = (state: RootState) => state.app.status;
export const selectUser = (state: RootState) => state.app.user;

export default appSlice.reducer;
