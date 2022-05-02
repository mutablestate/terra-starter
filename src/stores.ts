import { writable, derived } from "svelte/store";

export const connectedWallet = writable();

export const terraAddress = derived(
  connectedWallet,
  ($connectedWallet) => $connectedWallet?.terraAddress
);
