var index = 0;

$(function() {



      $("#dummy").click(function(){

        var allPage = '<!DOCTYPE html><html><head><script src="jquery-2.2.3.js"></script><link rel="stylesheet" href="jquery-ui.css"><script src="jquery-ui.js"></script><script src="jQuery-Notify-bar-master/jquery.notifyBar.js"></script><link rel="stylesheet" href="jQuery-Notify-bar-master/css/jquery.notifyBar.css"><link rel="stylesheet" href="bootstrap.min.css"><script src="bootstrap.min.js"></script><link href="dashboard.css" rel="stylesheet"><link rel="stylesheet" href="2DoList.css"><script src="2DoList.js"></script><script src="jquery.tablesorter.js"></script><title>2DoList</title></head><body style="background-image: url(images/apple_ios_snow_mountains-wallpaper-1920x1080.jpg)">' + document.body.innerHTML + '</body></html>';
        var USERID = $('#USERID').data('id');

        

        var table1 = '<table class="table table-striped tablesorter" id="allTasksList">' +  $('#allTasksList').html() + '</table>';
        var table2 = '<table class="table table-striped" id="inProgressTasksList">' + $('#inProgressTasksList').html() + '</table>';
        var table3 = '<table class="table table-striped" id="completedTasksList">' + $('#completedTasksList').html() + '</table>';
        var table4 = '<table class="table table-striped" id="archivedTasksList">' + $('#archivedTasksList').html() + '</table>';
        
        //alert(JSON.stringify(table1).slice(1, -1));


          $.ajax({
            type: 'POST',
            data: JSON.stringify({html: allPage, USERID:USERID,table1:table1,table2:table2 ,table3:table3 ,table4:table4 }),
            contentType: 'application/json',
            url: '/save',
            success: function(data) {
              console.log(data + ': changes saved.');
              console.log(table4);
              console.log(table3);
              console.log(table2);
              console.log(table1);


           },
           error: function(xhr, message, foo) {
            console.log(message);
            }
          });
      });













 // ++++++++++++++++++++++++++++++++++ P H A S E  O N E  ++++++++++++++++++++++++++++++++++++++++++++++++++

    $('.datepicker').datepicker(); 

    // when clicking add task button.
    $("#Mybtn").click(function(){
        $("#addTaskDialog").modal();
    });

    // this to reset the dialog inputs when cancel button is pressed.
    $('.modal').on('hidden.bs.modal', function(){
    $(this).find('form')[0].reset();
    });


      // side bar options +++ global variables
      var allTasks = $("#allTasksList");
      var completedTasks = $("#completedTasksList");
      var inProgressTasks = $("#inProgressTasksList");
      var archivedTasks = $("#archivedTasksList");




      // default
      completedTasks.hide();
      inProgressTasks.hide();
      archivedTasks.hide();

      //default
    $("#deletSelected").hide();
    $("#cancelDeletSelected").hide();
    
    $(".select-all").click(function() {
      $("#deletSelected").show();
      $("#cancelDeletSelected").show();
      });


    // filteration +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

    $("#allTasks2").click(function(){
      $(".page-header").text("All Tasks");
      $(allTasks).slideToggle();
        $(completedTasks).hide();
        $(inProgressTasks).hide();
        $(archivedTasks).hide();
        $("#navbar").hide();
    });
    $("#inProgress2").click(function(){
      $(".page-header").text("In Progress");
      $(allTasks).hide();
        $(completedTasks).hide();
        $(inProgressTasks).slideToggle();
        $(archivedTasks).hide();
        $("#navbar").hide();
    });
    $("#completed2").click(function(){
      $(".page-header").text("Completed");
      $(allTasks).hide();
        $(completedTasks).slideToggle();
        $(inProgressTasks).hide();
        $(archivedTasks).hide();
        $("#navbar").hide();
    });
    $("#archived2").click(function(){
      $(".page-header").text("Archived");
      $(allTasks).hide();
        $(completedTasks).hide();
        $(inProgressTasks).hide();
        $(archivedTasks).slideToggle();
        $("#navbar").hide();
    });
    $(".collapsed").click(function(){
        $("#navbar").slideToggle();
        $("#nav").slideToggle();
    });
    // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

    $("#allTasks").click(function() {
      $(".page-header").text("All Tasks");

        $("#allTasksList").slideToggle();
        $("#completedTasksList").hide();
        $("#inProgressTasksList").hide();
        $("#archivedTasksList").hide();
    });

    // inProgress option
    $("#inProgress").click(function() {
      $(".page-header").text("In Progress");

       $("#allTasksList").hide();
        $("#completedTasksList").hide();
        $("#inProgressTasksList").slideToggle();
        $("#archivedTasksList").hide();
    });

    // completedTasks option
    $("#completed").click(function() {
      $(".page-header").text("Completed");

        $("#allTasksList").hide();
        $("#completedTasksList").slideToggle();
        $("#inProgressTasksList").hide();
        $("#archivedTasksList").hide();


    });


    // archivedTasks option
    $("#archived").click(function() {
      $(".page-header").text("Archived");
        
        $("#allTasksList").hide();
        $("#completedTasksList").hide();
        $("#inProgressTasks").hide();
        $("#archivedTasksList").slideToggle();
    }); 

    // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++



    // ++++++ SORTING +++++++

    $(".sortByName").click(function(){
      var text = $(this).closest('tr').find('h1').text();
      //alert(text);
      if (text == "All Tasks") {
        //alert(text+"1");
        $("#allTasksList").tablesorter();
        allTasks.find('.byName').click();
      } else if(text == "In Progress"){
        //alert(text+"2");
        $("#inProgressTasksList").tablesorter();
        inProgressTasks.find('.byName').click();
      } else if (text == "Completed") {
        //alert(text+"3");
        $("#completedTasksList").tablesorter(); 
        completedTasks.find('.byName').click();
      } else if(text == "Archived") {
        //alert(text+"4");
        $("#archivedTasksList").tablesorter();
        archivedTasks.find('.byName').click();
      }
    });

    $(".sortByDate").click(function(){
      var text = $(this).closest('tr').find('h1').text();
      //alert(text);
      if (text == "All Tasks") {
        //alert(text+"1");
        $("#allTasksList").tablesorter(); 
        allTasks.find('.byDate').click();
      } else if(text == "In Progress"){
        //alert(text+"2");
        $("#inProgressTasksList").tablesorter(); 
        inProgressTasks.find('.byDate').click();
      } else if (text == "Completed") {
        //alert(text+"3");
        $("#completedTasksList").tablesorter(); 
        completedTasks.find('.byDate').click();
      } else if(text == "Archived") {
        //alert(text+"4");
        $("#archivedTasksList").tablesorter();
        archivedTasks.find('.byDate').click();
      }
    });

    // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

    // add task button
    // hide the add task input (dafault) 
    //$("#addTaskDialog").hide();
    //$("#editTaskDialog").hide();


    // show the add task box when clicking add task 
    //$("#addTask").click(function(){
    //    $("#addTaskDialog").slideToggle();                 // deprecated we have used a dialouge instead
    //    $("#editTaskDialog").hide();
    // });


    //$("#cancelEdit").click(function(){
    //$("#editTaskDialog").slideToggle();
    // });  



    // CANCEL TASK
    $("#cancelTask").click(function(){
      $("#addTaskIN").attr("value", "");
      $("#Description").attr("value", "");
      $("#datepicker").attr("value", "");
      //$("#addTaskDialog").slideToggle();
    });

    // submit task ADD ITEM
    $("#submitTask").click(function(){
      // values


        var task = $("#addTaskIN").val();
        var date = $("#datepicker").val();
        var description = $("#description").val();

        var html =  $('<tr class="' + index + ' hoverOnTask" >' // in this line we give the rows(task) two clases for the index and for style..
                    + '<td><div class="dropdown"> <button type="button" data-toggle="dropdown" class="actionButton">'
                    + '<span class="caret"></span></button><ul class="dropdown-menu">'
                    + '<li class="dropdown-header">Actions</li>'
                    + '<li class="archive"    onclick="archiveItem(' + index + ')" ><p>Archive</p></li>'
                    + '<li class="editTask"   onclick="editItem('    + index + ')" ><p>Edit Task</p></li>'
                    + '<li class="deleteTask" onclick="deleteItem('  + index + ')" ><p>Delete Task</p></li>'
                    + '<li class="markAsDone" onclick="markItem('    + index + ')" ><p>Mark as done</p></li>'
                    + '</ul>'
                    + '</div></td>'
                    + '<td><b>' + task + '</b></td>'
                    + '<td><i class="desc">' + description + '<i></td>'
                    + '<td><small>' + date + '</small></td>'
                    + '<td><input type="checkbox" class="checkbox"></input></td>'
                    + '</tr>');
        index++; // increament

        // if no task is written
        if (task == "") {
          alert("Empty Field, please enter a task.");
        } else {
          $("#allTasksListBody").prepend(html);
          $("#inProgressTasksListBody").prepend(html.clone());

          // empty fields
          $("#addTaskIN").val("");
          $("#datepicker").val("");
          $("#description").val("");
          

          // push up notification 
          // +++++++ source ----> http://www.whoop.ee/posts/2013/04/05/the-resurrection-of-jquery-notify-bar.html +++++ //
          jQuery(function () {
            jQuery.notifyBar({
              html: "Task has been added :)",
              delay: 2000,
              animationSpeed: "normal"
            });
          });


          //   ##################  CHECKBOXED TASKS ###########################
          $(".checkbox").click(function() {
              $("#deletSelected").show();
              $("#cancelDeletSelected").show();
              $("#Mybtn").hide();
          });

            $(".actionButton").hide(); //defalut
            $(".desc").hide();
            $("#sortOptions").show();
            
            // hover on task and show options button and description
            $(".hoverOnTask").hover(function(){
              $(this).closest('tr').find(".actionButton").show();
              $(this).closest('tr').find("i").show();
              },function(){
              $(this).closest('tr').find(".actionButton").hide();
              $(this).closest('tr').find("i").hide();
            });


            // select all tasks option
            $('.select-all').click(function() {   
                var state = this.checked;
                //alert(state);
                $(this).closest('table').find('.checkbox').each(function(){
                    this.checked = state;
                    $("#Mybtn").hide();
                  });
              });


          tasksCounter();
          $("#dummy").click();


        } //else
    });

    /// //// // / // // / / copy / /// / // / // / // / / // /  
          $(".checkbox").click(function() {
              $("#deletSelected").show();
              $("#cancelDeletSelected").show();
              $("#Mybtn").hide();
          });

            $(".actionButton").hide(); //defalut
            $(".desc").hide();
            $("#sortOptions").show();
            
            // hover on task and show options button and description
            $(".hoverOnTask").hover(function(){
              $(this).closest('tr').find(".actionButton").show();
              $(this).closest('tr').find("i").show();
              },function(){
              $(this).closest('tr').find(".actionButton").hide();
              $(this).closest('tr').find("i").hide();
            });


            // select all tasks option
            $('.select-all').click(function() {   
                var state = this.checked;
                //alert(state);
                $(this).closest('table').find('.checkbox').each(function(){
                    this.checked = state;
                    $("#Mybtn").hide();
                  });
              });


          tasksCounter();

          /// //// // / // // / / copy / /// / // / // / // / / // /  



  // ################## DELETE CHECKBOXED TASKS ###########################
  $("#deletSelected").click(function(){
    $(".select-all").prop('checked', false); // uncheck all checked (select-all) option so it wont be deleted with the other checked checkboxes :-)

    var res = confirm('Are you sure you want to delete selected tasks?');
      $(".checkbox").each(function(){
      //alert(classIndex[0]);
      // since every row/task has two classes we should spicify the index 0 indicating for the first class.
      if (res) {
        if(this.checked) {
          var classIndex = $(this).closest('tr').attr("class");
          $('.'+classIndex[0]).find(':checkbox').prop('checked', true);

            $('input[type=checkbox]:checked').closest('tr').fadeOut(function(){
              $(this).remove();
              tasksCounter();
              // notification
                jQuery.notifyBar({
                html: "Tasks has been deleted successfully",
                delay: 2000,
                animationSpeed: "normal"
              });

            });
            
        }
        //refreshDataTables();
      } else {
        $(":checkbox").prop('checked', false);
      }
      tasksCounter();

    });
      

      $("#deletSelected").hide();
      $("#cancelDeletSelected").hide();
      $("#Mybtn").show();

      $("#dummy").click();
  });

  $("#cancelDeletSelected").click(function(){
    $("#deletSelected").hide();
    $("#cancelDeletSelected").hide();
    $("#Mybtn").show();
    $(":checkbox").prop('checked', false); // uncheck all checked checkboxes

  });
  // #######################################################################

 });


