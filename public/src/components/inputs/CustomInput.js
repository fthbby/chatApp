import React, { useState } from "react";
import Input from "@mui/material/Input";

const CustomInput = ({ onChange, placeholder, name, type='text' }) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <Input
      placeholder={placeholder}
      name={name}
      type={type}
      onChange={onChange}
      disableUnderline
      onFocus={handleFocus}
      onBlur={handleBlur}
      sx={{
        backgroundColor: "transparent",
        // padding: "1rem",
        borderRadius: "0.4rem",
        border: `1px solid ${isFocused ? "red" : "black"}`,
      }}
    />
  );
};

export default CustomInput;
