<script setup lang="ts">
import CharacterCard from '@/components/molecules/CharacterCard.vue'
import useCharacterStore from '@/stores/character'

const characterStore = useCharacterStore()
</script>

<template>
  <ul>
    <CharacterCard
      v-for="character in characterStore.team"
      :key="character.id"
      :character="character"
    />
  </ul>
  <p v-show="characterStore.team.length === 0">No team.</p>
</template>

<style scoped lang="scss">
ul {
  width: 90%;
  margin: 0 auto;
  list-style: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(18rem, 1fr));
  gap: 1.5rem;
}
</style>
