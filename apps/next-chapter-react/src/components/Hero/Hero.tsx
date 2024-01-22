import { FC } from "react";
import { Typography } from "@mui/material";
import { GitHub, CallMade } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useClerk } from "@clerk/clerk-react";

const Hero: FC = () => {
  const { openSignIn } = useClerk();

  return (
    <div className="grid grid-cols-2 gap-20 py-8">
      <div className="w-full flex items-center min-h-[500px]">
        <img className="w-11/12" src="/hero.png" alt="hero" />
      </div>

      <div className="flex justify-center flex-col gap-4">
        <Typography
          variant="h1"
          className="text-5xl font-bold text-primary-main"
        >
          Next Chapter
        </Typography>
        <Typography className="text-xl">
          The Minimalist Book Tracking App for Bookworms
        </Typography>
        <div className="flex gap-2">
          <Button
            variant="outlined"
            color="primary"
            component="a"
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/oggnimodd/next-chapter"
            startIcon={<GitHub />}
          >
            Source Code
          </Button>
          <Button
            onClick={() => openSignIn()}
            startIcon={<CallMade />}
            variant="contained"
            color="primary"
          >
            Get Started
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
