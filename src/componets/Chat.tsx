import React from "react";

import StarIcon from "@material-ui/icons/StarBorder";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";

import styled from "styled-components";
import ChatInput from "./ChatInput";
import { useSelector } from "react-redux";
import {
    selectMessages,
    selectRoomId,
    selectRoomName,
    selectStatus,
} from "../features/appSlice";
import Message from "./Message";

const Chat: React.FC = (): React.ReactElement => {
    const roomId = useSelector(selectRoomId);
    const roomName = useSelector(selectRoomName);
    const messages = useSelector(selectMessages);
    const status = useSelector(selectStatus);
    const refBottom = React.useRef<HTMLDivElement>(
        document.createElement("div")
    );

    React.useEffect(() => {
        if (refBottom) {
            refBottom.current.scrollIntoView({
                behavior: "smooth",
            });
        }
    }, [roomId, status]);

    return (
        <ChatContainer>
            {roomName ? (
                <>
                    <ChatHeader>
                        <ChatHeaderLeft>
                            <h4>
                                <strong>#</strong> {roomName}
                            </h4>
                            <StarIcon />
                        </ChatHeaderLeft>
                        <ChatHeaderRight>
                            <InfoOutlinedIcon />
                            <p>Подробнее</p>
                        </ChatHeaderRight>
                    </ChatHeader>

                    <ChatMessagesWrapper>
                        <ChatMessages>
                            <>
                                {messages
                                    ? messages.map((item: any) => (
                                          <Message
                                              key={item.id}
                                              messageProps={item.message}
                                              time={item.time}
                                              user={item.name}
                                              userImg={item.img}
                                          />
                                      ))
                                    : false}
                            </>
                        </ChatMessages>
                    </ChatMessagesWrapper>

                    <ChatInput
                        idRoom={roomId}
                        room={roomName}
                        refBottom={refBottom}
                    />
                </>
            ) : (
                false
            )}
            <ChatMessagesBottom ref={refBottom}></ChatMessagesBottom>
        </ChatContainer>
    );
};

export default Chat;

const ChatContainer = styled.div`
    flex: 0.7;
    flex-grow: 1;
    overflow: auto;
    margin-bottom: 150px;
    margin-top: 66px;
`;
const ChatHeader = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 20px;
    border-bottom: 1px solid lightgray;
`;
const ChatHeaderLeft = styled.div`
    display: flex;
    align-items: center;
    h4 {
        display: flex;
        align-items: center;
        margin: 0;
        text-transform: lowercase;
        padding-bottom: 3px;
        margin-right: 20px;
        strong {
            display: inline-block;
            padding-top: 2px;
        }
    }
    .MuiSvgIcon-root {
        font-size: 18px;
    }
`;
const ChatHeaderRight = styled.div`
    display: flex;
    align-items: center;
    color: grey;
    cursor: pointer;
    p {
        margin: 0;
        padding-left: 5px;
        font-size: 14px;
    }
    .MuiSvgIcon-root {
        font-size: 16px;
    }
    :hover {
        color: #000;
    }
`;

const ChatMessagesWrapper = styled.div``;
const ChatMessages = styled.div``;
const ChatMessagesBottom = styled.div``;
