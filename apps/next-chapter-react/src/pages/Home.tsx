import { Counter } from "components";
import {
  Avatar,
  Button,
  CircularProgress,
  IconButton,
  Typography,
} from "@mui/material";
import { useDarkMode } from "hooks";
import { Link } from "react-router-dom";
import { DarkModeOutlined, LightModeOutlined } from "@mui/icons-material";
import { useUser, useAuth } from "@clerk/clerk-react";

const Home = () => {
  const { toggleTheme, isDark } = useDarkMode();
  const { user, isLoaded, isSignedIn } = useUser();
  const { signOut } = useAuth();

  if (!isLoaded) {
    return <CircularProgress />;
  }

  return (
    <div className="flex flex-col">
      <div className="self-end flex p-4 gap-3">
        <Link to="/404">Go to 404</Link>
        <IconButton onClick={toggleTheme} color="primary">
          {isDark ? <LightModeOutlined /> : <DarkModeOutlined />}
        </IconButton>
      </div>
      {!isSignedIn && (
        <div className="flex flex-col gap-3 p-4 items-center">
          <Typography className="text-2xl font-bold">Please sign in</Typography>
          <Link to="/sign-in">
            <Button color="primary" variant="contained">
              Sign In
            </Button>
          </Link>
        </div>
      )}

      {isSignedIn && (
        <div className="flex flex-col gap-3 p-4 items-center">
          <Typography className="text-2xl font-bold">
            {user?.firstName} {user?.lastName}
          </Typography>
          <Avatar src={user?.imageUrl} />
          <Button
            className="self-center"
            color="primary"
            variant="contained"
            onClick={() => signOut()}
          >
            Sign Out
          </Button>
        </div>
      )}

      {isSignedIn && <Counter />}
    </div>
  );
};

export default Home;
