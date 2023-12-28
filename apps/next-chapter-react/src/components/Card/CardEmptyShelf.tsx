import { FC } from "react";
import { Card, Button, CardContent, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";

const CardEmptyShelf: FC = () => {
  return (
    <Card className="w-full flex flex-col min-w-[200px] max-w-[200px]">
      <CardContent className="flex flex-col items-center justify-center h-[285px]">
        <Typography
          variant="h5"
          className="font-semibold text-primary-main text-lg text-center"
        >
          This shelf is empty
        </Typography>

        <Button
          variant="outlined"
          color="primary"
          className="mt-4 mx-auto items-center"
          component={Link}
          to="/search"
          size="small"
          startIcon={<AddIcon fontSize="small" />}
        >
          Add new book
        </Button>
      </CardContent>
    </Card>
  );
};

export default CardEmptyShelf;
