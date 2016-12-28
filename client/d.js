var index = 0;

$(function() {
    tasksCounter();


    	// side bar options +++ global variables
    	var allTasks = $("#allTasksList");
    	var completedTasks = $("#completedTasksList");
    	var inProgressTasks = $("#inProgressTasksList");
    	var archivedTasks = $("#archivedTasksList");

    	completedTasks.hide();
    	inProgressTasks.hide();
    	archivedTasks.hide();

    $("#deletSelected").hide(); //default
    $("#cancelDeletSelected").hide();


    // filteration ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

    	// all tasks option
    allTasks.animate({fontSize:'1em'},"slow");
    //allTasks.disableSelection();
    $( "#menu" ).menu();


    // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
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
        $(allTasks).slideToggle();
        $(completedTasks).hide();
        $(inProgressTasks).hide();
        $(archivedTasks).hide();
    });

    // inProgress option
    //inProgressTasks.disableSelection();
    $( "#menu" ).menu();
    $("#inProgress").click(function() {
      $(".page-header").text("In Progress");
        $(inProgressTasks).slideToggle();
        $(allTasks).hide();
        $(completedTasks).hide();
        $(archivedTasks).hide();
    });

    // completedTasks option
    //completedTasks.disableSelection();
    $( "#menu" ).menu();
    $("#completed").click(function() {
      $(".page-header").text("Completed");
        $(allTasks).hide();
        $(completedTasks).slideToggle();
        $(inProgressTasks).hide();
        $(archivedTasks).hide();
    });



    // archivedTasks option
    //archivedTasks.disableSelection();
    $( "#menu" ).menu();
    $("#archived").click(function() {
      $(".page-header").text("Archived");
        $(allTasks).hide();
        $(completedTasks).hide();
        $(inProgressTasks).hide();
        $(archivedTasks).slideToggle();
    }); 




    $(".sortByName").click(function(){
      var text = $(this).closest('tr').find('h1').text();
      //alert(text);
      if (text == "All Tasks") {
        //alert(text+"1");
        var a = $("#allTasksListBody").find('b').text();
        alert(a);
      } else if(text == "In Progress"){
        //alert(text+"2");
      } else if (text == "Completed") {
        //alert(text+"3");
      } else if(text == "Archived") {
        //alert(text+"4");
      }

    });

    // filteration ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

    // add task button
    // hide the add task input (dafault) 
    $("#addTaskDialog").hide();
    $("#editTaskDialog").hide();
    // show the add task box when clicking add task 
    $("#addTask").click(function(){
        $("#addTaskDialog").slideToggle();
        $("#editTaskDialog").hide();
    });


    $("#cancelEdit").click(function(){
    $("#editTaskDialog").slideToggle();
     });  
    // CANCEL TASK
    $("#cancelTask").click(function(){
      $("#addTaskIN").attr("value", "");
      $("#Description").attr("value", "");
      $("#datepicker").attr("value", "");
      $("#addTaskDialog").slideToggle();
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
                    + '<td><i>' + description + '<i></td>'
                    + '<td><small>' + date + '</small></td>'
                    + '<td><input type="checkbox" class="checkbox" checked"true"></input></td>'
                    + '</tr>');
        index++; // increament

        // if no task is written
        if (task == "") {
          alert("Empty Field, please enter a task.");
        } else {
        	$("#allTasksListBody").prepend(html);
          $("#inProgressTasksListBody").prepend(html.clone());
          
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
              $("#addTaskDialog").hide();
              $("#addTask").hide();
          });

            $(".actionButton").hide(); //defalut
            $("#sortOptions").show();
            
            $(".hoverOnTask").mouseover(function(){
              $(".actionButton").show();
              });
			$(".hoverOnTask").mouseout(function(){
              $(".actionButton").hide();
              });

        	tasksCounter();

        } //else
    });



  // ################## DELETE CHECKBOXED TASKS ###########################
  $("#deletSelected").click(function(){
    var res = confirm('Are you sure you want to delete selected tasks?');
      $('input[type="checkbox"]:checked').each(function(){
      var classIndex = $(this).closest('tr').attr("class");
      //alert(classIndex[0]);
      // since every row/task has two classes we should spicify the index 0 indicating for the first class.
      if (res) {
        $('.'+classIndex[0]).fadeOut(function(){
          $('.'+classIndex[0]).remove();
          tasksCounter();
          // notification
            jQuery.notifyBar({
            html: "Tasks has been deleted successfully",
            delay: 2000,
            animationSpeed: "normal"
          });

        });
      } else {
        //$('input[type="checkbox"]:unckecked').attr('true');
      }

    });
      $("#deletSelected").hide();
      $("#cancelDeletSelected").hide();
      $("#addTask").show();
  });

  $("#cancelDeletSelected").click(function(){
    $("#deletSelected").hide();
    $("#cancelDeletSelected").hide();
      $("#addTask").show();
  });
  // ######################################################################

    // Date pickker
    $( ".uiDatepicker" ).datepicker({
      showOn: "button",
      buttonImage: "images/calendar.gif",
      buttonImageOnly: true,
      buttonText: "Select date"
    });

 });


// =================================================================================================================================================

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
}


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
        
      }


function editItem(classIndex) {
        //alert(classIndex);
        var task = $('.'+classIndex+":first").closest('tr').find('b');
        var description = $('.'+classIndex+":first").closest('tr').find('i');
        var date = $('.'+classIndex+":first").closest('tr').find('small');

        var taskText = task.text();
        var descriptionText = description.text();
        var dateText = date.text();
        //alert(taskText+"-"+descriptionText);
        

        $("#editTaskIN").attr("value", taskText);
        $("#editDescription").attr("value", descriptionText);
        $("#editDatepicker").attr("value", dateText);

        $("#editTaskDialog").show();
        $("#addTaskDialog").hide();

        // when done editing button is pressed
        $("#editTask").click(function(){
          submitEdit(classIndex);
          classIndex=+10000000000; // add a big number to the index so when editing another task it cannot be edited again.
        }); // done editing 
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

        $("#editTaskIN").attr("value", "");
        $("#editDescription").attr("value", "");
        $("#editDatepicker").attr("value", "");
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
    tasksCounter();
  }
