<template>
  <form
    @submit.prevent="$emit('submit')"
    class="relative w-full max-w-3xl"
  >
    <div class="flex items-center gap-2 rounded-2xl border border-neutral-200 bg-white p-2 dark:border-neutral-700 dark:bg-neutral-800">
      <input
        :value="modelValue"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
        type="text"
        :placeholder="disabled ? 'Loading...' : 'Type your message...'"
        :disabled="disabled"
        class="flex-1 border-none bg-transparent px-4 text-base text-neutral-800 placeholder:text-neutral-500 focus:outline-none dark:text-neutral-200 dark:placeholder:text-neutral-500"
      />

      <button
        v-if="isLoading"
        type="button"
        @click="$emit('stop')"
        class="flex items-center justify-center rounded-xl bg-red-500 px-4 py-2 text-white transition-colors hover:bg-red-600"
      >
        <Icon name="lucide:square" class="h-4 w-4" />
      </button>

      <button
        v-else
        type="submit"
        :disabled="!modelValue.trim() || disabled"
        class="flex items-center justify-center rounded-xl bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Icon name="lucide:send" class="h-4 w-4" />
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
interface Props {
  modelValue: string
  isLoading?: boolean
  disabled?: boolean
}

defineProps<Props>()

defineEmits<{
  'update:modelValue': [value: string]
  submit: []
  stop: []
}>()
</script>
