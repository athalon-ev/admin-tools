<template>
	<div class="p-4 bg-gray-100 h-full w-full flex justify-center overflow-hidden">
		<div class="xl:w-1/2 w-full">
			<label class="ml-4 font-bold flex items-center">
				Suche nach Spieler
				<div class="flex items-center bg-white shadow rounded overflow-hidden ml-2">
					<font-awesome-icon icon="search" class="ml-2" />
					<input type="text" class="ml-2 focus:outline-none focus:bg-blue-100 leading-8 px-2" v-model="search">
				</div>
			</label>
			<div class="flex flex-wrap">
				<div v-for="player in sortedPlayers" :key="player.uuid" class="p-4 w-full sm:w-1/2 md:w-1/3 lg:w-1/5 xl:w-1/3">
					<nuxt-link :to="`/players/${player.uuid}`" class="block shadow rounded p-4 w-full h-full cursor-pointer bg-blue-800 text-white hover:bg-blue-600 transition">
						{{ player.info.name }}<br>
						<small class="text-xs text-gray-400">{{ player.uuid }}</small>
					</nuxt-link>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue'

interface PlayerInfo {
    id: string
    name: string
    properties: {
        name: string
        value: string
    }[]
}

export default Vue.extend({
	data: () => ({
		players: [] as { uuid: string, info: PlayerInfo }[],
		search: '',
	}),
	computed: {
		sortedPlayers() {
			return this.players
				.sort((a, b) => a.info.name.localeCompare(b.info.name))
				.filter(player => player.info.name.toLowerCase().includes(this.search.toLowerCase()))
		}
	},
	async created() {
		this.players = (await this.$axios.get('https://admin.athalon.de/api/players')).data
	}
})
</script>
