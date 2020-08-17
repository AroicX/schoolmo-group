<script>
  import { url } from '@roxi/routify'
</script>

<style>
  .huge {
    font-size: 5rem;
    position: relative;
    top: 160px;
    left: auto;
    color: #1b84e7;
  }
  .big {
    font-size: 18px;
    /* font-weight: bold; */
  }
  .e404 {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
  }
</style>

<div class="e404">
  <div class="huge">404</div>
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <img
    class="img-responsive"
    src="/img/404.png"
    alt="no_data_found"
    style="height: 40vh;" />

  <div class="big my-5">
    Data not found.
    <!-- link to the parent folder of _fallback.svelte -->
    <br />
    <a href={$url('/app')} style="color: #1a74df">Go back</a>
  </div>
</div>
