import { addDoc, collection, getDocs, query } from "@firebase/firestore";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { useAppDispatch } from "../app/hooks";
import { RootState, AppThunk } from "../app/store";
import { db } from "../firebase";

export interface appState {
    roomId: string | null;
    roomName: string | null;
    status: "idle" | "loading" | "failed";
    rooms: any;
}

const initialState: appState = {
    roomId: null,
    roomName: null,
    status: "idle",
    rooms: [],
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

export const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        enterRoom: (state, action) => {
            state.roomId = action.payload.roomId;
            state.roomName = action.payload.roomName;
        },
        getRooms: (state, action) => {
            state.rooms = action.payload;
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
            });
    },
});

export const { enterRoom, getRooms } = appSlice.actions;

export const selectRoomId = (state: RootState) => state.app.roomId;

export default appSlice.reducer;
