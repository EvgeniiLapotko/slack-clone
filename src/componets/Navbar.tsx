import React from "react";
import styled from "styled-components";

import CreateIcon from "@material-ui/icons/Create";
import FiberIcon from "@material-ui/icons/FiberManualRecord";
import CommentIcon from "@material-ui/icons/Comment";
import InboxIcon from "@material-ui/icons/Inbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import MarkIcon from "@material-ui/icons/BookmarkBorder";
import PeopleIcon from "@material-ui/icons/SupervisorAccount";
import AppsIcon from "@material-ui/icons/Apps";
import FileIcon from "@material-ui/icons/FileCopy";
import ArrowLessIcon from "@material-ui/icons/ExpandLess";
import ArrowMoreIcon from "@material-ui/icons/ExpandMore";
import AddIcon from "@material-ui/icons/Add";
import NavbarList from "./NavbarList";

import { getRoomsAsync, selectUser, Iroom } from "../features/appSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";

interface INavbarType {
    menu: boolean;
}

const Navbar: React.FC<INavbarType> = ({
    menu,
}: INavbarType): React.ReactElement => {
    const dispatch = useDispatch();
    const rooms = useSelector((state: RootState) => state.app.rooms);
    const user = useSelector(selectUser);

    React.useEffect(() => {
        dispatch(getRoomsAsync());
    }, [dispatch]);
    React.useEffect(() => {
        console.log(menu);
    }, [menu]);

    return (
        <NavbarContainer menuStyle={menu}>
            <NavbarHeader>
                <NavbarInfo>
                    {user && (
                        <>
                            <h2>{user.name}</h2>
                            <h3>
                                <FiberIcon />
                                {user.nikName}
                            </h3>
                        </>
                    )}
                </NavbarInfo>
                <NavbarHeaderIcon>
                    <CreateIcon />
                </NavbarHeaderIcon>
            </NavbarHeader>
            <NavbarList title={"Популярные"} Icon={CommentIcon} />
            <NavbarList title={"Упоминания & реакции"} Icon={InboxIcon} />
            <NavbarList title={"Сохраненные"} Icon={DraftsIcon} />
            <NavbarList title={"Каналы"} Icon={MarkIcon} />
            <NavbarList title={"Люди & группы"} Icon={PeopleIcon} />
            <NavbarList title={"Приложения"} Icon={AppsIcon} />
            <NavbarList title={"Файлы"} Icon={FileIcon} />
            <NavbarList title={"Скрыть"} Icon={ArrowLessIcon} />
            <hr />
            <NavbarList title={"Каналы"} Icon={ArrowMoreIcon} />
            <hr />
            <NavbarList
                title={"Добавить канал"}
                Icon={AddIcon}
                addChanelOption
            />
            {rooms.length > 0 &&
                rooms.map((item: Iroom) => (
                    <NavbarList key={item.id} title={item.room} id={item.id} />
                ))}
        </NavbarContainer>
    );
};

export default Navbar;

const NavbarContainer = styled.div`
    flex: 0.35;
    max-width: 300px;
    min-width: 230px;
    background-color: var(--color-slack);
    color: #fff;
    border-top: 1px solid #49274b;
    margin-top: 66px;
    transition: all 0.4s;
    hr {
        margin: 0 5px;

        opacity: 0.3;
        border-color: #49274b;
    }
    @media (max-width: 580px) {
        position: fixed;
        max-width: 300px;
        height: 100%;
        margin-top: 0;
        top: 66px;
        left: 0;
        z-index: 90;
        transform: ${({ menuStyle }: { menuStyle: boolean }) =>
            menuStyle ? "translateX(0)" : "translateX(-100%)"};
    }
`;

const NavbarHeader = styled.div`
    display: flex;
    border-bottom: 1px solid #49274b;
    padding: 13px;
    align-items: center;
    margin-bottom: 5px;
`;
const NavbarInfo = styled.div`
    h2 {
        margin: 0;
        margin-right: 5px;
        font-size: 15px;
        letter-spacing: 1px;
        text-overflow: ellipsis;
        overflow: hidden;
        max-width: 100%;
    }
    h3 {
        margin: 0;
        font-size: 13px;
        font-weight: 400;
        letter-spacing: 1px;
        .MuiSvgIcon-root {
            font-size: 12px;
            color: green;
            margin-right: 7px;
        }
    }
`;
const NavbarHeaderIcon = styled.div`
    margin-left: auto;
    background-color: #fff;
    width: 35px;
    height: 35px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    opacity: 0.8;
    transition: all 0.3;
    .MuiSvgIcon-root {
        color: var(--color-slack);
    }
    :hover {
        opacity: 1;
    }
`;
