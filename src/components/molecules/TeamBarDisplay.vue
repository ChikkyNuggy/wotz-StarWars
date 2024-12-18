<script setup lang="ts">
import useCharacterStore from '@/stores/character'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import type { Character } from '@/types/type'

const characterStore = useCharacterStore()

const handleRemove = (character: Character) => {
  characterStore.removeFromTeam(character.id)
}
</script>

<template>
  <div class="team-display">
    <ul>
      <li v-for="character in characterStore.team" :key="character.id">
        <div class="image"><img :src="character.image" :alt="character.name" /></div>
        <button class="remove" @click="handleRemove(character)">
          <FontAwesomeIcon :icon="faXmark" />
        </button>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.team-display {
  display: flex;
  align-items: center;

  h3 {
    font-size: 1.8rem;
    font-weight: 700;
    margin: 0;
    margin-right: 1rem;
  }

  ul {
    display: flex;
    margin: 0;
    padding: 0;
    list-style: none;
    gap: 0.5rem;

    li {
      position: relative;

      .image {
        width: 3.3rem;
        height: 3.3rem;
        border-radius: 50%;
        overflow: hidden;
        border: solid 0.2rem #222222;
        background-color: var(--color-background);

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: top;
        }
      }

      button {
        position: absolute;
        top: -0.3rem;
        right: 0rem;
        width: 1.2rem;
        height: 1.2rem;
        border-radius: 50%;
        background-color: #f8a9a9;
        border: none;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        transition: background-color 0.5s ease-in-out;

        &:hover {
          background-color: #f86767;
        }

        svg {
          font-size: 0.8rem;
          color: var(--color-background);
        }
      }
    }
  }
}
</style>
