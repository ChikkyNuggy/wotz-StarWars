<script setup lang="ts">
import { defineProps } from 'vue'
import type { Character } from '@/types/type'
import { useImagePerspective } from '@/composables/useImagePerspective'

defineProps<{ character: Character }>()
const { applyTransform, resetTransform } = useImagePerspective()
</script>

<template>
  <div
    class="card-container"
    @click="$emit('goToDetail', character)"
    @mousemove="applyTransform"
    @mouseleave="resetTransform"
  >
    <div class="image">
      <img :src="character.image" :alt="character.name" />
    </div>
    <div>
      <h2>{{ character.selected ? '✅  ' : '' }}{{ character.name }}</h2>
      <p>{{ character.species }}</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.card-container {
  padding: 1rem;
  border-radius: 0.5rem;
  text-align: center;
  cursor: pointer;
  transition: transform 0.1s ease-in-out;

  .image {
    margin-bottom: 1rem;

    img {
      width: 100%;
      height: 20rem;
      object-fit: cover;
      object-position: top;
      border-radius: 0.5rem;
    }
  }

  div {
    display: flex;
    justify-content: left;
    align-items: baseline;
    gap: 0.2rem;

    h2 {
      font-weight: 700;
      letter-spacing: -2%;
    }

    p {
      font-size: 0.8rem;
      color: #666;
    }
  }

  &:before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 40%;
    height: 40%;
    background-color: rgba(255, 233, 159, 0.5);
    border-radius: 50rem;
    opacity: 0;
    transition: opacity 0.1s ease-in-out;
    z-index: -1;
    filter: blur(10rem);
  }

  &:hover:before {
    opacity: 1;
  }

  &:not(:hover) {
    z-index: -2;
  }
}
</style>
