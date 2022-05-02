<script lang="ts">
  import { onMount } from "svelte";
  import { router } from "tinro";
  import LoadingIndicator from "../lib/LoadingIndicator.svelte";
  import * as execute from "../contract/execute";
  import { connectedWallet } from "../stores";
  import sam from "../assets/yosemite-sam.png";
  import bugs from "../assets/bugs-bunny.png";
  import zerglingExplodes from "../assets/zergling-explodes.mp3";
  import ashamed from "../assets/ashamed.mp3";
  import doin from "../assets/doin.mp3";
  import dyin from "../assets/dyin.mp3";
  import genius from "../assets/genius.mp3";
  import outta from "../assets/outta.mp3";
  import outta2 from "../assets/outta2.mp3";

  const PLAY_TIME = 150;

  $: display = "initial";
  $: top = "15%";
  $: left = "50%";

  let time = PLAY_TIME;
  let loading = false;
  let score = 0;
  let gameOver = false;
  let sounds = [zerglingExplodes, ashamed, doin, dyin, genius, outta, outta2];

  onMount(() => {
    const interval = setInterval(() => {
      time = time > 0 ? time - 1 : 0;
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  });

  $: if (time === 0) {
    display = "none";
    alert(
      `Game Over! Your score is ${score}. Please confirm transaction to submit score.`
    );
    submitScore();
  }

  function getRandomSound() {
    return sounds[Math.floor(Math.random() * sounds.length)];
  }

  function handleClick() {
    score = score + 1;
    let sound = getRandomSound();
    let audio = new Audio(sound);
    audio.volume = 0.2;
    audio.play();
    top = `${Math.floor(Math.random() * 80)}%`;
    left = `${Math.floor(Math.random() * 80)}%`;
  }

  async function submitScore() {
    if ($connectedWallet && $connectedWallet?.network?.name === "testnet") {
      loading = true;
      const tx = await execute.setScore($connectedWallet, score);
      console.log("tx:confirmation", tx);
      alert("Score submitted!");
      loading = false;
      router.goto("/leaderboard");
    }
  }
</script>

<div class="score-board-container">
  <div class="play-container">
    <span>Score: {score}</span>
    <span>Shoot!</span>
    <span>Time left: {time} s</span>
  </div>
  {#if loading}
    <LoadingIndicator />
  {:else}
    <div id="fields" class="game-container">
      <img
        src={bugs}
        id="target"
        alt="Target"
        style="width: 100px; height: 117px;"
        style:top
        style:left
        style:display
        on:click={handleClick}
      />
      <img src={sam} id="sam-img" alt="Yosemite Sam" />
    </div>
  {/if}
</div>

<style>
  #fields {
    background-image: url("https://media.giphy.com/media/ubktuhEHhnb5C/giphy-downsized-large.gif");
    background-size: cover;
    padding: 0;
    margin: 0;
  }
</style>
