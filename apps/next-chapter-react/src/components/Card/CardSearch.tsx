import { Item } from "@acme/google-books";
import { useDisclosure } from "@mantine/hooks";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { FC } from "react";
import { ModalAddToShelf } from "components/Modal";

interface CardSearchProps {
  item: Item;
}

const CardSearch: FC<CardSearchProps> = ({ item }) => {
  const [opened, handlers] = useDisclosure(false);

  return (
    <>
      <Card variant="outlined" className="w-full flex flex-col">
        <CardMedia
          className="w-full object-cover aspect-[1/1.25]"
          component="img"
          image={
            item.volumeInfo.imageLinks?.large ||
            item.volumeInfo.imageLinks?.thumbnail ||
            "/no_cover.png"
          }
          alt={item.volumeInfo.title}
        />
        <CardContent>
          <Typography
            variant="h5"
            className="font-semibold line-clamp-2 text-primary-main text-xl"
          >
            {item.volumeInfo.title}
          </Typography>
          <Typography className="mt-2 line-clamp-3" variant="body2">
            {item.volumeInfo.description}
          </Typography>
        </CardContent>
        <CardActions className="flex flex-col flex-1 h-full justify-end items-end">
          <Button
            onClick={() => handlers.open()}
            variant="outlined"
            size="small"
          >
            Add
          </Button>
        </CardActions>
      </Card>
      <ModalAddToShelf opened={opened} handlers={handlers} item={item} />
    </>
  );
};

export default CardSearch;
