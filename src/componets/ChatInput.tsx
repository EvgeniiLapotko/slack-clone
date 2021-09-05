import { Button } from "@material-ui/core";
import React from "react";

import styled from "styled-components";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import { getMessagesRoomAsync } from "../features/appSlice";
import { useDispatch } from "react-redux";

interface IChatInput {
    idRoom: string | null;
    room: string | null;
}

const ChatInput: React.FC<IChatInput> = ({
    idRoom,
    room,
}: IChatInput): React.ReactElement => {
    const inputRef = React.useRef(null);
    const [inputValue, setInputValue] = React.useState<string>("");
    const dispatch = useDispatch();

    const handleChange = (e: any) => {
        setInputValue(e.target.value);
    };

    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        setInputValue("");
        if (!idRoom) {
            return false;
        } else {
            try {
                await addDoc(collection(db, `rooms/${idRoom}/message`), {
                    message: inputValue,
                    name: "Sonny",
                    img: "https://pbs.twimg.com/profile_images/1401065718918127617/yjGtFKJ4_400x400.jpg",
                    timestamp: serverTimestamp(),
                });
            } catch (error) {
                console.log(error);
            }
        }
        dispatch(getMessagesRoomAsync(idRoom));
    };
    return (
        <ChatInputContainer>
            <form onSubmit={handleSubmit}>
                <input
                    ref={inputRef}
                    value={inputValue}
                    onChange={handleChange}
                    type="text"
                    placeholder={`Сообщение ${room ? "#" + room : ""}`}
                />
                <Button type="submit">Send</Button>
            </form>
        </ChatInputContainer>
    );
};

export default ChatInput;

const ChatInputContainer = styled.div`
    border-radius: 20px;
    form {
        position: relative;
        display: flex;
        justify-content: center;
        input {
            position: fixed;
            bottom: 30px;
            width: 60%;
            border-radius: 5px;
            border: 1px solid gray;
            padding: 20px;
            outline: none;
        }
        button {
            display: none;
        }
    }
`;
