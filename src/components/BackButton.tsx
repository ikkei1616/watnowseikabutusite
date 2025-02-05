import { Button, CardActions, useMediaQuery } from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import { Butterfly_Kids } from "next/font/google";

interface BackButtonProps {
  ButtonTitle: string;
}

const BackButton = ({ ButtonTitle }: BackButtonProps) => {
  const isMobile = useMediaQuery("(max-width:600px)");
  return (
    <CardActions>
      <Link href={`/events`} passHref>
        <Button
          size="small"
          color="primary"
          sx={{
            textTransform: "none",
            "&:hover": {
              backgroundColor: "#D9D9D9", // ホバー時の背景色を濃くする
            },
            alignItems: "flex-end",
            textAlign: "center",
          }}
        >
          {isMobile ? "" : ButtonTitle}

          {/* 画像を挿入 */}
          <Image
            src={"/back_button.svg"}
            alt={"戻るボタン"}
            height={20}
            width={20}
          />
        </Button>
      </Link>
    </CardActions>
  );
};

export default BackButton;
