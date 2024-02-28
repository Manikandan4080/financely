import React, { useEffect } from "react";
import "./style.css";
import { auth } from "../../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { signOut } from "firebase/auth";

const Header = () => {
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/");
    } else {
      navigate("/dashboard");
    }
  }, [user, navigate]);


  const logout = () => {
    signOut(auth)
  }
  return (
    <div className="navbar">
      <h4 className="logo-title">Financely - Your personal finance tracker</h4>

      <div className="pic-logout">
        {user && user.photoURL ? (
          <img className="pro-pic" src={user.photoURL} alt="profile" />
        ) : (
          user && <CgProfile style={{color:"white", height:"30px", width:"30px"}} />
        )}
        {user && <p className="logout-text" onClick={logout}>Logout</p>}
      </div>
    </div>
  );
};

export default Header;
