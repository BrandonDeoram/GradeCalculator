$(document).ready(function () {
  // load the CSV file
  $.get("grades.csv", function (data) {
    // split the data into rows and cells
    var rows = data.trim().split("\n");
    var cells = rows.map(function (row) {
      return row.split(",");
    });
    // create the table HTML
    var html = "";
    // add the header row
    html += "<tr>";
    for (var j = 0; j < cells[0].length; j++) {
      html += "<th class='column-header' data-index='" + j + "'>" + cells[0][j] + "</th>";
    }
    html += "</tr>";
    // add the data rows
    for (var i = 1; i < cells.length; i++) {
      html += "<tr><th class='row-header' data-index='" + (i - 1) + "'>" + cells[i][0] + "</th>";
      for (var j = 1; j < cells[i].length; j++) {
        html += "<td class='editable'>" + cells[i][j] + "</td>";
      }
      html += "</tr>";
    }
    // append the HTML to the table body
    $("#spreadsheet tbody").html(html);

    // add click handler for editable cells
    $(".editable").click(function () {
      var $cell = $(this); // assign the value of `this` to a variable
      var currentValue = $cell.text();
      $cell.text("");
      var $input = $("<input>")
        .attr("type", "text")
        .val(currentValue)
        .appendTo($cell).focus();

      $input.keypress(function (event) {
        if (event.keyCode === 13) {
          var newValue = $(this).val();
          console.log(newValue);
          $(this).remove();
          $cell.html(newValue); // use the variable instead of `this`
          console.log($cell.html()); // log the new value to the console
        }
      });
    });

    // add click handler for row headers
    $(".row-header").click(function () {
      var rowIndex = $(this).data("index");
      selectRow(rowIndex);
    });

    // add click handler for column headers
    $(".column-header").click(function () {
      var colIndex = $(this).data("index");
      selectColumn(colIndex);
    });

    // add click handler for table cells
    $("#spreadsheet td").click(function () {
      var $cell = $(this); // assign the value of `this` to a variable
      var $row = $cell.parent(); // get the parent row
      if (!$cell.hasClass("selected")) {

        $cell.addClass("selected");
      } else {
        deselectAll();
        $cell.removeClass("selected");
        $cell.addClass("selected");

      }
    });

    // deselect all cells and rows
    function deselectAll() {
      $("#spreadsheet td.selected").removeClass("selected");
      $("#spreadsheet tr.selected").removeClass("selected");
    }


    // select a row
    function selectRow(rowIndex) {
      deselectAll();
      $("#spreadsheet tbody tr:eq(" + (rowIndex + 1) + ") td").addClass("selected");
    }

    // select a column
    function selectColumn(colIndex) {
      deselectAll();
      $("#spreadsheet tbody td:nth-child(" + (colIndex + 1) + ")").addClass("selected");
    }
  });
});
