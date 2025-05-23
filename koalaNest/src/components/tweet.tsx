import {styled} from "styled-components";
import {ITweet} from "./timeline";
import React from "react";
import { auth, db, storage } from "../firebase";
import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";


const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  padding: 20px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 15px;
`;

const Column = styled.div``;

const Photo = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 15px;
`;

const Username = styled.span`
  font-weight: 600;
  font-size: 15px;
`;

const Payload = styled.p`
  margin: 10px 0px;
  font-size: 18px;
`;

const DeleteButton = styled.button `
    border-radius: 8px;
    padding: 5px 10px;
    color: smokewhite;
    background-color: tomato;
    font-weight: bold;
    border: 0;
    text-transform: uppercase;

`;

export default function Tweet({username, tweet, photo, userId,id}: ITweet){
    const user = auth.currentUser;
    const onDelete = async() => {
        const ok = confirm("Are you sure you want to delete this tweet?");
        if(!ok || user?.uid !== userId) return;
        try {
            await deleteDoc(doc(db,"koalabear",id));
            if (photo) {
                const photoRef = ref(storage, `tweets/${user.uid}/${id}`);
                await deleteObject(photoRef);
            }
        } catch (e) {
            console.log(e);
        } finally {

        }
    };
    return (
        <Wrapper>
            <Column>
            <Username>{username}</Username>
            <Payload>{tweet}</Payload>
            {user?.uid === userId ? <DeleteButton onClick={onDelete}>Delete</DeleteButton> : null}
            </Column>
            <Column>{photo ? <Photo src={photo} /> : null}</Column>
        </Wrapper>
    )
}