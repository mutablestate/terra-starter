<script lang="ts">
  import * as query from "../contract/query";
  import { shortenAddress } from "../utils/shortenAddress";
  import { connectedWallet } from "../stores";

  let loading = false;
  let highScores = [];

  async function fetchScores() {
    if ($connectedWallet && $connectedWallet?.network?.name === "testnet") {
      return (await query.getScores($connectedWallet)).scores;
    }
  }

  loading = true;
  $: fetchScores().then((scores) => {
    console.log("scores", scores);
    highScores = scores;
    loading = false;
  });
</script>

<div class="score-board-container">
  <h3>Scoreboard</h3>
  {#if loading}
    <div>Loading...</div>
  {:else if highScores?.length > 0}
    {#each highScores as score}
      <div class="score">
        <span>
          {shortenAddress(score[0])}{" "}
          {score[1].toString().padStart(2, "0")}
        </span>
      </div>
    {/each}
  {:else}
    <div>No scores available :(</div>
  {/if}
</div>
