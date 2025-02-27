import { defineStore } from "pinia";

export interface Account {
  id: string;
  tags: { text: string }[];
  type: "LDAP" | "Локальная";
  login: string;
  password: string | null;
  valid: boolean;
}

export const useAccountStore = defineStore("accountStore", {
  state: () => ({
    accounts: JSON.parse(localStorage.getItem("accounts") || "[]") as Account[],
  }),

  actions: {
    addAccount() {
      this.accounts.push({
        id: crypto.randomUUID(),
        tags: [],
        type: "LDAP",
        login: "",
        password: null,
        valid: false,
      });
      this.saveToLocalStorage();
    },
    removeAccount(id: string) {
      this.accounts = this.accounts.filter((acc) => acc.id !== id);
      this.saveToLocalStorage();
    },
    updateAccount(updatedAccount: Account) {
      const index = this.accounts.findIndex(
        (acc) => acc.id === updatedAccount.id
      );
      if (index !== -1) {
        this.accounts[index] = updatedAccount;
        this.saveToLocalStorage();
      }
    },
    saveToLocalStorage() {
      localStorage.setItem("accounts", JSON.stringify(this.accounts));
    },
  },
});
