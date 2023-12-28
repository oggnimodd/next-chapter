import { FC, useState } from "react";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Typography,
} from "@mui/material";
import { Item } from "@acme/google-books";
import { api } from "trpc";
import toast from "react-hot-toast";
import { useAuth, SignInButton } from "@clerk/clerk-react";

type ActionTypes = "ADD" | "MOVE";

interface BaseProps {
  opened: boolean;
  handlers: {
    open: () => void;
    close: () => void;
  };
  action: ActionTypes;
  item?: Item;
}

interface AddActionProps extends BaseProps {
  action: "ADD";
  bookId?: string;
  title?: string;
}

interface MoveActionProps extends BaseProps {
  action: "MOVE";
  bookId: string;
  title: string;
}

type ModalAddToShelfProps = AddActionProps | MoveActionProps;

const ModalAddToShelf: FC<ModalAddToShelfProps> = ({
  opened,
  handlers,
  action = "ADD",
  bookId,
  item = {
    volumeInfo: {
      title: "",
      imageLinks: {
        thumbnail: "",
      },
    },
  } as Item,
  title,
}) => {
  const utils = api.useUtils();
  const { isSignedIn, isLoaded } = useAuth();
  const [shelf, setShelf] = useState<string>("");
  const {
    mutateAsync: addNewBook,
    error: addNewBookError,
    isLoading: addNewBookisMutating,
  } = api.book.create.useMutation();

  const { mutateAsync: moveBook, isLoading: moveBookisMutating } =
    api.book.moveToShelf.useMutation();

  const { data: shelves, isLoading, isError } = api.shelf.getAll.useQuery();

  let bookCreationError = "";

  if (addNewBookError) {
    if (addNewBookError?.message.includes("constraint")) {
      bookCreationError = "This book is already exist in your shelves";
    }
  }

  const save = async () => {
    try {
      if (shelf) {
        if (action === "ADD") {
          await addNewBook({
            shelfId: shelf,
            title: item.volumeInfo?.title,
            cover: item.volumeInfo?.imageLinks?.thumbnail || "",
            description: item.volumeInfo?.description || "",
            googleBooksUrl: item.volumeInfo?.infoLink || "",
          });
          toast.success("Book created successfully");
        } else if (action === "MOVE") {
          await moveBook({
            bookId: bookId || "",
            shelfId: shelf,
          });
          toast.success("Book moved successfully");
        }

        handlers.close();
        utils.shelf.getAll.invalidate();
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <Modal
      open={opened}
      onClose={() => handlers.close()}
      aria-labelledby="add-to-shelf-modal"
      aria-describedby="add-to-shelf-modal"
    >
      <form className="modal">
        <Typography
          className="text-primary-main"
          id="modal-title"
          variant="h6"
          component="h2"
        >
          {item.volumeInfo?.title || title}
        </Typography>
        <Typography className="line-clamp-4 mt-2" id="modal-description">
          {item.volumeInfo?.description}
        </Typography>
        {!isLoading && !isError && (
          <FormControl className="mt-2">
            <InputLabel size="small" id="select-shelf-label">
              Choose Shelf
            </InputLabel>
            <Select
              value={shelf}
              onChange={(e) => setShelf(e.target.value)}
              labelId="select-shelf-label"
              size="small"
              label="Choose Shelf"
            >
              {shelves?.map((shelf) => (
                <MenuItem key={shelf.id} value={shelf.id}>
                  {shelf.type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}

        {bookCreationError && (
          <Typography className="mt-2 text-sm" color="error">
            {bookCreationError}
          </Typography>
        )}

        <div className="mt-4 ml-auto flex gap-x-2">
          <Button
            color="error"
            className="mt-4 ml-auto"
            variant="contained"
            onClick={() => handlers.close()}
          >
            Close
          </Button>

          {isLoaded && !isSignedIn && (
            <SignInButton>
              <Button
                color="primary"
                className="mt-4 ml-auto"
                variant="contained"
              >
                Sign In To Save
              </Button>
            </SignInButton>
          )}

          {isLoaded && isSignedIn && (
            <Button
              disabled={
                isLoading ||
                addNewBookisMutating ||
                moveBookisMutating ||
                !shelf
              }
              color="primary"
              className="mt-4 ml-auto"
              variant="contained"
              onClick={save}
            >
              {action === "ADD" ? "Save" : "Move"}
            </Button>
          )}
        </div>
      </form>
    </Modal>
  );
};

export default ModalAddToShelf;
