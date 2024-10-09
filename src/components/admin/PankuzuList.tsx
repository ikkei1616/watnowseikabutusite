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
                fontFamily: "HannariMincho",
                fontSize: "1.5rem",
                color: "#0063BF",
                borderBottom: "2px solid #0063BF",
              }}
            >
              {item.text}
            </Typography>
          </Link>
          {index < pankuzu.length - 1 && (
            <Typography
              component="div"
              sx={{
                fontFamily: "HannariMincho",
                fontSize: "1.5rem",
                color: "#0063BF",
              }}
            >
              ＞
            </Typography>
          )}
        </React.Fragment>
      ))}
      {/* <Link href={"/admin"}>
        <Typography
          component="div"
          sx={{
            fontFamily: "HannariMincho",
            fontSize: "1.5rem",
            color: "#0063BF",
            borderBottom: "2px solid #0063BF",
          }}
        >
          ジャンル選択
        </Typography>
      </Link>
      <Typography
        component="div"
        sx={{
          fontFamily: "HannariMincho",
          fontSize: "1.5rem",
          color: "#0063BF",
        }}
      >
        ＞
      </Typography>
      <Link href={"/admin/users"}>
        <Typography
          component="div"
          sx={{
            fontFamily: "HannariMincho",
            fontSize: "1.5rem",
            color: "#0063BF",
            borderBottom: "2px solid #0063BF",
          }}
        >
          ユーザ
        </Typography>
      </Link> */}
    </Box>
  );
};

export default PankuzuList;
