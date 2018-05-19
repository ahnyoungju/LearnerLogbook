$(document).ready( function() {
  var dayHour = nightHour = 0;
  var totalHour = 120;
  var tblData = "";

  // Read Logbook
  connectDB();
  console.log("connected DB");
  db.transaction(function(trans) {
    trans.executeSql(queryLogbookSQL3,[], function(trans, result) {
      if(result.rows.length == 0)
        console.log("No one registered!");
      else {
        var noOfRecs = result.rows.length;
        console.log( "Learner Logbook result rows: " + noOfRecs );
        for(var i = 0; i < noOfRecs; i++) {
          // processing
          var row = result.rows.item(i);
          console.log(row);
          var output = "<tr>";
          output += "<td>" + row['fldFirstname'] + " " + row['fldLastname'] + "</td>";
          output += "<td>" + row['fldRego'] + "</td>";
          output += "<td>" + row['fldStartDateTime'] + "</td>";
          output += "<td>" + row['fldFinishDateTime'] + "</td>";
          output += "<td>00</td>";
          output += "</tr>";
          console.log(output);
          tblData += output;
        }
      }
      $("#tblData").append(tblData);
      $("#history-table").table("refresh");
    }, function(e) { console.log("error" + e)});

  });

  // Load google charts
  google.charts.load('current', {'packages':['corechart']});
  google.charts.setOnLoadCallback(drawChart);

  // Draw the chart and set the chart values
  function drawChart() {
    var data = google.visualization.arrayToDataTable([
      ['Task', 'Practice Hours'],
      ['Night',12],
      ['Day', 20],
      ['Remained',68]
    // ['Task', 'Hours per Day'],
    // ['Work', 8],
    // ['Friends', 2],
    // ['Eat', 2],
    // ['TV', 3],
    // ['Gym', 2],
    // ['Sleep', 7]
  ]);

    // Optional; add a title and set the width and height of the chart
    var options = {'title':'My Practice Hours',
                   'width':500, 'height':400,
                    colors: ['#2d89ef', '#ee1111', '#eff4ff'],
                  //  pieSliceTextStyle: {
                  //    color: 'black',
                  //   },
                  // legend: 'What',
                  // pieHole: 0.5
                   is3D:true
                 };

    // Display the chart inside the <div> element with id="piechart"
    var chart = new google.visualization.PieChart(document.getElementById('pie'));
    chart.draw(data, options);
  }
});

$("#sortSuper").click( function(){
  sortTable(0);
});
$("#sortVehicle").click( function(){
  sortTable(1);
});
$("#sortStart").click( function(){
  sortTable(2);
});

function sortTable(n) {
  var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
  table = document.getElementById("history-table");
  switching = true;
  // Set the sorting direction to ascending:
  dir = "asc";
  /* Make a loop that will continue until
  no switching has been done: */
  while (switching) {
    // Start by saying: no switching is done:
    switching = false;
    rows = table.getElementsByTagName("TR");
    /* Loop through all table rows (except the
    first, which contains table headers): */
    for (i = 1; i < (rows.length - 1); i++) {
      // Start by saying there should be no switching:
      shouldSwitch = false;
      /* Get the two elements you want to compare,
      one from current row and one from the next: */
      x = rows[i].getElementsByTagName("TD")[n];
      y = rows[i + 1].getElementsByTagName("TD")[n];
      /* Check if the two rows should switch place,
      based on the direction, asc or desc: */
      if (dir == "asc") {
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          // If so, mark as a switch and break the loop:
          shouldSwitch= true;
          break;
        }
      } else if (dir == "desc") {
        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
          // If so, mark as a switch and break the loop:
          shouldSwitch= true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      /* If a switch has been marked, make the switch
      and mark that a switch has been done: */
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      // Each time a switch is done, increase this count by 1:
      switchcount ++;
    } else {
      /* If no switching has been done AND the direction is "asc",
      set the direction to "desc" and run the while loop again. */
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
}
