import PostTweetForm from "../components/post-tweet-from";
import { auth } from "../firebase";
import { styled } from "styled-components";

const Wrapper = styled.div``;

export default function Home(){

    return (
    <Wrapper>
        <PostTweetForm/>
    </Wrapper>
    );
}