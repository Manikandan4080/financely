import React, { useState } from "react";
import Header from "../Components/Common/Header";
import SignupForm from "../Components/SignupLoginComponents/SignupForm";
import LoginForm from "../Components/SignupLoginComponents/LoginForm";

const SignupLogin = () => {
  const [signup, setSignup] = useState(true);
  return (
    <div className="input-wrapper">
      <Header />
      <div className="form-wrapper">
        {/* //to do */}
        {signup ? <SignupForm /> : <LoginForm />}
        {signup ? (
          <p>
            Already have a account.{" "}
            <span className="span-text" onClick={() => setSignup(false)}>
              Click Here
            </span>
          </p>
        ) : (
          <p>
            Don't have an account.{" "}
            <span className="span-text" onClick={() => setSignup(true)}>
              Click Here
            </span>
          </p>
        )}
      </div>
    </div>
  );
};

export default SignupLogin;
