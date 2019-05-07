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
 //    startDate = moment($("#start-input").val().trim(), "MM/DD/YYYY").format("X");
    startTime = $('#first-train-time').val();
    frequency = $("#frequency").val();

    console.log(name, destination, startTime, frequency);
   // let newRow = 
        // `<tr>
        //     <th scope="row">1</th>
        //     <td>` + name + `</td>
        //     <td>` + role + `</td>
        //     <td>` + startDate + `</td>
        //     <td>months worked</td>
            
        //     <td>` + rate + `</td>
        //     <td>amount paid</td>
        //     </tr>`
        //     $(".table").append(newRow);

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

   console.log("::" + trainName, trainDestination, startTime, frequency);
//   var newDateStart = moment(dateStart, "YYYY-MM-DD");
  
//   monthsWorked = moment.diff(moment(startDate, "X"), "months");
//   console.log(dateStart);
//   console.log(monthsWorked);
// Create the new row
var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(trainDestination),
    $("<td>").text(frequency),
    $("<td>").text(""),
    $("<td>").text("")
    
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