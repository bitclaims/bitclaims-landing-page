app.config(function($sceDelegateProvider, $routeProvider) {
  $sceDelegateProvider.resourceUrlWhitelist([
    // Allow same origin resource loads.
    "self",
    // Allow loading from our assets domain. **.
    "http://ergast.com/**",

    "//bitclaims.us18.list-manage.com/subscribe/post-json",

    "http://bitclaims.us18.list-manage.com/subscribe/post-json"
  ]);
  console.log("test");
  $routeProvider
    .when("/", {
      templateUrl: "partials/topLevel/main.html"
    })
    .when("/jobs", {
      templateUrl: "partials/topLevel/jobs.html"
    })
    .when("/jobs/:id", {
      templateUrl: "partials/topLevel/jobDescription.html"
    });
});
