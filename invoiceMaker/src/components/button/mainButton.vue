<template>
  <button class="btn">
    <span class="loading loading-spinner" v-if="isLoading === true"></span>
        {{ label }}
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
}
</style>