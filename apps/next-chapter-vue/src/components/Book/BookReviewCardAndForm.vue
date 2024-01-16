<script setup lang="ts">
import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query';
import { api } from "@/trpc"
import { ref } from "vue"
import { toast } from 'vue-sonner';
import { computed } from 'vue';
import TextAreaForm from '../TextAreaForm.vue';


interface BookReviewCardAndFormProps {
  bookId: string
}
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

const { bookId } = defineProps<BookReviewCardAndFormProps>();

const queryClient = useQueryClient();
const isEditMode = ref(false);
const rating = ref<number | null>(null);

// Get book
const { isLoading: isReviewLoading, data: review, error } = useQuery({
  queryKey: ['review', bookId],
  queryFn: () => api.review.getReviewByBook.query(bookId),
  retry: false,
});

// Update review mutation
const { mutateAsync: updateReview, isPending: isUpdatingReview } = useMutation({
  mutationFn: api.review.update.mutate,
  onSuccess: () => {
    toast.success('Review updated successfully');
    queryClient.invalidateQueries({ queryKey: ['review', bookId] });
    isEditMode.value = false;
  },
  onError: () => {
    toast.error('Failed to update review');
  },
});

// Delete review mutation
const { mutateAsync: deleteReview, isPending: isDeletingReview } = useMutation({
  mutationFn: api.review.delete.mutate,
  onSuccess: () => {
    toast.success('Review deleted successfully');
    queryClient.invalidateQueries({ queryKey: ['review', bookId] });
    isEditMode.value = false;
    rating.value = null;
  },
  onError: () => {
    toast.error('Failed to delete review');
  },
});

// Create new review mutation
const { mutateAsync: createReview, isPending: isCreatingReview } = useMutation({
  mutationFn: api.review.create.mutate,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['review', bookId] });
    isEditMode.value = false;
    toast.success('Review created successfully');
  },
  onError: () => {
    toast.error('Failed to create review');
  },
});


// Toggle edit mode
const openEditMode = () => {
  isEditMode.value = true;
  rating.value = review.value?.rating || null;
};

const handleUpdate = async () => {
  await updateReview({ bookId, id: review.value?.id, rating: rating.value });
}

const handleDelete = async () => {
  if (review.value) {
    await deleteReview(review.value.id);
  }
}

const handleAddReview = async (description: string) => {
  if (bookId) {
    await createReview({
      bookId,
      rating: rating.value || 0,
      description,
    });
  }
};


const formattedDate = computed(() => review.value ? review.value.updatedAt.toLocaleDateString("en-US", {
  hour: "2-digit",
  minute: "2-digit",
  hour12: true,
  day: "2-digit",
  month: "short",
  year: "numeric",
}) : "")
</script>

<template>
  <p v-if="isReviewLoading">Loading...</p>
  <div v-else-if="!review || error" class="flex flex-column gap-2">
    <!-- Rating form -->
    <div class="flex gap-x-2 items-center">
      <VRating hover color="warning" class="self-start" v-model="rating as number" half-increments length="5"></VRating>
      <span>{{ rating ? labels[rating] : 'No rating' }}</span>
    </div>
    <!-- Review form -->
    <TextAreaForm :isLoading="isCreatingReview" type="CREATE" name="review" :onSubmit="handleAddReview" />
  </div>
  <div v-else>

    <!-- Edit mode -->
    <div v-if="review && isEditMode" class="flex flex-column gap-2">
      <!-- Rating form -->
      <div class="flex gap-x-2 items-center">
        <VRating hover color="warning" class="self-start" v-model="rating as number" half-increments length="5">
        </VRating>
        <span>{{ rating ? labels[rating] : 'No rating' }}</span>
      </div>
      <!-- Review form -->
      <TextAreaForm :isLoading="isUpdatingReview" type="EDIT" name="reviews" :initialValue="review.description"
        :onSubmit="handleUpdate" :onCancel="() => isEditMode = false" />
    </div>


    <!-- Normal mode -->
    <VCard v-if="review && !isEditMode" class="mt-2 p-4 rounded-md flex flex-column gap-2">
      <!-- Rating display -->
      <div class="flex gap-x-2 items-center flex-wrap">
        <VRating hover color="warning" class="self-start" v-model="review.rating as number" readonly half-increments
          length="5">
        </VRating>
        <span>{{ review.rating ? labels[review.rating] : 'No rating' }}</span>
      </div>
      <!-- Review content -->
      <VCardTitle class="font-weight-bold primary--text">{{ review.description }}</VCardTitle>
      <VCardSubtitle class="text-sm italic">{{ formattedDate }}</VCardSubtitle>
      <!-- Action buttons -->
      <div class="flex gap-x-2">
        <VBtn icon="mdi-pencil" class="shadow-none" size="small" @click="openEditMode" />
        <VBtn :isLoading="isDeletingReview" class="shadow-none" size="small" icon="mdi-delete"
          :disabled="isDeletingReview" @click="handleDelete" />
      </div>
    </VCard>
  </div>
</template>

