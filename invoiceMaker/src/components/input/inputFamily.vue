<template>
  <div class="w-full flex flex-col gap-2">
    <label for="">Nom complet du client</label>
    <input 
      type="text" 
      class="input" 
      placeholder="Entrer le nom complet de votre client"
      :value="modelValue"
      @input="updateValue($event)"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'InputFamily',
  
  props: {
    modelValue: {
      type: String,
      default: ''
    }
  },

  emits: ['update:modelValue'],
  
  setup(props, { emit }) {
    const updateValue = (event: Event) => {
      const target = event.target as HTMLInputElement;
      emit('update:modelValue', target.value);
    };

    return {
      updateValue
    };
  }
});
</script>

<style scoped>
</style>