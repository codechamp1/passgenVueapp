<script setup>
const props = defineProps({
  defaultValue: {
    type: String,
    required: true
  }
});
const MINIMAL_SLIDER_VALUE = 4;
const MAXIMAL_SLIDER_VALUE = 20;
</script>

<template>
  <input
    id="rangeSlider"
    type="range"
    class="slider"
    @input="$emit('slide', $event.target.value)"
    :value="props.defaultValue"
    :min="MINIMAL_SLIDER_VALUE"
    :max="MAXIMAL_SLIDER_VALUE"
    step="1"
  />
</template>

<style scoped>
.slider {
  width: 100%;
  cursor: pointer;
}

input[type="range"] {
  appearance: none;
  background-color: var(--clr-very-dark-grey);
  height: 0.7rem;
}

input[type="range"]::-webkit-slider-thumb {
  height: 1.5rem;
  width: 1.5rem;
  border-radius: 15px;
  background: var(--clr-almost-white);
  cursor: pointer;
  appearance: none;
}
</style>
