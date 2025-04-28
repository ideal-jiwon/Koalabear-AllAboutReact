import { collection, getDocs, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { db } from "../firebase";
import Tweet from "./tweet";


export interface ITweet{
    username: string;
    tweet: string;
    createdAt: number;
    userId: string;
    id: string;
    photo: string;
}

const Wrapper = styled.div`
    overflow: scroll`;

export default function Timeline(){

    //1. create an empty array
    const [tweets, setTweet] = useState<ITweet[]>([]);
    // Declare unsubscribe function
   useEffect(()=> {
    let unsubscribe: (()=>void) | null = null;

    const fetchTweets = () => {
        const tweetsQuery = query(
            collection(db, "koalabear"),
            orderBy("createdAt", "desc")
        );

        //Set up real-time listener
        unsubscribe = onSnapshot(tweetsQuery, (snapshot)=>{
            const fetchedTweets = snapshot.docs.map((doc) => {
                const {tweet, createdAt, userId, username, photo } = doc.data() as ITweet;
                return {
                    tweet,
                    createdAt,
                    userId,
                    username,
                    photo,
                    id: doc.id,
                };
        });
        setTweet(fetchedTweets);
    });
   };
   fetchTweets();

   //cleanup function to unsubscribe from Firestore Listener
   return () => {
    if (unsubscribe) {
        unsubscribe();
    }
   };
   }, []);
   //Render tweets
   return (
    <Wrapper>
        {tweets.map((tweet) => (
            <Tweet key={tweet.id} {...tweet}/>
        ))}
    </Wrapper>
   );
}