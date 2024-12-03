import { Box } from "@mui/material";

const DetailContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box
      sx={{
        paddingTop: "40px",
        "@media screen and (max-width: 600px)": {
          paddingTop: "20px",
        },
      }}
    >
      {children}
    </Box>
  );
};

export default DetailContainer;
