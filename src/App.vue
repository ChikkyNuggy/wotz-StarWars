<script setup lang="ts">
import useCharacterStore from '@/stores/character'
import { onBeforeMount, computed } from 'vue'
import { useRouter, RouterLink, useRoute } from 'vue-router'
import TeamBarDisplay from './components/molecules/TeamBarDisplay.vue'

const characterStore = useCharacterStore()
const router = useRouter()
const route = useRoute()

onBeforeMount(() => {
  characterStore.fetchCharacters()
})

const goToHome = () => {
  router.push('/')
}

const showTeamBar = computed(() => {
  return route.matched.some((record) => record.meta.showTeamBar)
})

const showHeaderContent = computed(() => {
  return route.matched.some((record) => record.meta.showHeaderContent)
})
</script>

<template>
  <header>
    <div class="main" v-show="showHeaderContent">
      <h1 @click="goToHome">StarWars</h1>
      <nav>
        <ul>
          <li><RouterLink to="/">Home</RouterLink></li>
          <li><RouterLink to="/team">Team</RouterLink></li>
        </ul>
      </nav>
    </div>
    <div class="team" v-show="showTeamBar">
      <TeamBarDisplay />
    </div>
  </header>
  <RouterView />
  <footer></footer>
</template>

<style scoped lang="scss">
header {
  .main {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: last baseline;
    margin-bottom: 1rem;

    h1 {
      cursor: pointer;
      margin: 0;
    }

    nav {
      ul {
        display: flex;
        gap: 2rem;
        margin: 0;
        padding: 0;

        li {
          list-style: none;

          a {
            text-decoration: none;
            color: var(--color-text);
            font-weight: 700;
            font-size: 1.3rem;

            &.router-link-active {
              color: var(--color-primary);
            }
          }

          &:hover {
            a {
              color: var(--color-primary);
            }
          }
        }
      }
    }
  }

  .team {
    display: flex;
    align-items: center;
    justify-content: end;
    margin-bottom: 1rem;
  }
}

@media screen and (width < 43rem) {
  header {
    .main {
      flex-direction: column;
      align-items: center;
    }
  }

  .team {
    justify-content: center;
  }
}
</style>
