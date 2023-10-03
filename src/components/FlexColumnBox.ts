import { Box, styled } from "@mui/material";

const FlexColumnBox = styled(Box)(({ theme }) => ({
    backgroundColor: "rgb(257, 190, 70)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
}));

export default FlexColumnBox;
