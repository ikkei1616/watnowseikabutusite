"use client";
import React from "react";
import type Technology from "@/types/Technology";
import Item from "./Item";

const TechItem = ({ technology }: { technology: Technology }) => {
  return (
    <Item
      src={technology.image || "/nodata.png"}
      alt={"ユーザのアイコン画像"}
      text={technology.name}
    />
  );
};

export default TechItem;
