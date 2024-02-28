import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import Button from "../../Common/Button";
import Input from "../../Common/Input";

import "./style.css";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase";
import { toast } from "react-toastify";
import { authWithGoogle } from "../../Functions/accountWithGoogle.js";
import { createDoc } from "../../Functions/createDocument.js";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);


  //login with email and password
  const loginWithEmailPassword = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (email && password) {
      try {
        const userCredentials = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredentials.user;

        await createDoc(user);//from "../../Functions/createDocument.js";

        console.log(user);
        setLoading(false);
        toast.success("Login success");
      } catch (error) {
        toast.error(error.message);
        setLoading(false);
      }
    } else {
      toast.error("Please fill all feilds");
      setLoading(false);
    }
  };


  //login with google
  const loginWithGoogle = async (e) => {
    e.preventDefault();
    setLoading(true);

    const user = await authWithGoogle();//from "../../Functions/accountWithGoogle.js";
    if (user) {
      console.log(user);
      toast.success("Logged in succesfully");
      setLoading(false);
    } else {
      toast.error("Somthing went wrong");
      setLoading(false);
    }
  };
  return (
    <div className="login-form">
      <h2>
        Login with <span style={{ color: "var(--theme)" }}>Financely</span>
      </h2>

      <form className="form">
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

        <Button
          text={loading ? "Loading..." : "Login with email and password"}
          diasbled={loading}
          onClick={loginWithEmailPassword}
          blue={false}
        />

        <h5>OR</h5>

        <Button
          text={loading ? "Loading..." : "Login with Google"}
          icon={<FcGoogle className="react-icon-google" />}
          diasbled={loading}
          onClick={loginWithGoogle}
          blue={true}
        />
      </form>
    </div>
  );
};

export default LoginForm;
