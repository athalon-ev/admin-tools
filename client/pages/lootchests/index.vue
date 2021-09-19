<template>
	<div class="p-4 bg-gray-100 h-full w-full flex justify-center overflow-hidden">
		<div class="xl:w-1/2 w-full shadow bg-white p-4">
			<h2 class="mb-4 text-xl">Lootchests</h2>
			<div class="xl:w-1/2 w-full">
				<label class="ml-4 font-bold flex items-center">
					Suche nach Lootchests
					<div class="flex items-center bg-white shadow rounded overflow-hidden ml-2">
						<font-awesome-icon icon="search" class="ml-2" />
						<input type="text" class="ml-2 focus:outline-none focus:bg-blue-100 leading-8 px-2" v-model="search">
					</div>
				</label>
				<div class="flex flex-wrap">
					<div v-for="lootchest in sortedLootchests" :key="lootchest.id" class="p-4 w-full sm:w-1/2 md:w-1/3 lg:w-1/5 xl:w-1/3">
						<nuxt-link :to="`/lootchests/${lootchest.id}`" class="block shadow rounded p-4 w-full h-full cursor-pointer bg-blue-800 text-white hover:bg-blue-600 transition">
							{{ lootchest.id }}<br>
							<div class="text-xs text-gray-400 font-sm">
								<b>Welt:</b> {{ lootchest.position.world }}<br>
								<div>
									<b>x:</b> {{ lootchest.position.x }}
									<b>y:</b> {{ lootchest.position.y }}
									<b>z:</b> {{ lootchest.position.z }}
								</div>
							</div>
						</nuxt-link>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
	data: () => ({
		search: '',
		lootchests: [] as { id: string }[],
	}),
	computed: {
		sortedLootchests() {
			return this.lootchests
				.sort((a, b) => a.id.localeCompare(b.id))
				.filter(lootchest => lootchest.id.toLowerCase().includes(this.search.toLowerCase()))
		}
	},
	async created() {
		this.lootchests = (await this.$axios.get('https://admin.athalon.de/api/lootchests')).data
	}
})
</script>

<style>

</style>
