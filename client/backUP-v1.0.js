var index = 0;

$(function() {
    tasksCounter();
    $("#dialog-message").hide();


    	// side bar options +++ global variables
    	var allTasks = $("#allTasksList");
    	var completedTasks = $("#completedTasksList");
    	var inProgressTasks = $("#inProgressTasksList");
    	var archivedTasks = $("#archivedTasksList");

    	completedTasks.hide();
    	inProgressTasks.hide();
    	archivedTasks.hide();

    $("#deletSelected").hide(); //default
    $(".checkbox").click(function() {
      $("#deletSelected").slideToggle();
    });

    // filteration ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

    	// all tasks option
    allTasks.animate({fontSize:'1em'},"slow");
    //allTasks.disableSelection();
    $( "#menu" ).menu();
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

    // submit task
    $("#submitTask").click(function(){
    	// values
        var task = $("#addTaskIN").val();
        var date = $("#datepicker").val();
        var description = $("#description").val();

        var html =  $('<tr class="' + index++ + '" >'
                    + '<td><div class="dropdown"> <button type="button" data-toggle="dropdown">'
                    + '<span class="caret"></span></button><ul class="dropdown-menu">'
                    + '<li class="dropdown-header">Actions</li>'
                    + '<li class="archive" ><p>Archive</p></li>'
                    + '<li class="editTask" ><p>Edit Task</p></li>'
                    + '<li class="deleteTask"><p>Delete Task</p></li>'
                    + '<li class="markAsDone"><p>Mark as done</p></li>'
                    + '</ul>'
                    + '</div></td>'
                    + '<td><b>' + task + '</b></td>'
                    + '<td><i>' + description + '<i></td>'
                    + '<td><small>' + date + '</small></td>'
                    + '<td><input type="checkbox" id="checkbox"></input></td>'
                    + '</tr>');

        // if no task is written
        if (task == "") {
            $( "#dialog-message" ).dialog({
          modal: true,
          buttons: {
            Ok: function() {
          		$( this ).dialog( "close" );}} 
          	});

        } else {
        	allTasks.append(html);
          inProgressTasks.append(html.clone());
          
          // push up notification 
          // +++++++ source ----> http://www.whoop.ee/posts/2013/04/05/the-resurrection-of-jquery-notify-bar.html +++++ //
          jQuery(function () {
            jQuery.notifyBar({
              html: "Task has been added :)",
              delay: 2000,
              animationSpeed: "normal"
            });
          });
          // +++++++ source ----> http://www.whoop.ee/posts/2013/04/05/the-resurrection-of-jquery-notify-bar.html +++++ //
          // update badges counter
        	tasksCounter();

              // drop down options ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
              $(".deleteTask").click(function() {
                var c = confirm('Are you sure you want to delete this Task?');
                     if(c) {
                        var task = $(this).closest('tr'); // get the row to be deleted
                        var taskIndex = "." + task.attr("class"); // get the class/index of the task/s to be deleted    
                        // delete task/s
                        $(taskIndex).fadeOut(function(){
                        this.remove();
                        });
                        // notification
                        jQuery.notifyBar({
                        html: "Task has been deleted successfully",
                        delay: 2000,
                        animationSpeed: "normal"
                      });
                     }
              });
              $(".markAsDone").click(function() {
                jQuery.notifyBar({
                        html: "One Task is completed, Keep Going :)",
                        delay: 2000,
                        animationSpeed: "normal"
                      });

                var html = $(this).closest('tr');
                completedTasks.append(html.clone());
                var s = html.find('b');
                var taskText = s.text();
                var strike = "<strike>" + taskText + "<strike>";
                s.empty();
                s.append(strike);

                tasksCounter();
                
              });

              $(".editTask").click(function() {
                var task = $(this).closest('tr').find('b');
                var description = $(this).closest('tr').find('i');
                var date = $(this).closest('tr').find('small');

                var taskText = task.text();
                var descriptionText = description.text();
                var dateText = date.text();

                $("#editTaskIN").attr("value", taskText);
                $("#editDescription").attr("value", descriptionText);
                $("#editDatepicker").attr("value", dateText);

                $("#editTaskDialog").show();
                $("#addTaskDialog").hide();


                // when done editing button is pressed
                $("#editTask").click(function(){

                  task.text($("#editTaskIN").val());
                  description.text($("#editDescription").val());
                  date.text($("#editDatepicker").val());

                  jQuery.notifyBar({
                        html: "Task has been Edited successfully",
                        delay: 2000,
                        animationSpeed: "normal"
                      });
                }); // done editing 

                tasksCounter();

              });

              $(".archive").click(function(){
                var html = $(this).closest('tr');
                archivedTasks.append(html);

                jQuery.notifyBar({
                        html: "Task has been moved to archived list",
                        delay: 2000,
                        animationSpeed: "normal"
                      });

                tasksCounter();
              });


              // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

        } //else
    });





    // Date pickker
    $( ".uiDatepicker" ).datepicker({
      showOn: "button",
      buttonImage: "images/calendar.gif",
      buttonImageOnly: true,
      buttonText: "Select date"
    });

 });


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

