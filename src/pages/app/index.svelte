<script>
	import {
		onMount
	} from 'svelte'
	import {
		DASHBOARD
	} from '../../utilis/actions.js'

	import {
		SET_TERM,
		SET_ZONE,
		STORAGE_TOKEN
	} from '../../store.js'

	import numeral from 'numeral'
	import {
		goto,
		params,
		url
	} from '@roxi/routify'

	let dashboard = null
	let isLoading = true
	let token = null
	let term = []
	let zones = []
	let user = []
	let terms = []

	onMount(() => {
		const userData = JSON.parse(localStorage.getItem('currentUser'))
		user = userData

		STORAGE_TOKEN.subscribe((value) => (token = value))
		SET_TERM.subscribe((value) => (terms = value))
		SET_ZONE.subscribe((value) => (zones = value))
		getDashboard()
	})

	function getDashboard() {
		let getTerm = JSON.parse(localStorage.getItem('selectedTerm'))

		const callback = (res) => {
			if (dashboard === null) {
				dashboard = res[0]
				setTimeout(() => {
					isLoading = false
				}, 100)
			}
		}

		const onError = (err) => {
			console.error(err)
		}

		DASHBOARD(getTerm.term_id, callback, onError)
	}

	$: if (terms) {
		isLoading = true
		dashboard = null
		let getTerm = JSON.parse(localStorage.getItem('selectedTerm'))
		setTimeout(() => {
			if (getTerm.term_id === terms.term_id) {
				getDashboard()
			}
		}, 100)
	}

	$: if (zones.zone_id != 'undefined') {
		isLoading = true
		dashboard = null
		let getZone = JSON.parse(localStorage.getItem('selectedZone'))
		setTimeout(() => {
			if (getZone.zone.zone_id === zones.zone_id) {
				getDashboard()
			}
		}, 100)
	}
</script>

<style>
	.h1 {
		font-size: 1.5rem;
	}

	.sch-txt-bold {
		font-size: 22px !important;
	}

	.card-details {
		/* border: 2px solid red; */
		border-bottom: 1px solid #333;
		/* border-bottom-color: 2px solid red; */
	}
</style>

<svelte:head>
	<title>Dashboard</title>
