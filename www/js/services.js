angular.module('vllaznia.services', [])

.factory('LoaderService', function($rootScope, $ionicLoading) {
  // Trigger the loading indicator
  return {
        show : function() { //code from the ionic framework doc
            // Show the loading overlay and text
            $rootScope.loading = $ionicLoading.show({
              // The text to display in the loading indicator
              content: 'Loading',
              // The animation to use
              animation: 'fade-in',
              // Will a dark overlay or backdrop cover the entire view
              showBackdrop: true,
              // The maximum width of the loading indicator
              // Text will be wrapped if longer than maxWidth
              maxWidth: 400,
              // The delay in showing the indicator
              showDelay: 500
            });
        },
        hide : function(){
            $rootScope.loading.hide();
        }
    }
})


   .factory('NdeshjetService', function($http) {
        var ndeshjet = [];
        return {
            getSuperligaVllaznia: function(callback) {
                $http.get('http://ingalb.info/as/ndeshjet.php?id=superliga&ekipi=13').success(
                    function(data) {
                        ndeshjet = data;
                        callback(data);
                    }
                );
            },
            getSuperligaLastNdeshje: function(callback) {
                $http.get('http://ingalb.info/as/ndeshjet.php?id=superliga&ekipi=13').success(
                    function(data) {
                        ndeshjet = data;
                        callback(data);
                    }
                );
            },
            getSuperligaVllazniaId: function(ndeshjaId) {
                return ndeshjet[ndeshjaId - 1];              
            },
            getReport: function(ndeshjaId, callback) {
                $http.get('http://ingalb.info/as/ndeshja.php',{params:{id: 'superliga', ndeshja: ndeshjaId}}).success(
                    function(data) {
                        console.log(ndeshjaId);
                        console.log(data);
                        ndeshja = data;
                        callback(data);
                    }
                );
            }
        }
    })

   .factory('NdeshjaService', function($http) {
        var ndeshja = [];
        return {
            getReport: function(ndeshjaId, callback) {
                $http.get('http://ingalb.info/as/ndeshja.php',{params:{id: 'superliga', ndeshja: ndeshjaId}}).success(
                    function(data) {
                        ndeshja = data;
                        callback(data);
                    }
                );
            }
        }
    })

   .factory('LajmeService', function($http) {
        var lajmet = [];
        return {
            getAll: function(callback) {
                $http.get('http://www.fkvllaznia.net/main/app/lajme.php').success(
                    function(data) {
                        lajmet = data;
                        callback(data);
                    }
                );
            },
           getSlider: function(callback) {
                $http.get('http://www.fkvllaznia.net/main/app/lajme.php?nr=3').success(
                    function(data) {
                        lajmet = data;
                        callback(data);
                    }
                );
            },
            getId: function(lajmiId) {
                return lajmet[lajmiId - 1];              
            }
        }
    })

   .factory('KlasifikimiService', function($http) {
        var klasifikimi = [];
        
        return {
            getAllKlasifikimi: function(sezoniId, callback) {
                $http.get('http://www.ingalb.com/as/klasifikimi.php',{params:{id: sezoniId}}).success(
                    function(data) {
                        ndeshja = data;
                        callback(data);
                    }
                );
            }
        }
        
       /** return {
            getAllKlasifikimi: function(callback) {
                $http.get('http://www.ingalb.com/as/klasifikimi.php?id=superliga').success(
                    function(data) {
                        klasifikimi = data;
                        callback(data);
                    }
                );
            },
            get: function(klasifikimiId) {
              return klasifikimi[klasifikimiId - 1];              
            }
        } **/
    })

   .factory('EkipiService', function($http) {
        var ekipi = [];
        return {
            getAllEkipi: function(sezoniId, ekipiId, callback) {
                $http.get('http://www.ingalb.com/as/ekipi.php',{params:{id: sezoniId, ekipi: ekipiId}}).success(
                    function(data) {
                        ekipi = data;
                        callback(data);
                    }
                );
            },
            get: function(lojtariId) {
              return ekipi[lojtariId - 1];              
            }
        }
    })

   .factory('ForumiService', function($http) {
        var postimet = [];
        return {
            getAllPostimet: function(callback) {
                $http.get('http://www.fkvllaznia.net/main/forum/json.php').success(
                    function(data) {
                        postimet = data;
                        callback(data);
                    }
                );
            },
            get: function(postId) {
                return postimet[postId - 1];              
            }
        }
    });



