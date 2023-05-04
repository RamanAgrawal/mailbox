import { Typography } from "@mui/material";

const Heading = (props) => {
  return (
    <Typography variant="h5" color="primary" fontWeight="700" mb="2rem">
      {props.label}
    </Typography>
  );
};

export default Heading;
