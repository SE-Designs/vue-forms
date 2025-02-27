<script setup lang="ts">
import { ref, watch } from "vue";
import InputText from "primevue/inputtext";
import Select from "primevue/select";
import Button from "primevue/button";
import DeleteIcon from "@/assets/DeleteIcon.vue";
import accountTypes from "../const";
import type { Account } from "@/store/accounts";

const props = defineProps<{ account: Account }>();
const emit = defineEmits(["update", "remove"]);

const tagText = ref(props.account.tags.map((t) => t.text).join("; "));

const updateTags = () => {
  props.account.tags = tagText.value
    .split(";")
    .map((text) => text.trim())
    .filter((text) => text.length > 0)
    .map((text) => ({ text }));

  emit("update", props.account);
};

const validate = () => {
  props.account.valid =
    !!props.account.login &&
    (props.account.type === "LDAP" || !!props.account.password);
  emit("update", props.account);
};

watch(
  () => props.account.type,
  (newType) => {
    if (newType === "LDAP") props.account.password = null;
    emit("update", props.account);
  }
);
</script>

<template>
  <div class="account-item">
    <InputText
      v-model="tagText"
      @blur="updateTags"
      placeholder="Метки (разделяйте ;)"
    />
    <Select v-model="account.type" :options="accountTypes" />
    <InputText
      v-model="account.login"
      @blur="validate"
      placeholder="Логин"
      :class="{ error: !account.valid && !account.login }"
    />
    <InputText
      v-if="account.type === 'Локальная'"
      v-model="account.password"
      @blur="validate"
      type="password"
      placeholder="Пароль"
      :class="{ error: !account.valid && !account.password }"
    />
    <InputText v-else disabled type="password" placeholder="N/A for LDAP" />
    <Button
      class="p-button-text p-button-danger"
      style="max-width: 40px"
      @click="$emit('remove', account.id)"
    >
      <DeleteIcon />
    </Button>
  </div>
</template>

<style scoped>
.account-item {
  display: grid;
  grid-template-columns: 2fr 2fr 2fr 2fr 40px;
  gap: 10px;
  align-items: center;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.error {
  border: 1px solid #961212;
}
</style>
