<template>
	<div class="p-4 bg-gray-100 h-full flex justify-center">
		<div class="xl:w-1/2 w-full">
			<div class="flex flex-wrap">
				<div v-for="navItem in navItems" :key="navItem.title" class="p-4 w-full sm:w-1/2 md:w-1/3 lg:w-1/5 xl:w-1/3">
					<nuxt-link :to="navItem.link" class="flex flex-col justify-center items-center shadow rounded p-4 w-full h-full cursor-pointer bg-blue-800 text-white hover:bg-blue-600 transition text-2xl">
						<font-awesome-icon :icon="navItem.icon" class="block mb-2" />
						<div>
							{{ navItem.title }}
						</div>
					</nuxt-link>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
	data: () => ({
		navItems: [
			{ title: 'Player Data', icon: 'users', link: '/players' },
			{ title: 'Dynmap', icon: 'map', link: '/dynmap' },
		]
	}),
})
</script>
