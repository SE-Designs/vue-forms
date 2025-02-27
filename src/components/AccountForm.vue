<script setup lang="ts">
import AccountFormItem from "./AccountFormItem.vue";
import { useAccountStore } from "@/store/accounts";
import Button from "primevue/button";

const accountStore = useAccountStore();
const removeAccount = (id: string) => accountStore.removeAccount(id);
const updateAccount = (account) => accountStore.updateAccount(account);
</script>

<template>
  <div class="account-list">
    <div v-if="accountStore.accounts.length === 0" class="empty-text">
      Нет учетных записей
    </div>

    <div v-for="account in accountStore.accounts" :key="account.id">
      <AccountFormItem
        :account="account"
        @remove="removeAccount"
        @update="updateAccount"
      />
    </div>
  </div>
</template>

<style scoped>
.account-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.add-button {
  align-self: flex-start;
}

.empty-text {
  margin-top: 4px;
  text-align: center;
  font-size: 14px;
  color: gray;
}
</style>
