<template>
  <fieldset class="fieldset w-full">
    <legend class="fieldset-legend text-sm font-medium text-gray-500">{{ label }}</legend>
    <input 
      :type="inputType" 
      class="input w-full" 
      :placeholder="placeholder"
      :value="modelValue"
      @input="updateValue"
      :min="inputType === 'number' ? 0 : undefined"
    />
  </fieldset>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'InputFamily',
  
  props: {
    modelValue: {
      type: [String, Number],
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
      
      if (props.inputType === 'number') {
        // Pour les nombres, convertir en number et gérer la valeur minimale
        const value = target.value === '' ? '' : Math.max(0, Number(target.value));
        emit('update:modelValue', value);
      } else {
        // Pour les autres types, garder la valeur en string
        emit('update:modelValue', target.value);
      }
    };

    return {
      updateValue
    };
  }
});
</script>

<style scoped>

.input[type="number"]::-webkit-outer-spin-button,
.input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.input[type="number"] {
  --moz-appearance: textfield;
}
</style>