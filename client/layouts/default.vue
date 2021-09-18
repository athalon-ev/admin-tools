<template>
	<div class="flex flex-col h-full">
		<header class="bg-blue-800 text-white">
			<nuxt-link to="/" class="text-xl flex items-center">
				<img class="h-12 mx-4" src="https://athalon.net/wp-content/uploads/2020/02/Athalon_Schriftzug2020_HoheAufl%C3%B6sung.png" alt="logo">
				Admin Tools
			</nuxt-link>
		</header>
		<main class="flex-grow">
			<Nuxt />
		</main>
	</div>
</template>

<script>
export default {

}
</script>

<style>
#__layout, #__nuxt, html, body {
	height: 100%;
}
</style>
