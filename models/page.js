module.exports = Page;

function Page() {
	this._page = {
		css: ['/css/app.css'],
		modernizr: '/vendor/modernizr/modernizr.js',
		requirejs: {
			path: '/vendor/requirejs/require.js',
			main: '/js/main'
		},
		handlebars: '/vendor/handlebars/handlebars.min.js',
		preCompiledTemplates: '/js/templates.js',
		nope: 'Use Chrome :)',
	  tokens: {
	  	pageHeader: 'Dashboard',
	  	pageMessage: 'This is a mini dashboard demo, using the Moz Url Metrics API',
	  	placeholder: 'Enter url here ie: moz.com',
	  	search: 'Search',
	  	included: 'Included Cols',
	  	excluded: 'Excluded Cols',
	  	results: 'Results'
	  },
	  resources: {
	  	mozLogo: '/images/moz_logo.png'
	  },
	  data: {
	  	includedCols: JSON.stringify([
		  	{ key: 'title', token: 'Title' },
		  	{ key: 'canonicalUrl', token: 'Canonical URL' },
		  	{ key: 'externalEquityLinks', token: 'External Equity Links' },
		  	{ key: 'links', token: 'Links' },
		  	{ key: 'mozRankUrl', token: 'MozRank: URL' },
		  	{ key: 'mozRankSubdomain', token: 'MozRank: Subdomain' },
		  	{ key: 'pageAuthority', token: 'Page Authority' },
		  	{ key: 'domainAuthority', token: 'Domain Authority' }
		  ]),
		  excludedCols: JSON.stringify([
		  	{ key: 'timeLastCrawled', token: 'Time last crawled'}
		  ])
		}
	};
}

Page.prototype.get = function () {
	return { page: this._page };
};