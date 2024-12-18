<script setup lang="ts">
import { defineProps } from 'vue'
import SWButton from '@/components/atoms/SWButton.vue'
import type { Character } from '@/types/type'
import useCharacterStore from '@/stores/character'

const props = defineProps<{ pCharacter: Character | null }>()
const characterStore = useCharacterStore()

console.log(props.pCharacter)

const handleAdd = () => {
  const imperialNames = ['Darth', 'Sith']
  const isImperial = imperialNames.some((name) => props.pCharacter?.name.includes(name))
  if (isImperial) {
    alert('You cannot add an imperial character to the team')
    return
  }
  if (props.pCharacter) {
    characterStore.addToTeam(props.pCharacter.id)
  }
}

const handleRemove = () => {
  if (props.pCharacter) {
    characterStore.removeFromTeam(props.pCharacter.id)
  }
}
</script>

<template>
  <div class="container">
    <div class="buttons">
      <SWButton
        @click="handleAdd"
        class="add"
        :disabled="!props.pCharacter || props.pCharacter.selected"
        :class="{ disabled: !props.pCharacter || props.pCharacter.selected }"
        >Add</SWButton
      >
      <SWButton @click="handleRemove" class="remove">Remove</SWButton>
    </div>
  </div>
</template>

<style scoped lang="scss">
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 0 1rem 0;

  .buttons {
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;

    button {
      min-width: 20%;
      &.add {
        background-color: #a2ff78;
      }

      &.remove {
        background-color: #f8a9a9;
      }
    }
  }
}
</style>
