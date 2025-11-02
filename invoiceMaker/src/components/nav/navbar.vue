<template>
  <nav 
    class="w-full p-4 flex justify-around items-center gap-2 bg-white sticky top-0 z-50 transition-all duration-300"
    :class="{'shadow-md': hasShadow}"
  >
    <div class="shrink-0">
      <h2 class="text-2xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Calinvoice</h2>
    </div>

    <ul class="w-auto flex gap-8">
      <li class="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200 cursor-pointer py-1 px-2 rounded-md hover:bg-blue-50">Accueil</li>
      <li class="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200 cursor-pointer py-1 px-2 rounded-md hover:bg-blue-50">A propos</li>
      <li class="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200 cursor-pointer py-1 px-2 rounded-md hover:bg-blue-50">Newsletter</li>
      <li class="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200 cursor-pointer py-1 px-2 rounded-md hover:bg-blue-50">Templates</li>
      <li class="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200 cursor-pointer py-1 px-2 rounded-md hover:bg-blue-50">Pricing</li>
    </ul>
    
    <div class="shrink-0">
      <mainButton label="Se connecter"/>
    </div>
  </nav>
</template>

<script lang="ts">
import mainButton from '../button/mainButton.vue';

export default {
  name: 'Navbar',
  components: {
    mainButton
  },
  data() {
    return {
      hasShadow: false
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    handleScroll() {
      // Active l'ombre après 10px de scroll
      this.hasShadow = window.scrollY > 10;
    }
  }
}
</script>

<style scoped>
/* Transition douce pour l'ombre */
nav {
  transition: box-shadow 0.3s ease-in-out;
}
</style>