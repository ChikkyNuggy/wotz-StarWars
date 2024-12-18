<script setup lang="ts">
import type { Character } from '@/types/type'
import CharacterCard from '@/components/molecules/CharacterCard.vue'
import useCharacterStore from '@/stores/character'

const characterStore = useCharacterStore()

const deleteCharacter = (character: Character) => {
  characterStore.removeFromTeam(character.id)
}
</script>

<template>
  <ul>
    <CharacterCard
      v-for="character in characterStore.team"
      :key="character.id"
      :character="character"
      :deletable="true"
      :perspective="false"
      @delete="deleteCharacter"
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
