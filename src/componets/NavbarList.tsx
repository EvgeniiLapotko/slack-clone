import React from "react";
import styled from "styled-components";

import {
    addRoomsAsync,
    enterRoom,
    getMessagesRoomAsync,
    getRoomsAsync,
} from "../features/appSlice";
import { useDispatch } from "react-redux";

interface INavbarListType {
    title: string;
    Icon?: any;
    id?: string;
    addChanelOption?: boolean;
}

const NavbarList: React.FC<INavbarListType> = ({
    title,
    Icon,
    addChanelOption,
    id,
}: INavbarListType): React.ReactElement => {
    const dispatch = useDispatch();

    const addChanel = async () => {
        const nameChanel = prompt("Введите название канала");
        console.log(nameChanel);
        if (nameChanel) {
            dispatch(addRoomsAsync(nameChanel));
            dispatch(getRoomsAsync());
        }
    };
    const selectChanel = (): void => {
        if (id) {
            dispatch(enterRoom({ roomId: id, roomName: title }));
            dispatch(getMessagesRoomAsync(id));
        }
    };

    return (
        <NavbarListContainer
            onClick={addChanelOption ? addChanel : selectChanel}
        >
            <NavbarListTitle>
                {Icon ? (
                    <>
                        <Icon fontSize="small" style={{ margin: 10 }} />{" "}
                        <h3>{title}</h3>
                    </>
                ) : (
                    <>
                        <span>#</span>
                        <h3>{title}</h3>
                    </>
                )}
            </NavbarListTitle>
        </NavbarListContainer>
    );
};

export default NavbarList;

const NavbarListContainer = styled.div`
    padding: 0 13px;
    display: flex;
    align-items: center;
    transition: background-color 0.3s;
    cursor: pointer;
    :hover {
        background-color: #49274b;
    }
`;
const NavbarListTitle = styled.div`
    display: flex;
    align-items: center;
    h3 {
        font-size: 13px;
        font-weight: 500;
        padding-left: 10px;
    }
    span {
        display: inline-block;
        padding: 0 15px;
    }
`;
