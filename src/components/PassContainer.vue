<script setup>
import { ref } from "vue";
import { getPassword } from "../service/PasswordService.js";
import Checkbox from "./Checkbox.vue";
import Slider from "./Slider.vue";

const DEFAULT_PASSWORD_LENGTH = 14;
const password = ref("passgen");
const passwordLength = ref(DEFAULT_PASSWORD_LENGTH);
const strength = ref("");
const strengthLevel = ref(0);
const setupConfigs = ref([
  {
    name: "Include Uppercase Letters",
    active: true
  },
  {
    name: "Include Lowercase Letters",
    active: true
  },
  {
    name: "Include Numbers",
    active: true
  },
  {
    name: "Include Symbols",
    active: true
  }
]);

function checked(configName) {
  const config = setupConfigs.value.find(item => item.name == configName);
  config.active = !config.active;
}

function slide(value) {
  passwordLength.value = value;
}

function copy() {
  let copyText = document.getElementById("pass").innerText;
  navigator.clipboard.writeText(copyText);
}

function resolveStrengthLevel(strength) {
  if (strength == "Weak") {
    strengthLevel.value = 1;
  }

  if (strength == "Moderate") {
    strengthLevel.value = 2;
  }

  if (strength == "Strong") {
    strengthLevel.value = 3;
  }
}

function passwordValid() {
  return setupConfigs.value.some(item => item.active == true);
}

async function setPassword() {
  const params = {
    length: passwordLength.value,
    uppercase: setupConfigs.value[0].active,
    lowercase: setupConfigs.value[1].active,
    digits: setupConfigs.value[2].active,
    special_char: setupConfigs.value[3].active
  };

  const data = await getPassword(params);
  password.value = data.password;
  strength.value = data.strongness;
  resolveStrengthLevel(data.strongness);
}
</script>

<template>
  <div class="container">
    <h2>Password generator</h2>

    <div class="pass-placeholder">
      <div class="pass" id="pass">{{ password }}</div>
      <button @click="copy" class="copy">
        <img src="/src/assets/icon-copy.svg" alt="copy" />
      </button>
    </div>

    <div class="card-setup">
      <div class="card-setup-header">
        <h3 class="character-length">Character Length</h3>
        <h1>{{ passwordLength }}</h1>
      </div>

      <div class="car-setup-config">
        <Slider @slide="slide" :default-value="passwordLength" />
        <div v-for="config in setupConfigs" :key="config.name" class="config">
          <Checkbox @checked="checked" :config-name="config.name" />
          <h3>{{ config.name }}</h3>
        </div>

        <div class="card-setup-strength">
          <h3>STRENGTH</h3>
          <div class="card-setup-strength-level">
            <h2>{{ strength }}</h2>
            <div class="card-setup-strength-box-container">
              <div
                v-for="index in 3"
                :class="{
                  'card-setup-strength-box-filled': index <= strengthLevel
                }"
                class="card-setup-strength-box"
                :key="index"
              ></div>
            </div>
          </div>
        </div>

        <button
          class="card-setup-generate"
          :disabled="!passwordValid()"
          @click="setPassword()"
        >
          GENERATE
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  width: clamp(30rem, 34rem, 40rem);
}

.pass-placeholder {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: var(--clr-dark-grey);
  padding: 1rem 1.5rem;
  width: 100%;
}

.pass {
  font-size: 2rem;
  color: var(--clr-almost-white);
}

.copy {
  padding: 0.5rem;
  background-color: transparent;
  border: 0;
  cursor: pointer;
}

.copy:active {
  background-color: var(--clr-very-dark-grey);
}

.card-setup {
  background-color: var(--clr-dark-grey);
  padding: 1rem;
  width: 100%;
}

.card-setup-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.card-setup-header > h1 {
  color: var(--clr-neon-green);
}

.container > h2,
.card-setup-strength > h3 {
  color: var(--clr-grey);
}

.car-setup-config {
  display: flex;
  flex-direction: column;
  padding-top: 1rem;
  gap: 1rem;
}

.config {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.card-setup-strength {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: var(--clr-very-dark-grey);
}

.card-setup-strength-level {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.card-setup-strength-box {
  background: transparent;
  border: 1px solid white;
  width: 0.7rem;
  height: 1.8rem;
}

.card-setup-strength-box-filled {
  background: var(--clr-neon-green);
  border: 0;
}

.card-setup-strength-box-container {
  display: flex;
  align-items: center;
  gap: 0.7rem;
}

.card-setup-generate {
  background-color: var(--clr-neon-green);
  border: 1px solid transparent;
  padding: 1.5rem;
  font-weight: bold;
  font-size: 1.2rem;
  font-family: inherit;
  cursor: pointer;
}

.card-setup-generate:disabled,
.card-setup-generate:disabled:hover {
  background: var(--clr-grey);
  color: var(--clr-almost-white);
  border: 0;
  cursor: not-allowed;
}

.card-setup-generate:hover {
  background-color: var(--clr-very-dark-grey);
  color: var(--clr-neon-green);
  border-color: var(--clr-neon-green);
}
</style>
