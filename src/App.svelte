<script lang="ts">
  import { Route } from "tinro";
  import {
    getChainOptions,
    WalletController,
  } from "@terra-money/wallet-controller";

  import Wallet from "./pages/Wallet.svelte";
  import Play from "./pages/Play.svelte";
  import Leaderboard from "./pages/Leaderboard.svelte";
  import Guide from "./pages/Guide.svelte";

  import { shortenAddress } from "./utils/shortenAddress";
  import { terraAddress } from "./stores";

  let controller: WalletController;

  async function initController() {
    const chainOptions = await getChainOptions();

    controller = new WalletController({
      ...chainOptions,
    });
  }
  initController();
</script>

<main class="App">
  <header>
    <div class="header-titles">
      <h1>🐰 Cotton pickin' varmint! 🐰</h1>
      <p>Southern Fried Rabbit</p>
    </div>
    {#if $terraAddress}
      <div style="margin-top: 16px;">
        <button class="wallet-address">
          {shortenAddress($terraAddress)}
        </button>
      </div>
    {/if}
  </header>

  {#if !controller}
    <div>Initializing...</div>
  {:else}
    <Route path="/*" firstmatch>
      <Route path="/play">
        <Play />
      </Route>
      <Route path="/leaderboard">
        <Leaderboard />
      </Route>
      <Route path="/guide">
        <Guide />
      </Route>
      <Route path="/">
        <Wallet {controller} />
      </Route>
    </Route>
  {/if}
</main>

<style>
  :root {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  }

  main {
    text-align: center;
    padding: 1em;
    margin: 0 auto;
  }
</style>
