import React from 'react';
import "./style.css";

const Button = ({text, onClick, blue, icon, width}) => {
  return (
    <button style={{width:`${width}`}} className={blue ? 'custom-button blue-btn':'custom-button'} onClick={onClick} blue={blue}>
      {icon}{text}
    </button>
  )
}

export default Button;
