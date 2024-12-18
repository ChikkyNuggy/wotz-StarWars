<script setup lang="ts">
import { defineProps, onBeforeMount, ref, watch } from 'vue'
import { getCharacter } from '@/services/characterService'
import type { Character } from '@/types/type'
import { useImagePerspective } from '@/composables/useImagePerspective'
import { useRouter } from 'vue-router'
import useCharacterStore from '@/stores/character'
import SWPagination from '@/components/molecules/SWPagination.vue'
import AddCharacter from '@/components/molecules/AddCharacter.vue'

const props = defineProps<{ id: string }>()
const character = ref<Character | null>(null)
const characterStore = useCharacterStore()
const router = useRouter()
const { applyTransform, resetTransform } = useImagePerspective(3500, 1)

const currentPage = ref(Number(props.id))
const totalPages = ref(characterStore.characters.length)

const goToPage = (page: number) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
    window.scrollTo({ top: 0, behavior: 'smooth' })
    router.push({ params: { id: String(page) } })
  }
}

onBeforeMount(() => {
  const id = Number(props.id)
  getCharacter(id.toString()).then((data) => {
    character.value = characterStore.getCharacterById(data.data.id)
  })
})

watch(currentPage, (newPage) => {
  const id = Number(newPage)
  getCharacter(id.toString()).then((data) => {
    character.value = characterStore.getCharacterById(data.data.id)
  })
})
</script>

<template>
  <main>
    <SWPagination
      :current-page="currentPage"
      :total-pages="totalPages"
      :displaySpan="false"
      @go-to-page="goToPage"
    />
    <div class="character">
      <div class="image" @mousemove="applyTransform" @mouseleave="resetTransform">
        <img :src="character?.image" :alt="character?.name" />
      </div>
      <div class="info">
        <h2>{{ character?.name }}</h2>
        <div class="specifics">
          <AddCharacter :pCharacter="character" />
          <h3>
            Height: <span>{{ character?.height }}cm</span>
          </h3>
          <h3>
            Mass: <span>{{ character?.mass }}kg</span>
          </h3>
          <div class="affiliations">
            <h3>Affiliations:</h3>
            <ul v-if="character?.affiliations.length !== 0">
              <li v-for="(affiliation, index) in character?.affiliations" :key="index">
                {{ affiliation }}
              </li>
            </ul>
            <p v-else>No affiliations</p>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped lang="scss">
main {
  .character {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    width: 90%;
    margin: 0 auto;

    .image {
      width: 100%;
      transition: transform 0.1s ease-in-out;
      img {
        width: 100%;
        object-fit: contain;
        border-radius: 1rem;
      }
    }

    .info {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 2rem;

      h2 {
        font-size: 2rem;
        font-weight: 700;
        letter-spacing: -5%;
      }

      .specifics {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        width: 90%;
        margin: 0 auto;

        h3 {
          font-size: 1.5rem;
          font-weight: 700;
          span {
            font-weight: 400;
          }
        }

        .affiliations {
          h3 {
            font-size: 1.5rem;
            font-weight: 700;
          }

          ul {
            li {
              font-size: 1.25rem;
              font-weight: 400;
            }
          }
        }
      }
    }
  }

  @media screen and (width > 43rem) {
    .character {
      flex-direction: row;

      .image {
        width: 60%;
      }

      .info {
        width: 40%;
      }
    }
  }
}
</style>
