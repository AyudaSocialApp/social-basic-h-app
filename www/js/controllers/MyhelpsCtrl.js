app.controller('MyhelpsCtrl', function ($scope, $state, $ionicModal, $rootScope, $ionicLoading, $ionicScrollDelegate, $timeout, HelpsSpecialOperations) {


    $scope.ro = "";
    $scope.myhelps = false;
    $scope.sesionIdColaborator = "";
    $scope.sesionIdNeedy = "";

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
            $scope.sesionIdColaborator = currentUserRol1.id;
        }
    } catch (error) { }

    try {
        if ($rootScope.isSessionR2) {
            currentUserRol2 = JSON.parse(localStorage.getItem('userrol2'));
            user2 = JSON.parse(localStorage.getItem('r2'));
            $scope.sesionIdNeedy = currentUserRol2.id;
        }
    } catch (error) { }


    $scope.goWantHelp = function (help) {
        if(help.contributor != null){
            $scope.ro = 1;
        }

        if(help.needy !=  null){
            $scope.ro = 2;
        }
        $rootScope.currentHelpDetail = help;
        openmodalWantHelp();
    };

    // ## modal del registo o login de colaborador
    $ionicModal.fromTemplateUrl('templates/modals/wanthelp.html', {
        scope: $scope,
        focusFirstInput: true
    }).then(function (modalWantHelp) {
        $scope.modalWantHelp = modalWantHelp;
    });


    function openmodalWantHelp() {
        $scope.modalWantHelp.show();
    }

    $scope.closemodalWantHelp = function () {
        $ionicScrollDelegate.scrollTop();
        $timeout(
            function () {
                $scope.modalWantHelp.hide();
            }, 250);
    };
    // ## 

    function getHelpsColaborator() {

        if (currentUserRol1 != "") {
            $ionicLoading.show();
            var hso = HelpsSpecialOperations.helpsColaborator(currentUserRol1.id, 10);
            hso.then(function (response) {
                $ionicLoading.hide();
                listHelpsColaborators = response.data.data;
                getHelpsNeedy();
            });
        } else {
            getHelpsNeedy();
        }

    }

    function getHelpsNeedy() {
        if (currentUserRol2 != "") {
            $ionicLoading.show();
            var hso = HelpsSpecialOperations.helpsNeedy(currentUserRol2.id, 10);
            hso.then(function (response) {
                $ionicLoading.hide();
                listHelpsNeedies = response.data.data;
                 mixArrays();
            });
        } else {
            mixArrays();
        }
    }

    function mixArrays() {
        if (listHelpsColaborators.length < 1 && listHelpsNeedies.length > 0) {
            $scope.allList = listHelpsNeedies;
        }

        if (listHelpsNeedies.length < 1 && listHelpsColaborators.length > 0) {
            $scope.allList = listHelpsColaborators;
        }

        if (listHelpsColaborators.length > 0 && listHelpsNeedies.length > 0) {
            $scope.allList = listHelpsColaborators.concat(listHelpsNeedies);
        }

        orderListByDateDesc();
    }


    function orderListByDateDesc() {
        $scope.allList.sort(function (a, b) {
            return new Date(a.date).getTime() - new Date(b.date).getTime();
        });
    }

    getHelpsColaborator();



});