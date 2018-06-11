var app = angular.module("myApp", [])


.directive('flickitySlide', ['$injector', function($injector){
    return {
        restrict : 'E',
        template : '<div ng-transclude></div>',
        transclude : true,
        link: function($scope, $element, attributes){
        	var lastTypeof = typeof($scope.$last), reInit = function(){
            var holder = $element.parent()[0], flickity = Flickity.data(holder);
           	flickity && flickity.destroy();
           	new Flickity(holder, angular.fromJson(holder.getAttribute('options'))); //data-flickity="..." does not work for me
          };
        	if($scope.$last || (lastTypeof === 'undefined' && !$element[0].nextElementSibling) || (lastTypeof !== 'undefined' && Flickity.data($element.parent()[0]))){
          	reInit();
          }
        }
    };
}])

.run(['$rootScope', '$interval', function($rootScope, $interval){
	$rootScope.values = [1,2,3,4,5];
  $rootScope.append = function(){$rootScope.values.push(Math.random());};
  $rootScope.preappend = function(){$rootScope.values.unshift(Math.random());};
  $rootScope.src = 'https://upload.wikimedia.org/wikipedia/commons/3/30/Nuvola_filesystems_services.svg';
}]);

app.controller('myCtrl', function($scope) {


});
