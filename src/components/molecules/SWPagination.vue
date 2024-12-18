<script setup lang="ts">
import { defineProps } from 'vue'
import PageButton from '@/components/atoms/SWButton.vue'

const props = defineProps<{ currentPage: number; totalPages: number; displaySpan: boolean }>()
</script>

<template>
  <div class="pagination">
    <PageButton
      @click="$emit('goToPage', props.currentPage - 1)"
      :disabled="props.currentPage === 1"
      :class="{ disabled: props.currentPage === 1 }"
      >Previous</PageButton
    >
    <span v-if="displaySpan">{{ props.currentPage }} of {{ props.totalPages }}</span>
    <PageButton
      @click="$emit('goToPage', props.currentPage + 1)"
      :disabled="props.currentPage === props.totalPages"
      :class="{ disabled: props.currentPage === props.totalPages }"
      >Next</PageButton
    >
  </div>
</template>

<style scoped lang="scss">
.pagination {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 1.5rem 0;

  button {
    width: fit-content;
  }
}
</style>
