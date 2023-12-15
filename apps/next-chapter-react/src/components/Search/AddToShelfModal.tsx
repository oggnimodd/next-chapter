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

interface AddToShelfModalProps {
  opened: boolean;
  handlers: {
    open: () => void;
    close: () => void;
  };
  item: Item;
}

const AddToShelfModal: FC<AddToShelfModalProps> = ({
  opened,
  handlers,
  item,
}) => {
  const { isSignedIn, isLoaded } = useAuth();
  const [shelf, setShelf] = useState<string>("");
  const {
    mutateAsync,
    error: mutationError,
    isLoading: isMutating,
  } = api.book.create.useMutation();
  const { data: shelves, isLoading, isError } = api.shelf.getAll.useQuery();

  let bookCreationError = "";

  if (mutationError) {
    if (mutationError?.message.includes("constraint")) {
      bookCreationError = "This book is already exist in your shelves";
    }
  }

  const save = async () => {
    if (shelf) {
      await mutateAsync({
        shelfId: shelf,
        title: item.volumeInfo.title,
        cover: item.volumeInfo.imageLinks?.thumbnail || "",
        description: item.volumeInfo.description || "",
        googleBooksUrl: item.volumeInfo.infoLink || "",
      });
      handlers.close();
      toast.success("Book created successfully");
    }
  };

  return (
    <Modal
      open={opened}
      onClose={() => handlers.close()}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <form className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 bg-background-default border-2 border-black shadow-2xl p-10 rounded flex flex-col">
        <Typography
          className="text-primary-main"
          id="modal-title"
          variant="h6"
          component="h2"
        >
          {item.volumeInfo.title}
        </Typography>
        <Typography className="line-clamp-4 mt-2" id="modal-description">
          {item.volumeInfo.description}
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
              disabled={isLoading || isMutating || !shelf}
              color="primary"
              className="mt-4 ml-auto"
              variant="contained"
              onClick={save}
            >
              Save
            </Button>
          )}
        </div>
      </form>
    </Modal>
  );
};

export default AddToShelfModal;
