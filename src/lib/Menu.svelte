<script lang="ts">
  const menuOptions = [
    { name: "Play", link: "/play" },
    { name: "Leaderboard", link: "/leaderboard" },
    { name: "How to play", link: "/guide" },
  ];
</script>

<div class="game-menu">
  {#each menuOptions as { name, link }}
    <a href={link} class="menu-item">
      <span class="item-text">{name}</span>
    </a>
  {/each}
</div>
