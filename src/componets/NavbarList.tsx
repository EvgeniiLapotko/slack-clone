import React from "react";
import styled from "styled-components";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

interface INavbarListType {
    title: string;
    Icon?: any;
    addChanelOption?: boolean;
}

const NavbarList: React.FC<INavbarListType> = ({
    title,
    Icon,
    addChanelOption,
}: INavbarListType): React.ReactElement => {
    const addChanel = async () => {
        const nameChanel = prompt("Введите название канала");
        console.log(nameChanel);
        if (nameChanel) {
            try {
                const docRef = await addDoc(collection(db, "rooms"), {
                    name: nameChanel,
                });
                console.log("Document written ");
            } catch (e) {
                console.error("Error adding document: ", e);
            }
        }
    };
    const selectChanel = (): void => {
        console.log(title);
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
