import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Character, APIResponse } from '@/types/type'
import { getCharacters } from '@/services/characterService'

const useCharacterStore = defineStore(
  'characters',
  () => {
    const characters = ref<Character[]>([])
    const team = ref<Character[]>([])

    const fetchCharacters = async () => {
      const response: APIResponse<Character[]> = await getCharacters()
      response.data.forEach((character) => {
        character.selected = team.value.some((teamCharacter) => teamCharacter.id === character.id)
      })
      characters.value = response.data
    }

    const addToTeam = (id: string) => {
      if (team.value.length === 5) {
        return
      }

      const character = characters.value.find((character) => character.id === id)
      if (character && !team.value.includes(character)) {
        character.selected = true
        team.value.push(character)
      }
    }

    const removeFromTeam = (id: string) => {
      const character = characters.value.find((character) => character.id === id)
      if (character) {
        character.selected = false
        team.value = team.value.filter((character) => character.id !== id)
      }
    }

    const getCharacterById = (id: string): Character | null => {
      console.log(characters.value.find((character) => character.id === id))
      return characters.value.find((character) => character.id === id) || null
    }

    return {
      characters,
      team,
      fetchCharacters,
      addToTeam,
      removeFromTeam,
      getCharacterById,
    }
  },
  {
    persist: true,
  },
)

export default useCharacterStore
