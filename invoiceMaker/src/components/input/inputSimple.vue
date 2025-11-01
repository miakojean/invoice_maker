<template>
  <input 
    :type="inputType" 
    :placeholder="placeholder" 
    class="input" />
</template>

<script lang="ts">
export default {

    props:{
        placeholder:{
            type:String,
        },
        inputType:{
            type:String,
            default:"text"
        }
    }

}
</script>

<style>

</style>