</svelte:head>
{#if isLoading && dashboard === null}
  <p />
{:else}
  <main>
    <div class="sch-row d-m-top sch-card--spc ">
      <div
        class="sch-col-lg-card sch-col-md-10 sch-col-sm-11 sch-sm-p-y
        card-details">
        <div class="bx--tile ">
          <div class="sch-row sch-m-t-1 ">
            <div class="sch-col-lg-6 sch-col-sm-7 sch-col-md-7 ">
              <p>Total Fees Expected</p>
            </div>
            <div class="sch-col-lg-6 sch-col-sm-5 sch-align-s-e " />
            <div class="sch-col-lg-12 sch-col-sm-12 sch-col-md-12 sch-m-y-2 ">
              <h2 class="sch-txt-bold ">
                ₦ {dashboard.total_fees ? numeral(dashboard.total_fees).format('0,0') : '0.00'}
              </h2>
            </div>
            <div class="sch-col-lg-12 sch-col-sm-12 sch-col-md-12 sch-m-x-2 ">
              <p class="percent">
                <span class="percentage-per-week ">3.6%</span>
                up from past week.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div
        class="sch-col-lg-card sch-col-md-10 sch-col-sm-11 sch-sm-p-y
        card-details">
        <div class="bx--tile ">
          <div class="sch-row sch-m-t-1 ">
            <div class="sch-col-lg-6 sch-col-sm-7 sch-col-md-7 ">
              <p>
                Total
                <br />
                Fees Paid
              </p>
            </div>
            <div class="sch-col-lg-6 sch-col-sm-5 sch-align-s-e" />
            <div class="sch-col-lg-12 sch-col-sm-12 sch-col-md-12 sch-m-y-2 ">
              <h2 class="sch-txt-bold " style="color: green">
                ₦ {dashboard.total_paid ? numeral(dashboard.total_paid).format('0,0') : '0.00'}
              </h2>
            </div>
            <div class="sch-col-lg-12 sch-m-x-2 ">
              <p class="percent">
                <span class="percentage-per-week ">3.6%</span>
                up from past week.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div
        class="sch-col-lg-card sch-col-md-10 sch-col-sm-11 sch-sm-p-y
        card-details">
        <div class="bx--tile ">
          <div class="sch-row sch-m-t-1 ">
            <div class="sch-col-lg-6 sch-col-sm-7 sch-col-md-7 ">
              <p>Total Fees Owing</p>
            </div>
            <div class="sch-col-lg-6 sch-col-sm-5 sch-align-s-e " />
            <div class="sch-col-lg-12 sch-col-sm-12 sch-col-md-12 sch-m-y-2 ">
              <h2 class="sch-txt-bold" style="color: red">
                ₦ {dashboard.total_owing ? numeral(dashboard.total_owing).format('0,0') : '0.00'}
              </h2>
            </div>
            <div class="sch-col-lg-12 sch-m-x-2 ">
              <p class="percent">
                <span class="percentage-per-week ">3.6%</span>
                up from past week.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div
        class="sch-col-lg-card sch-col-md-10 sch-col-sm-11 sch-sm-p-y
        card-details">
        <div class="bx--tile ">
          <div class="sch-row sch-m-t-1 ">
            <div class="sch-col-lg-6 sch-col-sm-7 sch-col-md-7 ">
              <p>
                Total
                <br />
                Fully Paid
              </p>
            </div>
            <div class="sch-col-lg-6 sch-col-sm-5 sch-align-s-e" />
            <div class="sch-col-lg-12 sch-col-sm-12 sch-col-md-12 sch-m-y-2 ">
              <h2 class="sch-txt-bold ">
                ₦ {dashboard.fully_paid_sum ? numeral(dashboard.fully_paid_sum).format('0,0') : '0.00'}
              </h2>
            </div>
            <div class="sch-col-lg-12 sch-m-x-2 ">
              <p class="percent">
                <span class="percentage-per-week ">3.6%</span>
                up from past week.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="sch-row d-m-top sch-card--spc ">
      <div
        class="sch-col-lg-card sch-col-md-10 sch-col-sm-11 sch-sm-p-y
        card-details">
        <div class="bx--tile ">
          <div class="sch-row sch-m-t-1 ">
            <div class="sch-col-lg-6 sch-col-sm-7 sch-col-md-7 ">
              <p>Total Partly Paid</p>
            </div>
            <div class="sch-col-lg-6 sch-col-sm-5 sch-align-s-e " />
            <div class="sch-col-lg-12 sch-col-sm-12 sch-col-md-12 sch-m-y-2 ">
              <h2 class="sch-txt-bold ">
                ₦ {dashboard.partly_paid_sum ? numeral(dashboard.partly_paid_sum).format('0,0') : '0.00'}
              </h2>
            </div>
            <div class="sch-col-lg-12 sch-col-sm-12 sch-col-md-12 sch-m-x-2 ">
              <p class="percent">
                <span class="percentage-per-week ">3.6%</span>
                up from past week.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div
        class="sch-col-lg-card sch-col-md-10 sch-col-sm-11 sch-sm-p-y
        card-details">
        <div class="bx--tile ">
          <div class="sch-row sch-m-t-1 ">
            <div class="sch-col-lg-6 sch-col-sm-7 sch-col-md-7 ">
              <p>
                Total
                <br />
                Not Paid
              </p>
            </div>
            <div class="sch-col-lg-6 sch-col-sm-5 sch-align-s-e " />
            <div class="sch-col-lg-12 sch-col-sm-12 sch-col-md-12 sch-m-y-2 ">
              <h2 class="sch-txt-bold ">
                ₦ {dashboard.not_paid_sum ? numeral(dashboard.not_paid_sum).format('0,0') : '0.00'}
              </h2>
            </div>
            <div class="sch-col-lg-12 sch-col-sm-12 sch-col-md-12 sch-m-x-2 ">
              <p class="percent">
                <span class="percentage-per-week ">3.6%</span>
                up from past week.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div
        class="sch-col-lg-card sch-col-md-10 sch-col-sm-11 sch-sm-p-y
        card-details">
        <div class="bx--tile ">
          <div class="sch-row sch-m-t-1 ">
            <div class="sch-col-lg-6 sch-col-sm-7 sch-col-md-7 ">
              <p>Fully Paid Students</p>
            </div>
            <div class="sch-col-lg-6 sch-col-sm-5 sch-align-s-e" />
            <div class="sch-col-lg-12 sch-col-sm-12 sch-col-md-12 sch-m-y-2 ">
              <h2 class="sch-txt-bold ">
                {dashboard.fully_paid_count ? numeral(dashboard.fully_paid_count).format('0,0') : '0'}
              </h2>
            </div>
            <div class="sch-col-lg-12 sch-m-x-2 ">
              <p class="percent">
                <span class="percentage-per-week ">3.6%</span>
                up from past week.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div
        class="sch-col-lg-card sch-col-md-10 sch-col-sm-11 sch-sm-p-y
        card-details">
        <div class="bx--tile ">
          <div class="sch-row sch-m-t-1 ">
            <div class="sch-col-lg-6 sch-col-sm-7 sch-col-md-7 ">
              <p>Not Paid Students</p>
            </div>
            <div class="sch-col-lg-6 sch-col-sm-5 sch-align-s-e " />
            <div class="sch-col-lg-12 sch-col-sm-12 sch-col-md-12 sch-m-y-2 ">
              <h2 class="sch-txt-bold ">
                {dashboard.not_paid_count ? numeral(dashboard.not_paid_count).format('0,0') : '0'}
              </h2>
            </div>
            <div class="sch-col-lg-12 sch-m-x-2 ">
              <p class="percent">
                <span class="percentage-per-week ">3.6%</span>
                up from past week.
              </p>
            </div>
          </div>
        </div>
      </div>

    </div>
    <div class="sch-row d-m-top sch-card--spc ">
      <div
        class="sch-col-lg-card sch-col-md-10 sch-col-sm-11 sch-sm-p-y
        card-details">
        <div class="bx--tile ">
          <div class="sch-row sch-m-t-1 ">
            <div class="sch-col-lg-6 sch-col-sm-7 sch-col-md-7 ">
              <p>Partly Paid Students</p>
            </div>
            <div class="sch-col-lg-6 sch-col-sm-5 sch-align-s-e" />
            <div class="sch-col-lg-12 sch-col-sm-12 sch-col-md-12 sch-m-y-2 ">
              <h2 class="sch-txt-bold ">
                {dashboard.partly_paid_count ? numeral(dashboard.partly_paid_count).format('0,0') : '0'}
              </h2>
            </div>
            <div class="sch-col-lg-12 sch-m-x-2 ">
              <p class="percent">
                <span class="percentage-per-week ">3.6%</span>
                up from past week.
              </p>
            </div>
          </div>
        </div>
      </div>

    </div>
    <a
      href={$url(`/app/dashboard-payment`)}
      class="bx--btn btn-primary bx--btn--field"
      type="button"
      style="margin: 25px 75px">
      Payment Tabular View
    </a>
  </main>
{/if}