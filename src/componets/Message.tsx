import React from "react";
import styled from "styled-components";

interface ImessageType {
    messageProps: string;
    time: any;
    user: string;
    userImg: string;
}

const Message: React.FC<ImessageType> = ({
    messageProps,
    time,
    user,
    userImg,
}: ImessageType): React.ReactElement => {
    return (
        <MessageContainer>
            <MessageImg>
                <img src={userImg} alt="userImg" />
            </MessageImg>
            <MessageBlock>
                <h4>
                    {user}{" "}
                    <span>{new Date(+time * 1000).toLocaleTimeString()}</span>
                </h4>
                <p>{messageProps}</p>
            </MessageBlock>
        </MessageContainer>
    );
};

export default Message;

const MessageContainer = styled.div`
    margin: 15px;
    display: flex;
`;
const MessageImg = styled.div`
    img {
        width: 50px;
        height: 50px;
        border-radius: 10px;
    }
`;
const MessageBlock = styled.div`
    min-width: 30%;
    margin-left: 15px;
    padding: 10px;
    background-color: rgba(246, 235, 246);
    border-radius: 10px;
    position: relative;
    z-index: 10;
    ::after {
        content: "";
        position: absolute;
        width: 15px;
        height: 15px;
        background-color: rgba(246, 235, 246);
        top: 15px;
        left: -6px;
        transform: rotate(45deg);
        z-index: -1;
    }
    h4 {
        margin: 0;
        span {
            font-size: 14px;
            color: grey;
        }
    }
`;
