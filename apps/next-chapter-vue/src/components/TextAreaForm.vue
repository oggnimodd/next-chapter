<script setup lang="ts">
import { useField } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { z } from "zod";

export interface TextAreaFormProps {
  type: "CREATE" | "EDIT";
  onSubmit: (description: string) => Promise<void> | void;
  onCancel?: () => void;
  name: string;
  initialValue?: string;
  isLoading?: boolean;
}

// Define vue props
const { type, onSubmit, onCancel, name, initialValue, isLoading } =
  defineProps<TextAreaFormProps>();

const validateSchema = z.object({
  description: z
    .string()
    .min(1, { message: "Content cannot be empty" })
    .max(500, { message: "Content cannot exceed 500 characters" }),
});

type FormValues = z.infer<typeof validateSchema>;

const {
  value: formValues,
  errorMessage: formError,
  resetField,
} = useField<FormValues>("description", toTypedSchema(validateSchema), {
  initialValue: { description: initialValue ?? "" },
});

const isCreate = type === "CREATE";
const isEdit = type === "EDIT";

const handleSubmit = () => {
  const description = formValues.value.description ?? "";

  onSubmit(description);

  if (isCreate) {
    resetField();
  }
};
</script>

<template>
  <template>
    <form @submit.prevent="handleSubmit" class="flex flex-col space-y-4">
      <VTextarea :autofocus="isEdit" rows="4" :placeholder="isCreate ? `Write a new ${name}...` : `Edit your ${name}...`
        " :error-messages="formError" class="w-full" v-model="formValues.description"></VTextarea>
      <div class="flex justify-end gap-x-2">
        <VBtn v-if="isEdit" @click="onCancel" color="primary" class="self-start" x-small>Cancel</VBtn>
        <VBtn :disabled="isLoading" type="submit" color="primary" class="self-start" dark icon="mdi-plus">
          {{ isCreate ? `Create ${name}` : `Save ${name}` }}
        </VBtn>
      </div>
    </form>
  </template>
</template>
