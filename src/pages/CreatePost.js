import React, {useContext, useEffect} from 'react';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import axios from "axios";
import {useNavigate} from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";

export default function CreatePost() {

    const initialValues = {
        titles: "",
        postTExt: "",
    };
    const navigate = useNavigate();
    const { authState } = useContext(AuthContext);


    useEffect(()=>{
      if(!localStorage.getItem("accessToken")){
        navigate("/login");
      }
    },[]);
    const validationSchema = Yup.object().shape({
        title: Yup.string().required("You must input a Title!"),
        postText: Yup.string().required(),
    });

    const onSubmit = (data) => {
        axios.post("https://full-stack-rolex-d0e7f0626856.herokuapp.com/posts",data,
          {headers: {accessToken: localStorage.getItem("accessToken")}}).then((response)=>{
        navigate("/");
      });
    };

    
  return (
    <div classname="createPostPage">
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
            <Form className="formContainer">
                <label>Title: </label>
                <ErrorMessage name="title" component="span" />
                <Field autocomplete="off" id="inputCreatePost" name="title" placeholder="(Ex. Title...)"/>
                <label>Post: </label>
                <ErrorMessage name="postText" component="span" />
                <Field autocomplete="off" id="inputCreatePost" name="postText" placeholder="(Ex. Post...)"/>
                <button type='submit'>Create Post</button>
            </Form>
        </Formik>      
    </div>
  )
}
