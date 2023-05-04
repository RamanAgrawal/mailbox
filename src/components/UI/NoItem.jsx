import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
// import { useSelector } from "react-redux";

const NoItem = ({ label }) => {
  // const isDarkThemeEnabled = useSelector((state) => state.theme.isDarkThemeEnabled);

  let color = " initial";
  // if (isDarkThemeEnabled) {
  //   color = "white";
  // }

  return (
    <Box mt="5rem">
      <Typography variant="body1" component="h6" color={color} textAlign="center">
        Nothing to show !
      </Typography>
      <Typography variant="p" component="h6" color={color} textAlign="center">
        Empty {label}.
      </Typography>
    </Box>
  );
};

export default NoItem;
