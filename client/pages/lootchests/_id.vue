<template>
	<div class="p-4 bg-gray-100 h-full w-full flex justify-center overflow-hidden">
		<div class="xl:w-1/2 w-full shadow bg-white p-4">
			<h2 class="mb-4 text-xl flex items-center">
				Lootchest {{ $route.params.id }}
				<button class="bg-blue-600 text-white px-4 py-2 rounded-full shadow ml-4" @click="save">Speichern</button>
			</h2>
			<div class="xl:w-1/2 w-full">
				<VueJsonEditor v-model="lootchest" :expandedOnStart="true" />
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue'
// @ts-ignore
import VueJsonEditor from 'vue-json-editor'

export default Vue.extend({
	components: {
		VueJsonEditor,
	},
	data: () => ({
		lootchest: {},
	}),
	async created() {
		this.lootchest = (await this.$axios.get(`https://admin.athalon.de/api/lootchests/${this.$route.params.id}`)).data
	},
	methods: {
		async save() {
			await this.$axios.put(`https://admin.athalon.de/api/lootchests/${this.$route.params.id}`, this.lootchest)
		}
	}
})
</script>

<style>

</style>
