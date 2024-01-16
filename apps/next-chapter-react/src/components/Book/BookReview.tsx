import { FC, useState } from "react";
import { api } from "trpc";
import { TextAreaForm } from "../TextAreaForm";
import { useBookDetails } from "hooks";
import toast from "react-hot-toast";
import { Card, IconButton, Typography, Rating } from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";

const labels: { [index: string]: string } = {
  0.5: "Abysmal",
  1: "Terrible",
  1.5: "Very Bad",
  2: "Bad",
  2.5: "Below Average",
  3: "Average",
  3.5: "Good",
  4: "Very Good",
  4.5: "Excellent",
  5: "Outstanding",
};

interface BookReviewCardAndForm {
  bookId: string;
}

const BookReviewCardAndForm: FC<BookReviewCardAndForm> = ({ bookId }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const utils = api.useUtils();
  const [rating, setRating] = useState<number | null>(null);
  const {
    isLoading: isReviewLoading,
    data: review,
    error,
  } = api.review.getReviewByBook.useQuery(bookId || "", {
    enabled: Boolean(bookId),
    retry: false,
    refetchOnWindowFocus: false,
  });
  const { mutateAsync: updateReview } = api.review.update.useMutation();
  const { mutateAsync: deleteReview, isLoading: isDeletingReview } =
    api.review.delete.useMutation();
  const { mutateAsync: createReview } = api.review.create.useMutation();

  const handleUpdate = async (description: string) => {
    if (review) {
      try {
        await updateReview({ id: review.id, rating: rating || 0, description });
        toast.success("Review updated successfully");
        utils.review.invalidate();
        setIsEditMode(false);
      } catch {
        toast.error("Failed to update review");
      }
    }
  };

  const handleDelete = async () => {
    if (review) {
      try {
        await deleteReview(review.id);
        toast.success("Review deleted successfully");
        utils.review.invalidate();
        setRating(null);
      } catch {
        toast.error("Failed to delete review");
      }
    }
  };

  const handleAddReview = async (description: string) => {
    if (bookId) {
      try {
        await createReview({
          bookId,
          rating: rating || 0,
          description,
        });
        toast.success("Review created successfully");
        utils.review.invalidate();
      } catch {
        toast.error("Failed to create review");
      }
    }
  };

  if (isReviewLoading) return <p>Loading...</p>;

  const renderLabel = () => {
    const displayedRating = rating || review?.rating;

    return (
      <Typography>
        {displayedRating ? labels[displayedRating] : "No rating"}
      </Typography>
    );
  };

  if (!review || error?.data?.code === "NOT_FOUND") {
    return (
      <div className="flex flex-col gap-2">
        <div className="flex gap-x-2 items-center">
          <Rating
            className="w-auto self-start"
            precision={0.5}
            size="large"
            name="book-rating"
            onChange={(_event, newValue) => {
              setRating(newValue);
            }}
          />
          {renderLabel()}
        </div>
        <TextAreaForm type="CREATE" name="reviews" onSubmit={handleAddReview} />
      </div>
    );
  }

  if (isEditMode) {
    return (
      <div className="flex flex-col gap-2">
        <div className="flex gap-x-2 items-center">
          <Rating
            className="w-auto self-start"
            precision={0.5}
            size="large"
            name="book-rating"
            defaultValue={review.rating || 0}
            value={rating}
            onChange={(_event, newValue) => {
              setRating(newValue);
            }}
          />
          {renderLabel()}
        </div>

        <TextAreaForm
          type="EDIT"
          name="reviews"
          initialValue={review.description}
          onSubmit={handleUpdate}
          onCancel={() => setIsEditMode(false)}
        />
      </div>
    );
  }

  return (
    <Card className="mt-2 p-4 rounded-md flex flex-col gap-2">
      <div className="flex gap-x-2 items-center">
        <Rating
          className="w-auto self-start"
          name="book-rating"
          value={review.rating}
          readOnly
          precision={0.5}
        />
        {renderLabel()}
      </div>

      <Typography className="text-lg font-semibold text-primary-main">
        {review.description}
      </Typography>
      <Typography className="text-sm italic text-text-primary/70">
        {review.updatedAt.toLocaleDateString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
          day: "2-digit",
          month: "short",
          year: "numeric",
        })}
      </Typography>

      <div>
        <IconButton
          onClick={() => {
            setIsEditMode(true);
            setRating(review.rating || 0);
          }}
        >
          <EditIcon />
        </IconButton>
        <IconButton disabled={isDeletingReview} onClick={handleDelete}>
          <DeleteIcon />
        </IconButton>
      </div>
    </Card>
  );
};

const BookReview: FC = () => {
  const {
    id,
    isLoading: isBookDetailsLoading,
    isError: isBookDetailsError,
  } = useBookDetails();

  if (isBookDetailsLoading) return <p>Loading...</p>;
  if (isBookDetailsError) return <p>Error...</p>;

  return (
    <div className="flex flex-col w-full sm:w-1/2">
      {id && <BookReviewCardAndForm bookId={id} />}
    </div>
  );
};

export default BookReview;
