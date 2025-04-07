import styled from 'styled-components';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FirebaseError } from 'firebase/app';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

const Wrapper = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 50px 0;
    align-items: center;
    width: 420px;
    `;
const Title = styled.h1`
    font-size: 22px;
    font-weight: 600;
    text-align: center;
    margin-bottom: 20px;`;

const Form = styled.form`
    margin-top: 50px;
    margin-bottom: 10px;
    gap: 10px;
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 30px;
    margin: 0 auto;
    `;

const Input = styled.input`
    margin-bottom: 10px;
    padding: 10px 20px;
    border: none;
    border-radius: 50px;
    width: 100%;
    font-size: 16px;

    &[type="submit"] { 
        cursor : pointer;
        &: hover {
        opacity: 0.8;
        }
    }
        `;
const Switcher = styled.span`
    margin-top: 20px;
    font-size: 14px;
    text-align: center;
`;

export default function login(){
    const navigate = useNavigate();
    const [IsLoading, setLoading] = useState(false);
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const Error = styled.span `
        font-size: 12px;
        color: tomato;
        margin-top: 10px;`;
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {
            target: {name, value},
        } = e;
        if(name === "email"){
         setEmail(value);
        } else if(name === "password"){
         setPassword(value);
        }
    };
    const onSubmit = async (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
        if (IsLoading || email === "" || password === ""
        ) return; 
        try {
            setLoading(true);
            // Replace with your login logic
            await signInWithEmailAndPassword(auth, email, password);
            // await login(email, password);
            navigate("/");
        } catch (e) {
            // handle error
            if(e instanceof FirebaseError){
                setError(e.message);
            }
        } finally {
            setLoading(false);
        }
      
    };
    
    return (
        <Wrapper>
            <Title> Login Page </Title>
            <Form onSubmit={onSubmit}>
            <Input name="email" value = {email} onChange = {onChange} type="email" placeholder="email" required></Input>
                <Input name="password" value = {password} onChange = {onChange} type="password" placeholder="password" required></Input>
                <Input type="submit" value = {IsLoading ? "loading..." : "Login"}></Input>
            </Form>
            {error !== "" ? <Error>{error}</Error> : null}
            <Switcher>
                Don't have an account? {" "}
                <Link to="/create-account">Create one &rarr; </Link>
            </Switcher>
        </Wrapper>
    )
}
