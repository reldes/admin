<!-- components/shared/Snackbar.vue -->
<template>
    <v-snackbar v-model="visible" :timeout="timeout" :color="color">
      {{ message }}
    </v-snackbar>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, watch } from 'vue';
  
  export default defineComponent({
    name: 'Snackbar',
    props: {
      message: {
        type: String,
        required: true
      },
      timeout: {
        type: Number,
        default: 3000
      },
      color: {
        type: String,
        default: 'success'
      }
    },
    setup(props) {
      const visible = ref(false);
  
      watch(
        () => props.message,
        (newMessage) => {
          if (newMessage) {
            visible.value = true;
          }
        }
      );
  
      return {
        visible
      };
    }
  });
  </script>