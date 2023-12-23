import React, { useState } from "react";
import { Input, Box } from "@mui/material";

const CustomInput = ({ onChange, placeholder, name, type = "text" }) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <Box
      sx={{
        borderRadius: "0.4rem",
        overflow: "hidden", // Ensure the border-radius is applied correctly
        border: `1px solid ${isFocused ? "orange" : "black"}`,
        // padding:'1rem'
      }}

    >
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
          width: "100%",
        }}
      />
    </Box>
  );
};

export default CustomInput;

