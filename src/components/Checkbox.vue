<script setup>
const props = defineProps({
  configName: {
    type: String,
    required: true
  }
});
</script>

<template>
  <input
    type="checkbox"
    @click="$emit('checked', props.configName)"
    :checked="true"
  />
</template>

<style scoped>
input[type="checkbox"] {
  -webkit-appearance: none;
  appearance: none;
  margin: 0;
  font: inherit;
  color: currentColor;
  width: 1.35em;
  height: 1.35em;
  border: 2px solid white;
  background-color: transparent;
  display: grid;
  place-content: center;
}

input[type="checkbox"]::before {
  content: "\2714";
  width: inherit;
  height: inherit;
  color: transparent;
  transform: scale(0);
  transition: 120ms transform ease-in-out;
  transform-origin: center;
  display: grid;
  place-content: center;
}

input[type="checkbox"]:checked::before {
  transform: scale(1);
  color: var(--clr-dark-grey);
  background-color: var(--clr-neon-green);
}
</style>
