app.config(function ($sceDelegateProvider) {
  $sceDelegateProvider.resourceUrlWhitelist([
      // Allow same origin resource loads.
      'self',
      // Allow loading from our assets domain. **.
      'http://ergast.com/**',

      '//bitclaims.us18.list-manage.com/subscribe/post-json',

      'http://bitclaims.us18.list-manage.com/subscribe/post-json'
    ])
    console.log('test')
	});
