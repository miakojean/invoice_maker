<template>
    <select class="select">
        <option disabled selected>Choisir une monnaie</option>
        <option 
            v-for="(option, index) in options"
            :key="index"
        >{{ option }}</option>
    </select>
</template>

<script lang="ts">
export default {

    props:{
        options:{
            type:Array,
            default:()=>[
                'Franc CFA',
                'Euro',
                'Dollar'
            ]
        }
    }

}
</script>

<style>

</style>