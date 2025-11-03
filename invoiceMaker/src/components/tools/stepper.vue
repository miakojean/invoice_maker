<template>
    <div class="min-w-40">
        <ul class="steps steps-vertical">
            <li class="step" :class="{'step-primary': step >= 1}">Mon entreprise</li>
            <li class="step" :class="{'step-primary': step >= 2}">Le client</li>
            <li class="step" :class="{'step-primary': step >= 3}">Facture</li>
            <li class="step" :class="{'step-primary': step >= 4}">Ajout d'articles</li>
        </ul>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
    name: 'Stepper',

    setup() {
        const step = ref(3); // Exemple : étape 2 active

        return {
            step
        }
    }
})
</script>

<style scoped>

li{
    font-size: 0.8rem;
}

</style>