<template>
  <form
    @submit.prevent="$emit('submit')"
    class="relative w-full max-w-3xl"
  >
    <div class="flex items-center gap-2 rounded-2xl border border-border bg-card p-2 shadow-sm transition-all focus-within:border-ring focus-within:ring-2 focus-within:ring-ring/20 focus-within:shadow-md">
      <input
        :value="modelValue"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
        type="text"
        :placeholder="disabled ? 'Loading...' : 'Type your message...'"
        :disabled="disabled"
        class="flex-1 border-none bg-transparent px-4 text-base text-foreground placeholder:text-muted-foreground focus:outline-none"
      />

      <button
        v-if="isLoading"
        type="button"
        @click="$emit('stop')"
        class="flex items-center justify-center rounded-xl bg-destructive px-4 py-2.5 text-destructive-foreground shadow-sm transition-all hover:bg-destructive/90 hover:shadow"
      >
        <Icon name="lucide:square" class="h-4 w-4" />
      </button>

      <button
        v-else
        type="submit"
        :disabled="!modelValue.trim() || disabled"
        class="flex items-center justify-center rounded-xl bg-primary px-4 py-2.5 text-primary-foreground shadow-sm transition-all hover:bg-primary/90 hover:shadow disabled:opacity-50 disabled:cursor-not-allowed"
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
