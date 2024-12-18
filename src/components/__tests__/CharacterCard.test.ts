import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createRouter, createMemoryHistory } from 'vue-router'
import CharacterCard from '@/components/molecules/CharacterCard.vue'

describe('CharacterCard', () => {
  const mockCharacter = {
    id: '1',
    name: 'Luke Skywalker',
    height: 1.72,
    mass: 73,
    gender: 'male',
    homeworld: 'tatooine',
    wiki: 'http://starwars.wikia.com/wiki/Luke_Skywalker',
    image: 'https://vignette.wikia.nocookie.net/starwars/images/2/20/LukeTLJ.jpg',
    born: -19,
    bornLocation: 'polis massa',
    died: 34,
    diedLocation: 'ahch-to',
    species: 'human',
    hairColor: 'blond',
    eyeColor: 'blue',
    skinColor: 'light',
    cybernetics: 'Prosthetic right hand',
    affiliations: [
      'Alliance to Restore the Republic',
      'Red Squadron',
      'Rogue Squadron',
      'Massassi Group',
      "Leia Organa's team",
      'Endor strike team',
      'Jedi Order',
      'Bright Tree tribe',
      'New Republic',
      'Resistance',
    ],
    masters: ['Obi-Wan Kenobi', 'Yoda'],
    apprentices: ['Leia Organa', 'Ben Solo (along with a dozen apprentices)', 'Rey'],
    formerAffiliations: [],
    selected: false,
  }

  it('renders character information correctly', () => {
    const wrapper = mount(CharacterCard, {
      props: { character: mockCharacter, deletable: false, perspective: true },
    })

    expect(wrapper.text()).toContain('Luke Skywalker')
  })

  it('renders character image correctly', () => {
    const wrapper = mount(CharacterCard, {
      props: { character: mockCharacter, deletable: false, perspective: true },
    })

    const img = wrapper.find('img')
    expect(img.attributes('src')).toBe(mockCharacter.image)
    expect(img.attributes('alt')).toBe(mockCharacter.name)
  })

  it('navigates to the correct page when clicked', async () => {
    const router = createRouter({
      history: createMemoryHistory(),
      routes: [
        {
          path: '/character/:id',
          name: 'CharacterDetail',
          component: { template: '<div>Character Detail</div>' },
        },
      ],
    })

    const wrapper = mount(CharacterCard, {
      props: { character: mockCharacter, deletable: false, perspective: true },
      global: { plugins: [router] },
    })
    const cardContainer = wrapper.find('.card-container')
    await cardContainer.trigger('click')
    await router.isReady()
    expect(router.currentRoute.value.path).toBe(`/character/${mockCharacter.id}`)
  })
})
