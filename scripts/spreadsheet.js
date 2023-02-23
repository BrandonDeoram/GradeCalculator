// YOUR CODE GOES HERE
function deselectAll() {
    $("td.selected").removeClass("selected");
  }
  
  function selectRow(rowIndex) {
    deselectAll();
    $("#spreadsheet tbody tr:eq(" + rowIndex + ") td").addClass("selected");
  }
  
  function selectColumn(colIndex) {
    deselectAll();
    $("#spreadsheet tbody td:nth-child(" + (colIndex + 2) + ")").addClass("selected");
  }
  
  $(document).ready(function() {
    $(".row-header").click(function() {
      selectRow($(this).data("index"));
    });
  
    $(".column-header").click(function() {
      selectColumn($(this).data("index"));
    });
  
    $("#spreadsheet td").click(function() {
      $(this).toggleClass("selected");
    });
  });