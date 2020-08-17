<script>
  import {
    LOG_USER_IN
  } from '../utilis/actions.js'
  import {
    isEmpty
  } from '../utilis/validation.js'
  import {
    goto
  } from "@roxi/routify"
  import {
    onMount
  } from "svelte";


  let title = 'Login';
  // let email = 'umar@schoolmo.ng';
  let email = '';
  let password = '';
  let error = '';


  onMount(() => {
    const isLoggedIn = JSON.parse(localStorage.getItem("currentUser"));

    if (isLoggedIn) {
      $goto('/app/')
    }



  });

  function login() {
    const payload = {
      email,
      password
    }


    const callback = user => {

      localStorage.currentUser = JSON.stringify({
        user: user.user,

      });
      localStorage.token = JSON.stringify({
        token: user.token,

      });



      if (localStorage.currentUser) {
        console.log('user loggedIn', user);;
      }


    }

    const onError = err => {
      error = err.message

    }

    LOG_USER_IN(email, password, callback, onError);


  }
</script>




<svelte:head>
  <title>Login</title>
  <link src="/css/login.css" />

</svelte:head>


<style>
  .text-danger {
    margin: 20px 40px;
    padding: 10px 20px;
    color: #fff;

  }

  .active {
    background: red;
  }

  main {
    position: relative;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background: #091632;
  }
</style>


<main>

  <section class="dark-bg-color">

    <div class="login-form sch-col-md-12 sch-col-sm-12 sch-md-m-x-0 ">

      <div class="schoolmo-logo">
        <p style="font-weight: bolder !important;"> school<span>mo</span></p>
      </div>
      <div class="wrapper login-form-wrapper">
        <p class="login-form-wrapper-p ">Log in to your account</p>

        <form on:submit|preventDefault={login}>

          <p> <span class={error ? 'text-danger active' : 'text-danger ' }> {error}</span></p>
          <br>
          <div class="bx--form-item ">
            <label for="text-input-3 " class="bx--label ">User name</label>
            <input id="text-input-3 " bind:value={email} type="email " class="bx--text-input "
              placeholder="schoolmo@gmail.com ">

          </div>
          <div class="bx--form-item ">
            <label for="text-input-3 " class="bx--label ">Password</label>
            <input id="text-input-3 " type="password" bind:value={password} class="bx--text-input "
              placeholder="************** ">
          </div>
          <div class="bx--row form-padding ">
            <div class="bx--col-lg-6 bx--col-md-6  bx--col-sm-6  sch-col-md-5n sch-col-sm-12
                   ">
              <input id="bx--checkbox-new " class="bx--checkbox " type="checkbox " value="new " name="checkbox "
                checked>
              <label for="bx--checkbox-new " class="bx--checkbox-label ">Remeber me &nbsp; &nbsp;
                <button aria-expanded="false" aria-labelledby="example-s35pjmk3z-label" data-tooltip-trigger
                  data-tooltip-target="#example-s35pjmk3z" class="bx--tooltip__trigger"
                  aria-controls="example-s35pjmk3z" aria-haspopup="true">
                  <svg focusable="false" preserveAspectRatio="xMidYMid meet" style="will-change: transform;"
                    xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
                    <path
                      d="M8.5 11L8.5 6.5 6.5 6.5 6.5 7.5 7.5 7.5 7.5 11 6 11 6 12 10 12 10 11zM8 3.5c-.4 0-.8.3-.8.8S7.6 5 8 5c.4 0 .8-.3.8-.8S8.4 3.5 8 3.5z">
                    </path>
                    <path
                      d="M8,15c-3.9,0-7-3.1-7-7s3.1-7,7-7s7,3.1,7,7S11.9,15,8,15z M8,2C4.7,2,2,4.7,2,8s2.7,6,6,6s6-2.7,6-6S11.3,2,8,2z">
                    </path>
                  </svg>
                </button></label></div>

            <div class="bx--col-lg-6 sch-col-md-5 bx--col-sm-6  sch-col-sm-12   bx--col-md-6 ">
              <p><a href={null}>Forgot password ?</a></p>
            </div>
          </div>

          <div class="bx--form-item ">
            <button class="bx--btn bx--btn--primary " type="submit ">Continue</button>
          </div>
        </form>
        <hr class="bx--form-item line ">

        <div class="bx--row form-padding ">
          <div class="bx--col-lg-12 ">
            <p>Don't have an account yet ? &nbsp; &nbsp;<a href={null}>Creat an account</a> </p>
          </div>
        </div>

      </div>
    </div>




  </section>


</main>