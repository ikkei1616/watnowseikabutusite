"use client";
import React from "react";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";

const SelectYearOptions = ({
  handleYearChange,
  yearOptions,
  defaultValue,
}: {
  handleYearChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    value: string
  ) => void;
  yearOptions: number[];
  defaultValue: number;
}) => {
  const yearButtonStyle = {
    color: "var(--text)",
    width: "100%",
    padding: "10px",
    margin: "0",
    fontSize: "1.5rem",
    backgroundImage: "linear-gradient(to right, var(--border) 6px, transparent 6px)",
    backgroundSize: "10px 1px",
    backgroundRepeat: "repeat-x",
    backgroundPosition: "left bottom",
    "& .MuiTypography-root": {
      flexGrow: 1,
      fontFamily: "HannariMincho",
      fontSize: "1.5rem",
      color: "var(--text)",
    },
    "& .Mui-checked + .MuiTypography-root": {
      color: "#0063BF",
    },
    "& .Mui-checked + span::before": {
      content: '"▶︎"',
      paddingTop: "0.3rem",
      paddingRight: "0",
    },
    span: {
      display: "flex",
      alignItems: "center",
    },
    "span::before": {
      content: '""',
      color: "#0063BF",
      fontSize: "0.6rem",
      marginRight: "9px",
      paddingRight: "0.6rem",
    },
    "& .MuiSvgIcon-root": {
      display: "none",
    },
    "& .MuiButtonBase-root": {
      display: "none",
    },
    "@media screen and (max-width: 768px)": {
      fontSize: "1rem",
    },
  };

  return (
    <Box
      sx={{
        backgroundColor: "#EAEFF2",
        borderRadius: "15px",
        maxWidth: "250px",
        minWidth: "250px",
        padding: "20px",
        height: "fit-content",
      }}
    >
      <FormControl sx={{ width: "100%" }}>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue={defaultValue}
          name="radio-buttons-group"
          sx={{ width: "100%" }}
          onChange={handleYearChange}
        >
          {yearOptions.map((year) => (
            <FormControlLabel
              key={year}
              value={year}
              control={<Radio />}
              label={`${year}`}
              sx={yearButtonStyle}
            />
          ))}
        </RadioGroup>
      </FormControl>
    </Box>
  );
};

export default SelectYearOptions;
