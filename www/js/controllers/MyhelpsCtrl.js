app.controller('MyhelpsCtrl', function($scope, $state, $ionicModal, $rootScope, $ionicLoading, $ionicScrollDelegate, $timeout, HelpsSpecialOperations) {


    $scope.ro = "";
    $scope.myhelps = false;

    var currentUserRol1 = "";
    var currentUserRol2 = "";
    var user1 = "";
    var user2 = "";

    var listHelpsColaborators = [];
    var listHelpsNeedies = [];

    try {
        if ($rootScope.isSessionR1) {
            currentUserRol1 = JSON.parse(localStorage.getItem('userrol1'));
            user1 = JSON.parse(localStorage.getItem('r1'));
        }
    } catch (error) { }

    try {
        if ($rootScope.isSessionR2) {
            currentUserRol2 = JSON.parse(localStorage.getItem('userrol2'));
            user2 = JSON.parse(localStorage.getItem('r2'));
        }
    } catch (error) { }


    $scope.goWantHelp = function(ro) {
        $scope.ro = ro;
        openmodalWantHelp();
    };

    // ## modal del registo o login de colaborador
    $ionicModal.fromTemplateUrl('templates/modals/wanthelp.html', {
        scope: $scope,
        focusFirstInput: true
    }).then(function(modalWantHelp) {
        $scope.modalWantHelp = modalWantHelp;
    });


    function openmodalWantHelp() {
        $scope.modalWantHelp.show();
    }

    $scope.closemodalWantHelp = function() {
        $ionicScrollDelegate.scrollTop();
        $timeout(
            function() {
                $scope.modalWantHelp.hide();
            }, 250);
    };
    // ## 

    function getHelpsColaborator() {

        if (currentUserRol1 != "") {
            $ionicLoading.show();
            var hso = HelpsSpecialOperations.helpsColaborator(currentUserRol1.id, 10);
            hso.then(function(response) {
                $ionicLoading.hide();
                listHelpsColaborators = response.data.data;
                getHelpsNeedy();
            });
        }

    }

    function getHelpsNeedy() {

        if (currentUserRol2 != "") {
            $ionicLoading.show();
            var hso = HelpsSpecialOperations.helpsNeedy(currentUserRol2.id, 10);
            hso.then(function(response) {
                $ionicLoading.hide();
                listHelpsNeedies = response.data.data;
                $scope.allList = listHelpsColaborators.concat(listHelpsNeedies);
                orderListByDateDesc();
            });
        }

    }


    function orderListByDateDesc() {
        $scope.allList.sort(function(a, b) {
            return new Date(a.date).getTime() - new Date(b.date).getTime();
        });
        console.log($scope.allList);
    }

    getHelpsColaborator();



});