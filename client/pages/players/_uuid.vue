<template>
	<div class="p-4 bg-gray-100 h-full w-full flex justify-center overflow-hidden">
		<div class="xl:w-1/2 w-full shadow bg-white p-4" v-if="player">
			<h2 class="mb-4 text-xl">Items</h2>
			<div class="p-4">
				<div v-for="item in player.Inventory.value.value" :key="item.Slot.value" class="p-4 shadow rounded bg-blue-100 my-4">
					<b>Slot:</b> {{ item.Slot.value }}<br>
					<b>Item:</b> {{ item.Count.value }}&times; {{ item.id.value }}<br>
					<div v-if="item.tag">
						<b>Details</b>
						<div v-if="'display' in item.tag.value">
							<div v-if="'Name' in item.tag.value.display.value">
								<b>Name</b>
								<pre class="my-2 bg-white rounded shadow whitespace-pre-wrap break-all">{{ item.tag.value.display.value.Name.value }}</pre>
							</div>
							<div v-if="'Lore' in item.tag.value.display.value">
								<b>Lore</b>
								<pre class="my-2 bg-white rounded shadow whitespace-pre-wrap break-all">{{ item.tag.value.display.value.Lore.value.value }}</pre>
							</div>
						</div>
						<div v-else-if="'pages' in item.tag.value" class="flex flex-wrap">
							<div v-for="(page, index) in item.tag.value.pages.value.value" :key="index" class="p-2 w-1/3">
								<div class="p-4 shadow bg-blue-200 h-full">
									<b>Seite {{ index + 1 }}</b>
									<pre class="whitespace-pre-wrap break-all">{{ page }}</pre>
								</div>
							</div>
						</div>
						<div v-else>
							<pre class="my-2 bg-white rounded shadow whitespace-pre-wrap break-all">{{ item.tag.value }}</pre>
						</div>
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
		player: null as any,
		search: '',
	}),
	async created() {
		this.player = (await this.$axios.get(`https://admin.athalon.de/api/players/${this.$route.params.uuid}`)).data
	}
})
</script>
