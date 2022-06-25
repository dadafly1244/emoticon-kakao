module.exports = {
	css : {
			loaderOptions : {
					sass : {
							additionalData: `
								@import "~/scss/reset.scss";
							`
					}
			}
	}
}