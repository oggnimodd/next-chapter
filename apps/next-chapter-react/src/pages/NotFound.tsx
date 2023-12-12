import { Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { ArrowBack } from "@mui/icons-material";

const NotFound = () => {
  return (
    <div className="flex min-h-screen w-full flex-1 justify-center flex-col items-center gap-y-3">
      <Typography className="font-bold">Page not found</Typography>
      <Link to="/">
        <Button startIcon={<ArrowBack />} variant="contained" color="primary">
          Back To Home
        </Button>
      </Link>
    </div>
  );
};

export default NotFound;
