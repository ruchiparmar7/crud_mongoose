const ang = angular.module("myApp", []);

ang.controller("ctrl", function ($scope, $http) {
  $scope.alltask = [];
  $scope.gettask = function () {
    $http.get("/data").then(function (response) {
      $scope.alltask = response.data;
    });
  };
  $scope.gettask();
  $scope.isupdatebtn = false;
  $scope.isaddbtn = true;
  $scope.addtask = function () {
    $http.post("/addtask", $scope.newrecord).then(function () {
      $scope.gettask();
    });
  };

  $scope.deletetask = function (id) {
    $http.delete("/deltask/" + id).then(function () {
      $scope.gettask();
    });
  };

  $scope.edittask = function (id) {
    $http.put("/edit/" + id).then(function (res) {
      $scope.isupdatebtn = true;
      $scope.isaddbtn = false;
      $scope.newrecord = res.data;
    });
  };

  $scope.updatetask = function (id) {
    $http.put("/update", $scope.newrecord).then(function () {
      $scope.gettask();
      $scope.clearUpdate();
    });
  };
  
  $scope.clearUpdate = function () {
    $scope.newrecord = {};
    $scope.isupdatebtn = false;
    $scope.isaddbtn = true;
  };

  $scope.ascdesc = function (fnname) {
    if ($scope.name === fnname) {
      $scope.name = "-" + fnname;
    } else {
      $scope.name = fnname;
    }
  };
});
