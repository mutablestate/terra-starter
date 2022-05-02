<script lang="ts">
  import { WalletStatus } from "@terra-money/wallet-controller";
  import Menu from "../lib/Menu.svelte";
  import { connectedWallet } from "../stores";

  export let controller;

  let states;
  let availableConnectTypes;

  controller.states().subscribe((value) => {
    states = value;
    console.log("Wallet status is ", states?.status);
  });
  controller.availableConnectTypes().subscribe((value) => {
    availableConnectTypes = value;
    console.log("Available connection types:", availableConnectTypes);
  });
  controller.connectedWallet().subscribe((value) => {
    connectedWallet.set(value);
    console.log("Connected wallet:", $connectedWallet);
  });
</script>

{#if states?.status === WalletStatus.WALLET_NOT_CONNECTED}
  <div class="connect-wallet-div">
    <div style="margin-bottom: 16px;">
      <img
        src="https://media.giphy.com/media/L0snCScL0LMBor5sE0/giphy.gif"
        alt="Bugs gif"
      />
    </div>
    <button
      type="button"
      on:click={() => controller.connect("EXTENSION")}
      class="cta-button connect-wallet-button"
    >
      Connect wallet
    </button>
  </div>
{:else if states?.status === WalletStatus.WALLET_CONNECTED}
  <div class="game-menu-container">
    <Menu />
  </div>
  <button
    type="button"
    on:click={() => controller.disconnect()}
    class="cta-button connect-wallet-button"
  >
    Disconnect
  </button>
{/if}
