<script setup lang="ts">
import SWButton from '@/components/atoms/SWButton.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const goToHome = () => {
  router.push({ name: 'Home' })
}

setTimeout(() => {
  const spans: NodeListOf<HTMLElement> = document.querySelectorAll('h1 span')
  spans.forEach((span, idx) => {
    span.style.transition = '0.5s'
    span.style.transitionDelay = `${idx * 0.1}s`
    span.style.transform =
      'rotate(' + Math.floor(Math.random() * 20) * (Math.random() > 0.5 ? 1 : -1) + 'deg)'
  })
}, 500)
</script>

<template>
  <main>
    <div class="hero">
      <h1><span>4</span><span>0</span><span>4</span></h1>
      <p>You seem lost in space, lets get you back.</p>
      <SWButton @click="goToHome">Go Home</SWButton>
    </div>
  </main>
</template>

<style scoped lang="scss">
main {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 75dvh;

  .hero {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    h1 {
      font-size: 30dvw;
      font-weight: 900;
      height: 30dvw;
      letter-spacing: 2%;
      z-index: -1;
      span {
        display: inline-block;
        transition: transform 0.5s;
      }
    }
    p {
      font-size: 3dvw;
      margin: 5dvw 0 1rem;
    }
    button {
      width: fit-content;
    }
  }
}
</style>
