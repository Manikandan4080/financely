import React, { useState } from "react";
import "./style.css";
import Input from "../../Common/Input";
import Button from "../../Common/Button";

import {FcGoogle} from "react-icons/fc"
import { toast } from "react-toastify";
import { auth } from "../../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { authWithGoogle } from "../../Functions/accountWithGoogle.js";
import { createDoc } from "../../Functions/createDocument.js";

const SignupForm = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();


  
  //creating account with email and password
  const signupWithEmailPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    if(fullName && email && password && confirmPassword){
      if(password == confirmPassword){

        try {
          const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
          const user = userCredentials.user;

          console.log(user);

          //saving to doc in firebase
          await createDoc(user, fullName);//from "../../Functions/createDocument.js";

          toast.success("Account created successfully");
          setLoading(false);
          setFullName("");
          setEmail("");
          setPassword("");
          setConfirmPassword("");

          navigate('/dashboard');
        }
        catch (error) {
          toast.error(error.message);
          setLoading(false);
        }
      }
      else{
        toast.error("Password and Confirm password are not matching");
        setLoading(false);
      }
    }
    else{
      toast.error("Fill out all feilds");
      setLoading(false);
    }
  };


  //creating account with google and adding to doc
  const signupWithGoogle =async (e) => {
    e.preventDefault();
    setLoading(true);


    const user = await authWithGoogle();//from "../../Functions/accountWithGoogle.js";
    if(user){
      console.log(user);
      toast.success("Account created succesfully");
      setLoading(false);
    }
    else{
      toast.error("Somthing went wrong");
      setLoading(false);
    }
  }






  return (
    <div className="signup-form">
      <h2>
        Signup with <span style={{ color: "var(--theme)" }}>Financely</span>
      </h2>
      <form className="form">
        <div className="custom-input-wrapper">
          <h5 style={{ textAlign: "left", width: "90%", margin: "0px" }}>
            Full Name:
          </h5>
          <Input
            type={"text"}
            placeholder={"Enter your full name"}
            state={fullName}
            setState={setFullName}
          />
        </div>

        <div className="custom-input-wrapper">
          <h5 style={{ textAlign: "left", width: "90%", margin: "0px" }}>
            Email:
          </h5>
          <Input
            type={"email"}
            placeholder={"Enter your email address"}
            state={email}
            setState={setEmail}
          />
        </div>

        <div className="custom-input-wrapper">
          <h5 style={{ textAlign: "left", width: "90%", margin: "0px" }}>
            Password:
          </h5>
          <Input
            type={"password"}
            placeholder={"Enter password"}
            state={password}
            setState={setPassword}
          />
        </div>

        <div className="custom-input-wrapper">
          <h5 style={{ textAlign: "left", width: "90%", margin: "0px" }}>
            Confirm Password:
          </h5>
          <Input
            type={"password"}
            placeholder={"Re-type password"}
            state={confirmPassword}
            setState={setConfirmPassword}
          />
        </div>

        <Button
          text={loading ? "Loading..." :"Signup with email and password"}
          diasbled={loading}
          onClick={signupWithEmailPassword}
          blue={false}
        />

        <h5>OR</h5>

        <Button
          text={loading ? "Loading..." : "Signup with Google"}
          icon={loading ? "" : <FcGoogle className="react-icon-google"/>}
          diasbled={loading}
          onClick={signupWithGoogle}
          blue={true}
        />
      </form>
    </div>
  );
};

export default SignupForm;
