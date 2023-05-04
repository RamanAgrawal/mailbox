import { Box } from "@mui/material";

const BoxUI = (props) => {
  return <Box sx={{ ml: "15rem", p: "1rem" }}>{props.children}</Box>;
};

export default BoxUI;
