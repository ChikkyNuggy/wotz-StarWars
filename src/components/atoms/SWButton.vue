<template>
  <button>
    <slot></slot>
  </button>
</template>

<style scoped lang="scss">
button {
  font-size: 0.8rem;
  margin: 0 0.5rem;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.5rem;
  background-color: #f8eea9;
  color: var(--color-background);
  cursor: pointer;
  width: 100%;
  transition: opacity 0.5s ease-in-out;

  &.disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}
</style>