// ================================================    FUNCTIONS   ================================================================================

function deleteItem(classIndex) {
    var c = confirm('Are you sure you want to delete this Task?');
         if(c) {
            var taskIndex = "." + classIndex; // get the class/index of the task/s to be deleted    

            // delete task/s
            $(taskIndex).fadeOut(function(){
            this.remove();
            tasksCounter(); // updated badges
            });
            // notification
            jQuery.notifyBar({
            html: "Task has been deleted successfully",
            delay: 2000,
            animationSpeed: "normal"
          });
         }
         $("#dummy").click();
      }


function markItem(classIndex) {
        var html = $("."+classIndex+":first"); // select  first element that has the class .\(classIndex)
        $('.'+classIndex).remove(); // remove all tasks that have class .\(classIndex)

        var s = html.find('b');
        var taskText = s.text();
        var strike = "<strike>" + taskText + "<strike>";
        s.empty();
        s.append(strike);
        $("#completedTasksList").append(s.closest('tr'));
        $("#allTasksListBody").append(s.closest('tr').clone());

        jQuery.notifyBar({
                html: "One Task is completed, Keep Going :)",
                delay: 2000,
                animationSpeed: "normal"
              });

        tasksCounter();
          $(".hoverOnTask").hover(function(){
          $(this).closest('tr').find(".actionButton").show();
          $(this).closest('tr').find("i").show();
          },function(){
          $(this).closest('tr').find(".actionButton").hide();
          $(this).closest('tr').find("i").hide();
        });
          $("#dummy").click();
      }


