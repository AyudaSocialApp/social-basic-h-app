app.controller('MyhelpsCtrl', function ($scope, $state, $ionicModal, $rootScope, $ionicLoading, $ionicScrollDelegate, $timeout, HelpsSpecialOperations) {


    $scope.ro = "";
    $scope.myhelps = false;
    $scope.sesionIdColaborator = "";
    $scope.sesionIdNeedy = "";
    $scope.maxId = "-";

    var currentUserRol1 = "";
    var currentUserRol2 = "";
    var user1 = "";
    var user2 = "";
    $scope.allList = [];
    $scope.listWithoutRepeat = [];

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


    $scope.goWantHelp = function (r,help) {

        $scope.ro = r;

        if($scope.ro == 2){
          if(help.needy != null && help.needy.id == $scope.sesionIdNeedy && help.contributor != null && help.accepted == false){
              $scope.ro = 2;
          }
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
            var hso = HelpsSpecialOperations.helpsColaborator(currentUserRol1.id, $scope.maxId);
            hso.then(function (response) {
                $ionicLoading.hide();
                mixArraysHelpsC(response.data.data.list);
                getHelpsNeedy();
            });
        } else {
            getHelpsNeedy();
        }

    }

    function mixArraysHelpsC(data) {
      if (listHelpsColaborators.length > 0) {
          listHelpsColaborators = listHelpsColaborators.concat(data);
      }else{
        listHelpsColaborators = data;
      }
    }

function getHelpsNeedy() {
    if (currentUserRol2 != "") {
        $ionicLoading.show();
        var hso = HelpsSpecialOperations.helpsNeedy(currentUserRol2.id, $scope.maxId);
        hso.then(function (response) {
            $ionicLoading.hide();
            mixArraysHelpsN(response.data.data.list);
            mixArrays();
        });
    } else {
        mixArrays();
    }
}

function mixArraysHelpsN(data) {
  if (listHelpsNeedies.length > 0) {
      listHelpsNeedies = listHelpsNeedies.concat(data);
  }else{
    listHelpsNeedies = data;
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
    deleteDuplicHelps();
    $scope.allList = $scope.listWithoutRepeat;
}


function orderListByDateDesc() {
    $scope.allList.sort(function (a, b) {
        return new Date(a.updated_at).getTime() - new Date(b.updated_at).getTime();
    });
}

getHelpsColaborator();


function findidInHelps(id){
    var resFindR = false;
    $scope.listWithoutRepeat.forEach( function(element, index) {
        if(element.id == id){
            resFindR = true;
        }
    });
    return resFindR;
}

function deleteDuplicHelps(){
    $scope.listWithoutRepeat = [];
    $scope.allList.forEach( function(element, index) {
      if(findidInHelps(element.id) == false){
        $scope.listWithoutRepeat.push(element);
    }
});
}




});