import { FC } from "react";
import { useBookDetails } from "hooks";
import { Typography, Button } from "@mui/material";
import DOMPurify from "dompurify";
import { ModalAddToShelf, ModalRemoveBook } from "../Modal";
import { useDisclosure } from "@mantine/hooks";
import MultipleStopIcon from "@mui/icons-material/MultipleStop";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";

const BookDetails: FC = () => {
  const { id, data, isLoading, isError, shelf } = useBookDetails();
  const [moveModalOpened, moveModalhandlers] = useDisclosure(false);
  const [removeModalOpened, removeModalhandlers] = useDisclosure(false);

  if (isLoading || isError || !data) return null;

  return (
    <>
      <ModalAddToShelf
        opened={moveModalOpened}
        handlers={moveModalhandlers}
        action="MOVE"
        bookId={id || ""}
        title={data.volumeInfo.title}
      />
      <ModalRemoveBook
        opened={removeModalOpened}
        handlers={removeModalhandlers}
        bookId={id || ""}
        title={data.volumeInfo.title}
      />
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-x-8 gap-y-4">
        {/* Image */}
        <div className="sm:col-span-1">
          <img
            className="object-cover w-full"
            src={data?.volumeInfo.imageLinks?.thumbnail || "/no_cover.png"}
            alt={data?.volumeInfo.title}
          />
        </div>

        <div className="flex flex-col sm:col-span-3 gap-y-2">
          <div className="self-end flex gap-x-3">
            <Button
              startIcon={<MultipleStopIcon />}
              size="small"
              variant="contained"
              onClick={() => moveModalhandlers.open()}
            >
              Move To Shelf
            </Button>

            <Button
              startIcon={<DeleteIcon />}
              size="small"
              variant="contained"
              color="error"
              onClick={() => removeModalhandlers.open()}
            >
              Delete
            </Button>
          </div>

          <div>
            <Typography className="text-primary-main font-bold text-xl mb-1">
              Shelf
            </Typography>

            <Typography
              className="text-black dark:text-white"
              variant="body1"
              component={Link}
              to={`/shelf/${shelf?.id}`}
            >
              {shelf?.type || "No shelf"}
            </Typography>
          </div>

          <div>
            <Typography className="text-primary-main font-bold text-xl mb-1">
              Author
            </Typography>

            <Typography variant="body1">
              {data?.volumeInfo.authors?.join(", ")}
            </Typography>
          </div>

          <div>
            <Typography className="text-primary-main font-bold text-xl mb-1">
              Page
            </Typography>

            <Typography variant="body1">
              {data?.volumeInfo.pageCount}
            </Typography>
          </div>

          <div>
            <Typography className="text-primary-main font-bold text-xl mb-1">
              Description
            </Typography>
            <Typography variant="body1">
              {DOMPurify.sanitize(data?.volumeInfo.description || "")}
            </Typography>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookDetails;
