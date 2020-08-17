<svelte:head>
	<title>Schools Dashboard</title>
	<script src="/js/handsontable.full.min.js"></script>
	<link href="/css/handsontable.full.min.css" rel="stylesheet" media="screen">
</svelte:head>
<script>
	import {
		onMount
	} from "svelte";
	import {
		STORAGE_TOKEN,
		SET_TERM,
		SET_ZONE
	} from "../../store.js";
	import {
		GET_SCHOOLS_DASHBOARD
	} from "../../utilis/actions.js"
	import {
		goto,
		params,
		url
	} from "@sveltech/routify"



	import numeral from 'numeral';

	let schools = [];
	let current = [];
	let token = null;
	let isLoading = true;
	let miniLoader = false;
	let error = null;
	let terms = [];
	let zones = [];
	let zone = [];
	export let slug;
	$: slug = $params;



	onMount(() => {
		dashboard();
		return false;
	})

	STORAGE_TOKEN.subscribe(value => token = value);
	SET_TERM.subscribe(value => terms = value);
	SET_ZONE.subscribe(value => zones = value);



	function dashboard() {

		let getTerm = JSON.parse(localStorage.getItem('selectedTerm'));
		let getZone = JSON.parse(localStorage.getItem('selectedZone'));
		zone = getZone.zone.name;



		const callback = res => {


			schools = res;
			schools
				.push({}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {})


			var example = document.createElement('div');
			example.setAttribute('id', 'example')
			document.getElementById('table-container').append(example)
			var container = document.getElementById('example');

			var hot = new Handsontable(container, {
				data: schools,
				columns: [{
						data: 'school_id',
						type: 'text',

						width: 120
					},
					{
						data: 'schoolname',
						type: 'text',
						renderer: 'html',
						width: 250
					},
					{
						data: 'zone',
						type: 'text',
						width: 100
					},
					{
						data: 'total_fees',
						type: 'numeric',
						numericFormat: {
							pattern: '₦0,00',
							culture: 'ng-NGN'
						},
						width: 100
					},
					{
						data: 'total_paid',
						type: 'numeric',
						numericFormat: {
							pattern: '₦0,00',
							culture: 'ng-NGN'
						},
						width: 100
					},
					{
						data: 'total_owing',
						type: 'numeric',
						numericFormat: {
							pattern: '₦0,00',
							culture: 'ng-NGN'
						},
						width: 100
					},
					{
						data: 'fully_paid_sum',
						type: 'numeric',
						numericFormat: {
							pattern: '₦0,00',
							culture: 'ng-NGN'
						},
						width: 150
					},
					{
						data: 'fully_paid_count',
						type: 'numeric',
						numericFormat: {
							pattern: '₦0,00',
							culture: 'ng-NGN'
						},
						width: 150
					},
					{
						data: 'partly_paid_sum',
						type: 'numeric',
						numericFormat: {
							pattern: '₦0,00',
							culture: 'ng-NGN'
						},
						width: 150
					},
					{
						data: 'partly_paid_count',
						type: 'numeric',
						numericFormat: {
							pattern: '₦0,00',
							culture: 'ng-NGN'
						},
						width: 150
					},
					{
						data: 'not_paid_sum',
						type: 'numeric',
						numericFormat: {
							pattern: '₦0,00',
							culture: 'ng-NGN'
						},
						width: 150
					},
					{
						data: 'not_paid_count',
						type: 'numeric',
						numericFormat: {
							pattern: '₦0,00',
							culture: 'ng-NGN'
						},
						width: 150
					}

				],
				colHeaders: ['School ID', 'School Name', 'Zone', 'Total Fees', 'Total Paid', 'Total Owing',
					'Fully Paid Sum', 'Fully Paid Count', 'Partly Paid Sum', 'Partly Paid Count',
					'Not Paid Sum', 'Not Paid Count'
				],
				filters: true,
				rowHeaders: true,
				fixedColumnsLeft: 2,
				dropdownMenu: true,
				autoRowSize: {
					syncLimit: 300
				},
			});



			var button1 = document.getElementById('export-file');
			var exportPlugin1 = hot.getPlugin('exportFile');

			button1.addEventListener('click', function () {
				exportPlugin1.downloadFile('csv', {
					bom: false,
					columnDelimiter: ',',
					columnHeaders: true,
					exportHiddenColumns: true,
					exportHiddenRows: true,
					fileExtension: 'csv',
					filename: 'school_dashboard[YYYY]-[MM]-[DD]',
					mimeType: 'text/csv',
					rowDelimiter: '\r\n',
					rowHeaders: true
				});
			});




			isLoading = false;
			error = false;



		}
		const onError = err => {
			console.error(err);

			setTimeout(() => {
				isLoading = false;
				error = 'No data found';

			}, 100)
		}

		GET_SCHOOLS_DASHBOARD(getTerm.term_id, callback, onError);
	}

	$: if (terms) {

		isLoading = true;
		schools = null;
		let getTerm = JSON.parse(localStorage.getItem('selectedTerm'));
		setTimeout(() => {
			if (getTerm.term_id === terms.term_id) {

				var getContainer = document.getElementById('example');
				if (getContainer) {
					console.log('Removing handsonTable');
					getContainer.remove()
				}
				dashboard()
			}
		}, 1000)

	}

	$: if (zones.zone_id != 'undefined') {

		isLoading = true;
		schools = null;
		let getZone = JSON.parse(localStorage.getItem('selectedZone'));
		setTimeout(() => {
			if (getZone.zone.zone_id === zones.zone_id) {

				var getContainer = document.getElementById('example');
				if (getContainer) {
					console.log('Removing handsonTable');
					getContainer.remove()
				}
				dashboard()

			}
		}, 1000)

	}
