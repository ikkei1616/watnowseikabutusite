"use client";
import React from "react";
import type Technology from "@/types/Technology";
import Item from "./Item";

const TechItem = ({ technology }: { technology: Technology }) => {
  const containerStyle = {
    width: "100%",
    border: "1px solid #85D5F3",
    padding: "5px 11px",
    borderRadius: "15px",
    display: "flex",
    alignItems: "center",
    transition: "background-color 0.3s",
  };
  const typographyStyle = {
    fontSize: "1.4rem",
    fontFamily: "HannariMincho",
    paddingLeft: "12px",
    "@media screen and (max-width: 750px)": {
      fontSize: "1.2rem",
    },
  };
  return (
    <Item
      id={technology.id}
      src={technology.image || "/nodata.png"}
      alt={"ユーザのアイコン画像"}
      text={technology.name}
    />
  );
};

export default TechItem;
