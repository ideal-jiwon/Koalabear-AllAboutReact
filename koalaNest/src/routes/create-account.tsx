import styled from 'styled-components';
import { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../firebase';
import { Link, useNavigate } from 'react-router-dom';
import { FirebaseError } from 'firebase/app';


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
const Switcher = styled.span`
    margin-top: 20px;
    font-size: 14px;
    text-align: center;
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
export default function CreateAccount(){
    const navigate = useNavigate();
    const [IsLoading, setLoading] = useState(false);
    const [name, setName] = useState("");
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
        if (name == "name") {
            setName(value);
        } else if (name == "email"){
            setEmail(value);
        } else if (name == "password") {
            setPassword(value);
        }
    };
    const onSubmit = async (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
        if (IsLoading ||name === "" || email === "" || password === ""
        ) return; 
        try {
            setLoading(true);
            //1. create an account
            const credentials = await createUserWithEmailAndPassword(auth, email, password);
            //2. set the name of the user
            console.log(credentials.user);
            await updateProfile(credentials.user, {
                displayName : name,

            });
            //3. redirect to the home page
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
            <Title> Join Koalabear </Title>
            <Form onSubmit={onSubmit}>
                <Input name="name" value = {name} onChange = {onChange} type="text" placeholder="name" required ></Input>
                <Input name="password" value = {password} onChange = {onChange} type="password" placeholder="password" required></Input>
                <Input name="email" value = {email} onChange = {onChange} type="email" placeholder="email" required></Input>
                <Input type="submit" value = {IsLoading ? "loading..." : "CreateAccount"}></Input>
            </Form>
            {error !== "" ? <Error>{error}</Error> : null}
            <Switcher>
                Do you already have an account? {" "}
                <Link to="/login">Log in &rarr; </Link>
            </Switcher>
        </Wrapper>
    )
}