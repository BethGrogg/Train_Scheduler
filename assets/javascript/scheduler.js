$(document).ready(function () {
// Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyCyyEnyH0aeh445-MEMdvO0K47J2DFF34U",
    authDomain: "test-72544.firebaseapp.com",
    databaseURL: "https://test-72544.firebaseio.com",
    projectId: "test-72544",
    storageBucket: "test-72544.appspot.com",
    messagingSenderId: "255626185550",
    appId: "1:255626185550:web:6a35be295a3ec604"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  database = firebase.database();



var name = "";
var destination = "";
var startTime="";
var frequency =0;


$("#submit").on("click", function(event){
    event.preventDefault();

    name = $("#name").val();
    destination =$("#destination").val();
 
    startTime = $('#first-train-time').val();
    frequency = $("#frequency").val();
  
  

        database.ref().push( {
          name,
          destination,
          startTime,
          frequency
        });

 $('form').trigger('reset');

});

 database.ref().on("child_added", function(childSnapshot) {

   var trainName = childSnapshot.val().name;
   var trainDestination = childSnapshot.val().destination;
   var startTime = childSnapshot.val().startTime;
   var frequency = childSnapshot.val().frequency;


   ///////////////////////////////////////////////////////////
    var nextArr;
        var minAway;
        // Change year so first train comes before now
        var firstTrainNew = moment(childSnapshot.val().startTime, "hh:mm").subtract(1, "years");
        console.log("firstTrainNew: " + firstTrainNew);
        // Difference between the current and firstTrain
        var diffTime = moment().diff(moment(firstTrainNew), "minutes");
        console.log("diffTime: " + diffTime);
        var remainder = diffTime % childSnapshot.val().frequency;
        console.log("remainder: " + remainder);
        // Minutes until next train
        var minAway = childSnapshot.val().frequency - remainder;
        console.log("minAway: " + minAway);
        // Next train time
        var nextTrain = moment().add(minAway, "minutes");
        nextTrain = moment(nextTrain).format("hh:mm");
        console.log("nextTrain: " + nextTrain);
  
// Create the new row
var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(trainDestination),
    $("<td>").text(frequency),
    $("<td>").text(nextTrain),
    $("<td>").text(minAway)
    
  );

   // Append the new row to the table
   $("#train-table > tbody").append(newRow);

 
//   // If any errors are experienced, log them to console.
  }, function(errorObject) {
   console.log(errorObject.code);
  });

// function renderTableData() {

//}
});