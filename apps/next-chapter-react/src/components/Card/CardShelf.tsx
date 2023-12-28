import { FC, useState } from "react";
import { Book } from "@acme/db";
import {
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import DeleteIcon from "@mui/icons-material/Delete";
import MultipleStopIcon from "@mui/icons-material/MultipleStop";
import clsx from "clsx";
import { ModalRemoveBook, ModalAddToShelf } from "components/Modal";
import { useDisclosure } from "@mantine/hooks";
import isMobile from "is-mobile";

interface CardShelfProps {
  book: Book;
}

const CardShelf: FC<CardShelfProps> = ({ book }) => {
  const [anchorEl, setAnchorEl] = useState<Element | null>(null);
  const [removeModalOpened, removeModalhandlers] = useDisclosure(false);
  const [moveModalOpened, moveModalhandlers] = useDisclosure(false);

  const handleMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div
      key={book.id}
      className="group min-w-[200px] max-w-[200px] snap-center flex flex-col"
    >
      <img
        className="mb-3 object-cover w-full h-[285px]"
        src={book.cover || "./no_cover.png"}
        alt={book.title}
      />
      <div className="flex justify-between items-center">
        <Typography className="w-2/3 line-clamp-2 font-semibold flex-0">
          {book.title}
        </Typography>
        <div
          className={clsx(
            "w-1/3 justify-end h-auto flex md:invisible group-hover:visible",
            { "!visible": Boolean(anchorEl) || isMobile() },
          )}
        >
          {/* Menu trigger */}
          <IconButton
            color="primary"
            aria-controls={`menu-card-shelf-${book.id}`}
            aria-haspopup="true"
            onClick={handleMenu}
            component="button"
          >
            <MoreHorizIcon />
          </IconButton>
        </div>
      </div>

      {isMobile() ? (
        <Drawer
          anchor="bottom"
          variant="temporary"
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <List>
            <ListItem
              onClick={() => {
                handleClose();
                moveModalhandlers.open();
              }}
            >
              <ListItemIcon>
                <MultipleStopIcon color="primary" />
              </ListItemIcon>

              <ListItemText primary="Move to shelf" />
            </ListItem>
            <ListItem
              onClick={() => {
                handleClose();
                removeModalhandlers.open();
              }}
            >
              <ListItemIcon>
                <DeleteIcon color="error" />
              </ListItemIcon>

              <ListItemText primary="Delete" />
            </ListItem>
          </List>
        </Drawer>
      ) : (
        <Menu
          id={`menu-card-shelf-${book.id}`}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem
            onClick={() => {
              handleClose();
              moveModalhandlers.open();
            }}
          >
            <MultipleStopIcon
              color="primary"
              fontSize="small"
              className="mr-2"
            />
            Move to shelf
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleClose();
              removeModalhandlers.open();
            }}
          >
            <DeleteIcon color="error" fontSize="small" className="mr-2" />
            Delete
          </MenuItem>
        </Menu>
      )}

      {/* Modals */}
      <ModalRemoveBook
        opened={removeModalOpened}
        handlers={removeModalhandlers}
        bookId={book.id}
        title={book.title}
      />
      <ModalAddToShelf
        opened={moveModalOpened}
        handlers={moveModalhandlers}
        action="MOVE"
        bookId={book.id}
        title={book.title}
      />
    </div>
  );
};

export default CardShelf;
