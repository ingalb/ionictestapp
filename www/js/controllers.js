angular.module('vllaznia.controllers', [])

.controller('AppCtrl', function($scope) {
})

    .filter('html',function($sce){
     return function(input){
        return $sce.trustAsHtml(input);
      }
    })

   .filter('indexData', function($filter){
     return function(input)
     {
       if(input == null){ return ""; } 
       var value = input.split("+");
       var _date = $filter('date')(new Date(value[0]),'dd/MM/yyyy - HH:mm');
       return _date;
     };
    })

    .controller('IndexCtrl', function($scope, $ionicSlideBoxDelegate, $state, $ionicLoading, LajmeService, NdeshjetService) {
        var tani = new Date();
        $scope.go = function ( path ) {
          //alert(path);
          $state.go('app.ndeshja', {ndeshjaId: path} );
        };
        $scope.loadingIndicator = $ionicLoading.show({
	    content: 'Loading Data',
	    animation: 'fade-in',
	    showBackdrop: true,
	    maxWidth: 200,
	    showDelay: 100
	});

   pushNotification.onDeviceReady();

   pushNotification.registerDevice({ projectid: "455582282730", appid : "1539D-59149" },
        function(status) {
            //this is push token
            var pushToken = status;
            console.warn('push token: ' + pushToken);
            alert('Ok push token: ' + pushToken);
        },
        function(status) {
            alert('Error : ' + status);
            console.warn(JSON.stringify(['failed to register ', status]));
        }
    );


 //this function gets called when push notifications has been received
    document.addEventListener('push-notification', function(event) {
        var title = event.notification.title;
            var userData = event.notification.userdata;
                                 
            if(typeof(userData) != "undefined") {
            console.warn('user data: ' + JSON.stringify(userData));
        }
                                     
        //alert(title);
    });
        


        LajmeService.getSlider(function(data) {
            $scope.slider = data;
            $ionicLoading.hide();
            $ionicSlideBoxDelegate.update();
            
        });
        NdeshjetService.getSuperligaLastNdeshje(function(data) {
            //alert(tani);
            $scope.items = data;
            $ionicLoading.hide();
        });

       $scope.customArrayFilter = function (item) {
         //console.log(tani);
         d2 = new Date(tani.getTime()- 800000000);
        // d3 = new Date(tani.getTime() + 800000000);
       
         //console.log(d2);
         d1 = new Date(item.data); 
         //$scope.data = d1;
         return ( d1>d2);
       };

       
    })

    .controller('LajmeCtrl', function($scope, $sce, $ionicLoading, LajmeService) {
        $scope.loadingIndicator = $ionicLoading.show({
	    content: 'Loading Data',
	    animation: 'fade-in',
	    showBackdrop: true,
	    maxWidth: 200,
	    showDelay: 100
	});
        LajmeService.getAll(function(data) {
            $scope.lajme = data;
            $ionicLoading.hide();
        });
        $scope.doRefresh = function() {
          LajmeService.getAll(function(data) {
            $scope.lajme = data;
            $ionicLoading.hide();
            $scope.$broadcast('scroll.refreshComplete');
        });
       }
    })

    .controller('LajmeDetCtrl', function($scope, $sce, $stateParams, $ionicLoading, LajmeService) {
        
        $scope.shareL = function(message, subject, image, link){
          window.plugins.socialsharing.share(message, subject, image, link, this.onSuccess, this.onError);
        }
        $scope.loadingIndicator = $ionicLoading.show({
	    content: 'Loading Data',
	    animation: 'fade-in',
	    showBackdrop: true,
	    maxWidth: 200,
	    showDelay: 100
	});
        $scope.lajmi = LajmeService.getId($stateParams.lajmiId);
        $ionicLoading.hide();
    })

    .controller('NdeshjetCtrl', function($scope, $sce, $ionicLoading, NdeshjetService) {
        $scope.loadingIndicator = $ionicLoading.show({
	    content: 'Loading Data',
	    animation: 'fade-in',
	    showBackdrop: true,
	    maxWidth: 200,
	    showDelay: 500
	});
        NdeshjetService.getSuperligaVllaznia(function(data) {
            $scope.items = data;
            $ionicLoading.hide();
        });
    })

     .controller('NdeshjetDetCtrl', function($scope, $sce, $stateParams, $timeout, $ionicScrollDelegate, $ionicSlideBoxDelegate, $ionicLoading, NdeshjaService) {
       var tani = new Date();
       var time = 1;
       var d1, minuti, percenti;
       //$scope.minuta = "minuta";
       $scope.loadingIndicator = $ionicLoading.show({
	    content: 'Loading Data',
	    animation: 'fade-in',
	    showBackdrop: true,
	    maxWidth: 200,
	    showDelay: 100
	});
       $scope.percent = Math.floor(time/90*100);
       $scope.percenti=time;
       $scope.options = {
            animate:{
                duration:1000,
                enabled:true
            },
            barColor:'#cc3333',
            scaleColor:'#ddd',
            lineWidth:8,
            lineCap:'circle',
            size:'60'
        };
       (function update() {
        $timeout(update, 59000);
        NdeshjaService.getReport($stateParams.ndeshjaId, function(data) {
            tani = new Date();
            $scope.item = data;
            $scope.content = data.kronika;
            //d1 = new Date('2014 05 13 21:00:00'); 
            d1 = new Date(data.data); 
            time = (tani-d1)/(1000*60);
            if(time<0){minuti=" ";percenti="0"; $scope.minuta = minuti;}
            else if(time>0 && time<46){mininuti=time; percenti=time; $scope.minuta = Math.floor(minuti);}
            else if(time>47 && time<60){minuti="HT"; percenti="45"; $scope.minuta = minuti;}
            else if(time>60 && time<107){minuti=(time-15); percenti=(time-15); $scope.minuta = Math.floor(minuti);}
            else {minuti="FT"; percenti="90"; $scope.minuta = minuti;}
            $scope.percent = Math.floor(percenti/90*100);         
            $scope.data = d1;
            //console.log(time+' '+percenti+' '+$scope.minuta);
            $ionicSlideBoxDelegate.update();
            $ionicLoading.hide();
        });
       }());
       $scope.slideTo = function(index) {
          $ionicSlideBoxDelegate.slide(index);
          $ionicSlideBoxDelegate.update();
          $ionicScrollDelegate.scrollTop();
       }
       $scope.doRefresh = function() {
         $scope.loadingIndicator = $ionicLoading.show({
	    content: 'Loading Data',
	    animation: 'fade-in',
	    showBackdrop: true,
	    maxWidth: 200,
	    showDelay: 100
	});
         NdeshjaService.getReport($stateParams.ndeshjaId, function(data) {
            tani = new Date();
            $scope.item = data;
            $scope.content = data.kronika;
            d1 = new Date(data.data); 
            time = (tani-d1)/(1000*60);
            if(time<0){minuti=" ";percenti="0"; $scope.minuta = minuti;}
            else if(time>0 && time<46){minuti=time; percenti=time; $scope.minuta = Math.floor(minuti/90*100);}
            else if(time>48 && time<60){minuti="HT"; percenti="45"; $scope.minuta = minuti;}
            else if(time>60 && time<107){minuti=(time-15); percenti=(time-15); $scope.minuta = Math.floor(percenti/90*100);}
            else {minuti="FT"; percenti="90"; $scope.minuta = minuti;}
            $scope.percent = Math.floor(percenti/90*100);         
            $scope.data = d1;
            $scope.$broadcast('scroll.refreshComplete');
            $ionicScrollDelegate.scrollTop();
            $ionicSlideBoxDelegate.update();
            $ionicLoading.hide();
        });
       }
    })


    .controller('KlasifikimiCtrl', function($scope, $stateParams, $ionicLoading, KlasifikimiService, $ionicModal) {
     $scope.SezoneList = [
       { text: "Superliga 2014-15", value: 100 },
       { text: "Superliga 2013-14", value: 97 },
       { text: "Superliga 2012-13", value: 86 },
       { text: "Kategoria Pare 2014-15", value: 101 },
       { text: "Kategoria Pare 2013-14", value: 98 }
      ];
       
       $scope.loadingIndicator = $ionicLoading.show({
	    content: 'Loading Data',
	    animation: 'fade-in',
	    showBackdrop: true,
	    maxWidth: 200,
	    showDelay: 500
	});
       $scope.sezoni = "2014-15";
       $scope.sezoni_id = 100;
        KlasifikimiService.getAllKlasifikimi($scope.sezoni_id,function(data) {
            $scope.items = data;
            $ionicLoading.hide();
        });
/**
    $ionicModal.fromTemplateUrl('popup-template.html', {
       scope: $scope,
       animation: 'slide-in-up'
       }).then(function(modal) {
       $scope.modal = modal
    })

    $scope.openModal = function() {
      $scope.modal.show()
    }

    $scope.closeModal = function() {    
      $scope.modal.hide();
      KlasifikimiService.getAllKlasifikimi($scope.sezoni_id,function(data) {
            $scope.items = data;
        });
    };

    $scope.$on('$destroy', function() {
      $scope.modal.remove();
    });
**/

    })

    .controller('KlasifikimiDetCtrl', function($scope, $stateParams, KlasifikimiService) {
        $scope.item = KlasifikimiService.get($stateParams.klasifikimiId);
    })

    .controller('LojtaretCtrl', function($scope, $stateParams, $ionicLoading, EkipiService) {
        $scope.sezoni_id =100;
        $scope.ekipiId =13;
        $scope.loadingIndicator = $ionicLoading.show({
	    content: 'Loading Data',
	    animation: 'fade-in',
	    showBackdrop: true,
	    maxWidth: 200,
	    showDelay: 500
	});
        EkipiService.getAllEkipi($scope.sezoni_id,$scope.ekipiId, function(data) {
            $scope.items = data;
            $ionicLoading.hide();
        });
    })

    .controller('LojtaretDetCtrl', function($scope, $stateParams, $ionicLoading, EkipiService) {
        //alert($stateParams.lojtariId);
        //$scope.playerID = 1;
       //$scope.item.pid = 1;
        //console.log($stateParams.lojtariId);
        $scope.loadingIndicator = $ionicLoading.show({
	    content: 'Loading Data',
	    animation: 'fade-in',
	    showBackdrop: true,
	    maxWidth: 200,
	    showDelay: 50
	});
        $scope.item = EkipiService.get($stateParams.lojtariId);
        $ionicLoading.hide();
        //console.log($scope.item.pid);
        $scope.lojtariN = function(numri){
           numri = $scope.item.pid +1;
           if(numri>25){numri=1;
            $scope.item.pid=1;}
           $scope.item = EkipiService.get(numri);
           $ionicLoading.hide();
           //console.log($scope.item.pid);
           //numri = $scope.item.pid;
          // $scope.playerID = index+1;
         }
         $scope.lojtariP = function(numri){
           numri = $scope.item.pid - 1;
           if(numri<1){numri=25;
           $scope.item.pid=25;}
           $scope.item = EkipiService.get(numri);
           $ionicLoading.hide();
          // console.log($scope.item.pid);
           //numri = $scope.item.pid;
          // $scope.playerID = index+1;
         }
    })


  .controller('KlubiCtrl', function($scope, $ionicLoading, $ionicSlideBoxDelegate, $ionicScrollDelegate) {
        $scope.title="Klubi";
        $scope.slideTo = function(index) {
          if(index){$scope.title="Trofetë";}
          else{$scope.title="Historia";}
          $ionicSlideBoxDelegate.slide(index);
          $ionicSlideBoxDelegate.update();
          $ionicScrollDelegate.scrollTop();
       }
    })

   .controller('ForumiCtrl', function($scope, $ionicLoading, ForumiService) {
        $scope.loadingIndicator = $ionicLoading.show({
	    content: 'Loading Data',
	    animation: 'fade-in',
	    showBackdrop: true,
	    maxWidth: 200,
	    showDelay: 10
	});
        ForumiService.getAllPostimet(function(data) {
            $scope.posts = data;
            $ionicLoading.hide();
        });
    });


