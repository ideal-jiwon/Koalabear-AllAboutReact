import { styled } from "styled-components";

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100vw;
    background-color: black;
    color: white;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    -webkit-font-smoothing: antialiased;
    font-size: 24px;
    font-weight: 600;
    text-align: center;
`;


const Text = styled.span`
    font-size: 24px;
    font-weight: 600;`;




export default function LoadingScreen() {
    return <Wrapper><Text>Loading... </Text></Wrapper>
}