function editItem(classIndex) {
        //alert(classIndex);
        $("#editTaskDialog").modal();
        var task = $('.'+classIndex+":first").closest('tr').find('b');
        var description = $('.'+classIndex+":first").closest('tr').find('i');
        var date = $('.'+classIndex+":first").closest('tr').find('small');

        var taskText = task.text();
        var descriptionText = description.text();
        var dateText = date.text();
        

        $("#editTaskIN").attr("value", taskText);
        $("#editDescription").attr("value", descriptionText);
        $("#editDatepicker").attr("value", dateText);


        // when done editing button is pressed
        $("#editTask").click(function(){
          
          $('.modal').on('hidden.bs.modal', function(){
          $(this).find('form')[0].reset();
            });
          
          submitEdit(classIndex);

          classIndex=+10000000000; // add a big number to the index so when editing another task it cannot be edited again.
        }); // done editing 
$("#dummy").click();
}


function submitEdit(classIndex) {
          var input1 = $("#editTaskIN").val();
          var input2 = $("#editDescription").val();
          var input3 = $("#editDatepicker").val();

          $('.'+classIndex).closest('tr').find('b').text(input1);
          $('.'+classIndex).closest('tr').find('i').text(input2);
          $('.'+classIndex).closest('tr').find('small').text(input3);

          jQuery.notifyBar({
                html: "Task has been Edited successfully",
                delay: 2000,
                animationSpeed: "normal"
              });
      $('.modal').on('hidden.bs.modal', function(){
    $(this).find('form')[0].reset();
    });
      $("#dummy").click();
}

