var app = angular.module("myApp", [])

app.service('anchorSmoothScroll', function(){

    this.scrollTo = function(eID) {

        // This scrolling function
        // is from http://www.itnewb.com/tutorial/Creating-the-Smooth-Scroll-Effect-with-JavaScript

        var startY = currentYPosition();
        var stopY = elmYPosition(eID);
        var distance = stopY > startY ? stopY - startY : startY - stopY;
        if (distance < 100) {
            scrollTo(0, stopY); return;
        }
        var speed = Math.round(distance / 100);
        if (speed >= 20) speed = 20;
        var step = Math.round(distance / 25);
        var leapY = stopY > startY ? startY + step : startY - step;
        var timer = 0;
        if (stopY > startY) {
            for ( var i=startY; i<stopY; i+=step ) {
                setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
                leapY += step; if (leapY > stopY) leapY = stopY; timer++;
            } return;
        }
        for ( var i=startY; i>stopY; i-=step ) {
            setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
            leapY -= step; if (leapY < stopY) leapY = stopY; timer++;
        }

        function currentYPosition() {
            // Firefox, Chrome, Opera, Safari
            if (self.pageYOffset) return self.pageYOffset;
            // Internet Explorer 6 - standards mode
            if (document.documentElement && document.documentElement.scrollTop)
                return document.documentElement.scrollTop;
            // Internet Explorer 6, 7 and 8
            if (document.body.scrollTop) return document.body.scrollTop;
            return 0;
        }

        function elmYPosition(eID) {
            var elm = document.getElementById(eID);
            var y = elm.offsetTop;
            var node = elm;
            while (node.offsetParent && node.offsetParent != document.body) {
                node = node.offsetParent;
                y += node.offsetTop;
            } return y;
        }

    };

})

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

app.controller('myCtrl', function($scope, $location, anchorSmoothScroll,$http,$sce) {

  $scope.gotoElement = function (eID){
    $location.hash('bottom');
    anchorSmoothScroll.scrollTo(eID);
  };

angular.element(document).ready(function() {
  var $form = $('#mc-embedded-subscribe-form')
  if ($form.length > 0) {
    $('form input[type="submit"]').bind('click', function(event) {
      if (event) event.preventDefault()
      register($form)
    })
  }

  var $mobileform = $('#mobile-mc-embedded-subscribe-form')
  if ($mobileform.length > 0) {
    $('form input[type="submit"]').bind('click', function(event) {
      if (event) event.preventDefault()
      mobileRegister($mobileform)
    })
  }

});

});



function register($form) {
  $('#mc-embedded-subscribe').val('Sending...');
  $.ajax({
    type: $form.attr('method'),
    url: $form.attr('action'),
    data: $form.serialize(),
    cache: false,
    dataType: 'json',
    contentType: 'application/json; charset=utf-8',
    error: function (err) { alert('Could not connect to the registration server. Please try again later.') },
    success: function (data) {
      $('#mc-embedded-subscribe').val('WHITE PAPER')
      if (data.result === 'success') {
        // Yeahhhh Success
        console.log(data.msg)
        $('#mce-EMAIL').css('borderColor', '#ffffff')
        $('#subscribe-result').css('color', 'rgb(53, 114, 210)')
        $('#subscribe-result').html('<p>Thank you for subscribing. We have sent you a confirmation email.</p>')
        $('#mce-EMAIL').val('');
        window.open('BitClaims_WhitePaper_2.FINAL.pdf', 'name');
      } else {
        // Something went wrong, do something to notify the user.
        console.log(data.msg)
        $('#mce-EMAIL').css('borderColor', '#ff8282')
        $('#subscribe-result').css('color', '#ff8282')
        $('#subscribe-result').html('<p>' + data.msg.substring(0) + '</p>')
        window.open('BitClaims_WhitePaper_2.FINAL.pdf', 'name');
      }
    }
  })
};

function mobileRegister($mobileform) {
  $('#mobile-mc-embedded-subscribe').val('Sending...');
  $.ajax({
    type: $mobileform.attr('method'),
    url: $mobileform.attr('action'),
    data: $mobileform.serialize(),
    cache: false,
    dataType: 'json',
    contentType: 'application/json; charset=utf-8',
    error: function (err) { alert('Could not connect to the registration server. Please try again later.') },
    success: function (data) {
      $('#mobile-mc-embedded-subscribe').val('WHITE PAPER')
      if (data.result === 'success') {
        // Yeahhhh Success
        console.log(data.msg)
        $('#mce-EMAIL').css('borderColor', '#ffffff')
        $('#subscribe-result').css('color', 'rgb(53, 114, 210)')
        $('#subscribe-result').html('<p>Thank you for subscribing. We have sent you a confirmation email.</p>')
        $('#mce-EMAIL').val('');
          window.open('BitClaims_WhitePaper_2.FINAL.pdf', 'name');
      } else {
        // Something went wrong, do something to notify the user.
        console.log(data.msg)
        $('#mce-EMAIL').css('borderColor', '#ff8282')
        $('#subscribe-result').css('color', '#ff8282')
        $('#subscribe-result').html('<p>' + data.msg.substring(0) + '</p>')
        // window.open('BitClaims_WhitePaper_2.FINAL.pdf', 'name');
      window.open('BitClaims_WhitePaper_2.FINAL.pdf', 'name');
      }
    }
  })
};
