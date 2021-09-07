import { Button } from "@material-ui/core";
import React from "react";

import styled from "styled-components";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import { getMessagesRoomAsync, selectUser } from "../features/appSlice";
import { useDispatch, useSelector } from "react-redux";

interface IChatInput {
    idRoom: string | null;
    room: string | null;
    refBottom: any;
}

const ChatInput: React.FC<IChatInput> = ({
    idRoom,
    room,
    refBottom,
}: IChatInput): React.ReactElement => {
    const inputRef = React.useRef(null);
    const [inputValue, setInputValue] = React.useState<string>("");
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
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
                if (user) {
                    await addDoc(collection(db, `rooms/${idRoom}/message`), {
                        message: inputValue,
                        name: user.name,
                        img: user.userAvatar,
                        timestamp: serverTimestamp(),
                    });
                }
            } catch (error) {
                console.log(error);
            }
        }
        if (refBottom) {
            refBottom.current.scrollIntoView({
                behavior: "smooth",
            });
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
            @media (max-width: 580px) {
                width: 90%;
            }
        }
        button {
            display: none;
        }
    }
`;
