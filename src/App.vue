<script setup lang="ts">
import AccountForm from "./components/AccountForm.vue";
import Button from "primevue/button";
import GithubIcon from "@/assets/GithubIcon.vue";
import HintIcon from "@/assets/HintIcon.vue";
import PlusIcon from "@/assets/PlusIcon.vue";
import { useAccountStore } from "@/store/accounts";

const accountStore = useAccountStore();

const addAccount = () => accountStore.addAccount();
</script>

<template>
  <section class="app-container">
    <a class="nav-a" href="https://github.com/se-designs">
      <GithubIcon />
      <span>SE-Designs</span>
    </a>

    <div class="header">
      <h2>Учетные записи</h2>

      <Button class="add-button" @click="addAccount">
        <PlusIcon />
      </Button>
    </div>

    <div class="hint">
      <HintIcon />
      Для указания нескольких меток для одной пары логин/пароль используйте
      разделитель `;`
    </div>

    <div class="table-header">
      <small>Метки</small>
      <small>Тип записи</small>
      <small>Логин</small>
      <small>Пароль</small>
      <small></small>
    </div>

    <AccountForm />
  </section>
</template>

<style scoped>
.app-container {
  max-width: 1080px;
  margin: 0 auto;
  padding: 20px;
}

.nav-a {
  display: flex;
  column-gap: 4px;
  margin-bottom: 8px;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;

  margin-bottom: 24px;
}

.hint {
  color: black;
  background: #f4f4f4;
  padding: 10px;
  border-radius: 5px;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.table-header {
  display: grid;
  grid-template-columns: 2fr 2fr 2fr 2fr 40px;
  gap: 10px;
  font-weight: bold;
  margin-top: 10px;
}

.table-header small {
  opacity: 0.6;
}
</style>
