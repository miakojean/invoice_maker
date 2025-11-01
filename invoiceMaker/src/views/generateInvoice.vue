<template>
  <main class="w-full min-h-screen bg-gray-50 flex flex-col justify-center items-center">
    <navbar/>
    <genInvoiceSection/>
  </main>
</template>

<script>
import genInvoiceSection from '@/components/section/genInvoiceSection.vue';
import navbar from '@/components/nav/navbar.vue';
export default {
  components:{
    genInvoiceSection,
    navbar
  }
}
</script>

<style>

</style>