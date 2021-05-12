<template>
  <v-app-bar app>
    <v-app-bar-nav-icon disabled>
      <v-img
          class="ml-12"
          src="https://mova.vc/img/footer_mova.svg"
          max-width="80"
      ></v-img>
    </v-app-bar-nav-icon>
    <v-spacer></v-spacer>
      <v-btn elevation="2"
             outlined
             tile
             color="purple"
             v-on:click="onClickButton"
      >
        <v-icon left
                small
                dense
                color="purple"
        >
          keyboard_return
        </v-icon>
        <span class="pl-2" style="text-transform: none">
          Voltar
        </span>
      </v-btn>
  </v-app-bar>
</template>

<script>
export default {
  name: "ToolbarSystem",
  methods: {
    onClickButton () {
         this.$emit('clicked', false)
     }
  }
}
</script>

<style scoped>

</style>