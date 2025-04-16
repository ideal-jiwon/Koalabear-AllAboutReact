import { GithubAuthProvider, signInWithPopup } from "firebase/auth";
import {styled} from "styled-components";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

const Button = styled.span`
    background-color: white;
    font-weight: 500;
    width: 100%;
    margin-top: 10px;
    padding: 10px 20px;
    border-radius: 50px;
    border: 0;
    dispaly:flex;
    gap: 5px;
    align-itmes: center;
    justify-content: center;
    color: black;
    text-align: center;
    cursor: pointer;
    
    `;
const Logo = styled.img`
    height: 25px;
    `;

export default function GithubButton(){
    const navigate = useNavigate();
    const onClick = async () => {
        try {
            const provider = new GithubAuthProvider();
        await signInWithPopup(auth, provider);
        navigate("/");

        } catch (error) {
            console.error(error);
        }
    };
    return (
    <Button onClick= {onClick}>
        <Logo src="/public/github-mark.svg" />
        Continue with Github
    </Button>
    );
}