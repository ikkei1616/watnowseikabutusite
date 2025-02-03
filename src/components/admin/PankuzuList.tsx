"use client";
import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Link from "next/link";

interface Pankuzu {
  text: string;
  link: string;
}

const PankuzuList = ({ pankuzu }: { pankuzu: Pankuzu[] }) => {
  return (
    <Box display={"flex"} alignItems={"center"}>
      {pankuzu.map((item, index) => (
        <React.Fragment key={index}>
          <Link href={item.link}>
            <Typography
              component="div"
              sx={{
                fontSize: "1.5rem",
                color: "#0063BF",
                borderBottom: "2px solid #0063BF",
                "@media screen and (max-width: 768px)": {
                  fontSize: "1rem",
                },
              }}
            >
              {item.text}
            </Typography>
          </Link>
          {index < pankuzu.length - 1 && (
            <Typography
              component="div"
              sx={{
                fontSize: "1.5rem",
                color: "#0063BF",
              }}
            >
              ＞
            </Typography>
          )}
        </React.Fragment>
      ))}
    </Box>
  );
};

export default PankuzuList;
