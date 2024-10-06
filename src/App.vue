<template>
  <RouterView></RouterView>
  <Snackbar :message="snackbarState.message" :color="snackbarState.color" :timeout="snackbarState.timeout" />
</template>

<!-- <script setup lang="ts">

import { useSnackbar } from '@/plugins/snackbar';
import Snackbar from '@/components/shared/Snackbar.vue';
</script> -->
<script lang="ts">
import { RouterView } from 'vue-router';
import { defineComponent, provide } from 'vue';
import { useSnackbar } from '@/plugins/snackbar';
import Snackbar from '@/components/shared/Snackbar.vue';

export default defineComponent({
  name: 'App',
  components: {
    Snackbar
  },
  setup() {
    const { state } = useSnackbar();
    provide('snackbarState', state);

    return {
      snackbarState: state
    };
  }
});
</script> 