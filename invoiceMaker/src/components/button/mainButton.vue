<template>
    <button class="btn">
        <span class="loading loading-spinner" v-if="isLoading === true"></span>
        <span v-if="isLoading === false">{{ label }}</span>
    </button>
</template>

<script lang="ts">
export default {

    props:{
        label:{
            type:String,
            default:"Générer référence"
        },
        isLoading:{
            type:Boolean,
            default: false
        }
    },
    
}
</script>

<style scoped>
.btn{
    background: #a1e1ff;
    border: none;
    min-width: 200px;
}
</style>