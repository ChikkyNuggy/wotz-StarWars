<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import type { Character } from '@/types/type'
import useCharacterStore from '@/stores/character'
import CharacterCard from '@/components/molecules/CharacterCard.vue'
import SWPagination from '@/components/molecules/SWPagination.vue'

const characterStore = useCharacterStore()
const router = useRouter()

const currentPage = ref(1)
const itemsPerPage = ref(12)

const paginatedCharacters = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return characterStore.characters.slice(start, end)
})

const totalPages = computed(() => {
  return Math.ceil(characterStore.characters.length / itemsPerPage.value)
})

const handleViewCharacter = (character: Character) => {
  router.push(`/character/${character.id}`)
}

const goToPage = (page: number) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}
</script>

<template>
  <div class="container">
    <ul>
      <li v-for="character in paginatedCharacters" :key="character.id">
        <CharacterCard :character="character" @go-to-detail="handleViewCharacter" />
      </li>
    </ul>
    <SWPagination
      :current-page="currentPage"
      :total-pages="totalPages"
      :display-span="true"
      @go-to-page="goToPage"
    />
  </div>
</template>

<style scoped lang="scss">
.container {
  display: flex;
  flex-direction: column;
  width: 100%;
  ul {
    width: 90%;
    margin: 0 auto;
    list-style: none;
    padding: 0;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(18rem, 1fr));
    gap: 2.5rem;
  }
}
</style>