</script>
<style>
	#example {
		margin: 25px 0px;
	}

	.no-data-found {
		margin: 200px 250px;
	}

	#export-file {
		position: absolute;
		top: 15px;
		right: 10px;
	}

	/* .push{
	position: relative;
	left: 80px;
	} */
</style>
<div class="sch-dash-col-lg-12 sch-col-sm-11 sch-col-md-11 sch-dash-form push"
	style="background-color: rgb(255, 255, 255); height: 70vh; overflow-x:scroll ">
	<div data-tabs class=" sch-basic-info bx--tabs" style="display: none">
		<div class="bx--tabs-trigger" tabindex="0">
			<a href={null} class="bx--tabs-trigger-text" tabindex="-1">
				test
			</a>
			<svg focusable="false" preserveAspectRatio="xMidYMid meet" style="will-change: transform;"
				xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
				<path d="M8 11L3 6 3.7 5.3 8 9.6 12.3 5.3 13 6z" />
			</svg>
		</div>
	</div>
	<div data-tabs class=" sch-basic-info bx--tabs">
		<div class="bx--tabs-trigger" tabindex="0">
			<svg focusable="false" preserveAspectRatio="xMidYMid meet" style="will-change: transform;"
				xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
				<path d="M8 11L3 6 3.7 5.3 8 9.6 12.3 5.3 13 6z"></path>
			</svg>
		</div>
		<ul class="bx--tabs__nav bx--tabs__nav--hidden" role="tablist" style="height: 75px; background-color: #19222F;">
			<li class="bx--tabs__nav-item  " data-target=".tab-1-default" role="tab" aria-selected="true">
				<a class="bx--tabs__nav-link" href={null} role="tab" controls="tab-panel-1-default" style="color: #F4F4F4;">All
					Schools - {zone}</a>
			</li>
			<li class="bx--tabs__nav-item  " data-target=".tab-1-default" role="tab" aria-selected="true">
				<button class="bx--btn btn-primary bx--btn--field" type="button" id="export-file">Download</button>
			</li>
		</ul>
	</div>
	<div class="sch-dash-login-form-wrapper" id="table-container" style="magrin: 0px !important; padding: 0px !important">
		<br>
		{#if isLoading}
<p></p>
		{/if}
	</div>
</div>