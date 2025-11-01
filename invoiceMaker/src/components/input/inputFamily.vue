<template>
  <fieldset class="fieldset">
    <legend class="fieldset-legend">{{ label }}</legend>
    <input 
      :type="inputType" 
      class="input" 
      :placeholder="placeholder"
    />
  </fieldset>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'InputFamily',
  
  props: {
    modelValue: {
      type: String,
      default: ''
    },
    label:{
      type:String,
      default:"Nom complet du client",
    },
    placeholder:{
      type:String,
    },
    inputType:{
      type:String,
      default:"text"
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