function archiveItem(classIndex){
    var html = $("."+classIndex+":first"); // select  first element that has the class .\(classIndex)
    $('.'+classIndex).remove(); // remove all classindex classes
    $("#archivedTasksList").append(html.clone());

    jQuery.notifyBar({
            html: "Task has been moved to archived list",
            delay: 2000,
            animationSpeed: "normal"
          });

    // update badges counter
    $(".hoverOnTask").hover(function(){
    $(this).closest('tr').find(".actionButton").show();
    $(this).closest('tr').find("i").show();
    },function(){
    $(this).closest('tr').find(".actionButton").hide();
    $(this).closest('tr').find("i").hide();
  });
    tasksCounter();
    $("#dummy").click();
  }


function refreshDataTables(source) {
  source.DataTable().destroy();  // destroy the old dataTable and creating a new one(reininitialization)..
  source.DataTable( {
    //paging : false,
    //searching : false
  } );
  tasksCounter();
  $("#dummy").click();
}

// count the numbers of Tasks.
function tasksCounter() {
var allTasksCounter = $("#allTasksListBody").children().length;
var completedTasksCounter = $("#completedTasksListBody").children().length;
var inProgressCounter = $("#inProgressTasksListBody").children().length;
var archivedTasksCounter = $("#archivedTasksListBody").children().length;
$("#badge1").text(allTasksCounter);
$("#badge2").text(inProgressCounter);
$("#badge3").text(completedTasksCounter);
$("#badge4").text(archivedTasksCounter);
$("#dummy").click();
}

