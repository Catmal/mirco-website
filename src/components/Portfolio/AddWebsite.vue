<template>
	<div>
		<q-card style="width: 1000px; max-width: 80vw;" class="bg-dark flex flex-column q-pa-md">
			<q-card-section class="full-width">
				<div>
					<q-toolbar>
						<q-toolbar-title>
							<h3 class="text-info text-weight-thin">Websites</h3>
						</q-toolbar-title>
						<q-space />
						<q-btn
							v-if="hide"
							class="q-mr-sm q-mb-md"
							size="xl"
							color="secondary"
							icon="add"
							@click="add_portfolio_item = true"
						></q-btn>
					</q-toolbar>
					<div class="row q-col-gutter-sm">
						<div
							class="col-lg-4 col-md-6 col-sm-6 col-xs-12 q-pa-md"
							v-for="portfolio_item in portfolio_items"
							:key="portfolio_item.id"
						>
							<router-link
								:to="{
									name: 'PortfolioItem',
									params: {
										portfolioItemId: portfolio_item.id
									}
								}"
							>
								<div class="text-weight-normal text-info text-bold q-mb-sm">{{ portfolio_item.name }}</div>
								<q-img class="rounded-borders shadow-1" width="100%" :src="portfolio_item.image_url" />
							</router-link>
						</div>
					</div>
				</div>
			</q-card-section>
		</q-card>
	</div>
</template>
