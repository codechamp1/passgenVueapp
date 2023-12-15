<script setup>
import PassContainer from "/src/components/PassContainer.vue";
import Footer from "/src/components/Footer.vue";
</script>

<template>
  <div class="layout">
    <PassContainer class="passcontainer" />
    <Footer class="footer" />
  </div>
</template>

<style scoped>
.passcontainer {
  margin: auto;
}

.footer {
  margin-top: auto;
}

.layout {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
}
</style>
