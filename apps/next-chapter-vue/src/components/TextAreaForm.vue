<script setup lang="ts">
import { useForm } from "vee-validate";
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



const { errors, resetForm, handleSubmit, defineField } = useForm<FormValues>({
  initialValues: { description: initialValue ?? "" },
  validationSchema: toTypedSchema(validateSchema),
})

const isCreate = type === "CREATE";
const isEdit = type === "EDIT";


const submit = handleSubmit(values => {
  onSubmit(values.description)
  if (isCreate) {
    resetForm();
  }
})

const [description] = defineField("description")
</script>

<template>
  <form @submit.prevent="submit" class="flex flex-col space-y-4">
    <VTextarea :autofocus="isEdit" rows="4" :placeholder="isCreate ? `Write a new ${name}...` : `Edit your ${name}...`
      " :error-messages="errors.description" class="w-full" v-model="description">
    </VTextarea>
    <div class="flex justify-end gap-x-2">
      <VBtn size="small" v-if="isEdit" @click="onCancel" color="primary" class="self-start" variant="tonal">
        Cancel</VBtn>
      <VBtn size="small" :disabled="isLoading" type="submit" color="primary" class="self-start">
        <VIcon icon="mdi-plus" />
        {{ isCreate ? `Create ${name}` : `Save ${name}` }}
      </VBtn>
    </div>
  </form>
</template>
