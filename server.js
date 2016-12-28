var express = require('express');
var app = express();
var fs = require("fs");
var session = require('express-session');



var bodyParser = require('body-parser');
var jsonParser = bodyParser.json(); // very important for ajax 


// Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(express.static(__dirname + '/client'));

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/client/login.html');
  console.log('login file sent');
})


app.post('/home', urlencodedParser, function (req, res) {
  fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
      data = JSON.parse( data );

      var id = verifyEmail(req.body.EMAILLOGIN, data);
      res.setHeader('X-XSS-Protection', 0);
      res.writeHead(200, {'Content-Type': 'text/html'});
      //console.log(data[id][4]);
      if (id != undefined) {
        res.end(data[id][4]);
      } else {
        res.sendStatus(404);
      }
    });
});



app.post('/login', jsonParser, function (req, res) {

  console.log('enter /login');
  // Get the values of the input text named username & password
  username = req.body.email;
  password = req.body.pass;
   console.log(username);
   console.log(password);
  // Read JSON file containing the users to verify that the user is already registered and have access
  fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
    // Note that err here is for handling any error occuring in opening the file
    data = JSON.parse( data );
    var id = verifyEmail(username, data);
      if (id < 0) {
        console.log('user not found');
        res.send('1');
      } else if (!verifyPass(password, data)) {
        console.log('password not matched');
        res.send('2');
      } else {
        res.send('3');
      }
  });
})


app.post('/signup', jsonParser, function (req, res) {
  var first = req.body.FIRSTNAME;
  var last  = req.body.LASTNAME;
  var email = req.body.EMAIL;
  var pass  = req.body.PASS;

fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
        data = JSON.parse( data );

        if(verifyEmail(email,data) < 0) {
        var myPage = html(first + " " + last, data.length);
        newUser = [data.length, first + " " + last, email, pass, myPage ];
        data.push(newUser);

        fs.writeFile(__dirname + "/" + "users.json", JSON.stringify(data), function (err) {
          if (err) return console.log(err);
          console.log(JSON.stringify(data));
          console.log('number of users: ' + data.length);
          console.log(data[data.length - 1][2] + " === " + email);
          res.send('2');
        });

      } else {
        console.log('email is registered before!');
        console.log('email: ' + email );
        res.send('1');
      }
    });
})


app.get('/logout', function (req, res) {
  res.sendFile(__dirname + '/client/login.html');
  console.log('logout file sent');
})



// SAVE
app.post('/save',jsonParser, function (req, res) {
  console.log('enter save mode');
  //var html = req.body.html;
  //console.log(html);

  // get tables
  var table1 = req.body.table1;
  var table2 = req.body.table2;
  var table3 = req.body.table3;
  var table4 = req.body.table4;
  //console.log(table1);
  //console.log(table2);
  //console.log(table3);
  //console.log(table4);

  // get user id 
  var id = req.body.USERID;
  console.log(id);
  if (id == undefined) {
      res.sendStatus(404);
  }

   fs.readFile(__dirname +  "/" + "users.json" , 'utf8', function (err, data) {
      data = JSON.parse(data);

      var newHtml = tables(table1,table2,table3,table4, data[id][1], id);
      data[id][4] = newHtml;

      // test
      //var htmlX = html(data[id][1], id);
      //data[id][4] = htmlX;

      fs.writeFile(__dirname + "/" + "users.json", JSON.stringify(data), function (err) {
      console.log('changes in json file saved');
      console.log('changes saved');
      //console.log(html);
      res.send('success');
      });
  });

});



function verifyEmail(email, data) {
  for(var i = 0; i < data.length; i++) {
    if (data[i][2] == email) return i;
  }
  return -1;
}

function verifyPass(pass, data) {
  for(var i = 0; i < data.length; i++) {
    if (data[i][3] == pass) return true;
  }
  return false;
}



function html(name, id) {

  var page =  '   <!DOCTYPE html>  '  + 
 '   <html>  '  + 
 '   <head>  '  + 
 '       <script src="jquery-2.2.3.js"></script>  '  + 
 '     '  + 
 '     '  + 
 '       <link rel="stylesheet" href="jquery-ui.css">  '  + 
 '       <script src="jquery-ui.js"></script>  '  + 
 '     '  + 
 '       <!-- // +++++++ sourcehttp://www.whoop.ee/posts/2013/04/05/the-resurrection-of-jquery-notify-bar.html +++++  -->  '  + 
 '       <script src="jQuery-Notify-bar-master/jquery.notifyBar.js"></script>  '  + 
 '       <link rel="stylesheet" href="jQuery-Notify-bar-master/css/jquery.notifyBar.css">  '  + 
 '     '  + 
 '       <link rel="stylesheet" href="bootstrap.min.css">  '  + 
 '       <script src="bootstrap.min.js"></script>  '  + 
 '       <link href="dashboard.css" rel="stylesheet">  '  + 
 '     '  + 
 '     '  + 
 '       <link rel="stylesheet" href="2DoList.css">  '  + 
 '       <script src="2DoList.js"></script>  '  + 
 '     '  + 
 '       <script src="jquery.tablesorter.js"></script>  '  + 
 '     '  + 
 '       <title>2DoList</title>  '  + 
 '     '  + 
 //'     <script>function mymessage() { alert("This message was triggered from the onunload event")}</script>'  + 
 '     '  + 
 '   </head>  '  + 
 '   <body style="background-image: url(images/apple_ios_snow_mountains-wallpaper-1920x1080.jpg)" onunload="mymessage()">  '  + 
 '     '  + 
 '   <nav class="navbar navbar-inverse navbar-fixed-top">  '  + 
 '         <div class="container-fluid">  '  + 
 '           <div class="navbar-header">  '  + 
 '             <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">  '  + 
 '               <span class="sr-only">Toggle navigation</span>  '  + 
 '               <span class="icon-bar"></span>  '  + 
 '               <span class="icon-bar"></span>  '  + 
 '               <span class="icon-bar"></span>  '  + 
 '             </button>  '  + 
 '             <a class="navbar-brand" href="#" style="font-size: 2em">To Do List</a>  '  + 
 '                     </div>  '  + 
 '           <div id="navbar" class="navbar-collapse collapse">  '  + 
 '             <ul class="nav navbar-nav navbar-right">  '  + 
 '                <li><a href="#" style="color:white" id="USERID" data-id="'+id+'"> Welcome, ' + name +'</a></li>' +
 '               <li><a href="#" id="allTasks2">All Tasks</a></li>  '  + 
 '               <li><a href="#" id="inProgress2">In Progress</a></li>  '  + 
 '               <li><a href="#" id="completed2">Completed</a></li>  '  + 
 '               <li><a href="#" id="archived2">Archived</a></li>  '  + 
 '            <li style="color:white; padding-top:0.5em; padding-right:0.5em; "><form action="/logout" method="GET"><button class="btn btn-default" type="submit">Logout</button></form></li>' + 
 '             </ul>  '  + 
 '           </div>  '  + 
 '           </div>  '  + 
 '           <div id="navbar" class="navbar-collapse collapse">  '  + 
 '             <ul class="nav navbar-nav navbar-right">  '  + 
 '             </ul>  '  + 
 '           </div>  '  + 
 '         </div>  '  + 
 '       </nav>  '  + 
 '     '  + 
 '     '  + 
 '       <!-- S I D E B A R -->  '  + 
 '     '  + 
 '     '  + 
 '   <div class="container-fluid">  '  + 
 '         <div class="row">  '  + 
 '           <div class="col-sm-3 col-md-2 sidebar">  '  + 
 '             <ul class="nav nav-sidebar">  '  + 
 '                 <li><a href="#" class="taskMenu" id="allTasks"> <b>All Tasks</b> <span class="badge" id="badge1">0</span>  </a></li>  '  + 
 '                 <li><a href="#" class="taskMenu" id="inProgress"> <b>In Progress</b> <span class="badge" id="badge2">0</span> </a></li>  '  + 
 '                 <li><a href="#" class="taskMenu" id="completed"> <b>Completed</b> <span class="badge" id="badge3">0</span>  </a></li>  '  + 
 '                 <li><a href="#" class="taskMenu" id="archived"> <b>Archived</b>  <span class="badge" id="badge4">0</span>  </a></li>  '  + 
 '             </ul>  '  + 
 '           </div>  '  + 
 '     '  + 
 '           <div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main" >  '  + 
 '           <table>  '  + 
 '                   <thead>  '  + 
 '                   <tr>  '  + 
 '                     <td><h1 class="page-header">All Tasks</h1>  '  + 
 '                     </td>  '  + 
 '                     <td>  '  + 
 '                     <div class="dropdown">  '  + 
 '                     <button type="button" data-toggle="dropdown" id="sortOptions">  '  + 
 '                       <span class="caret"></span></button>  '  + 
 '                       <ul class="dropdown-menu">  '  + 
 '                         <li class="dropdown-header">Actions</li>  '  + 
 '                         <li class="sortByName" ><p>Sort By Name</p></li>  '  + 
 '                         <li class="sortByDate" ><p>Sort By Date</p></li>  '  + 
 '                       </ul>  '  + 
 '                     </div>  '  + 
 '                     </td>  '  + 
 '     '  + 
 '                   </tr>  '  + 
 '                   </thead>  '  + 
 '               </table>  '  + 
 '     '  + 
 '           '  + 
 '     '  + 
 '                 <!-- allTasksList -->  '  + 
 '     '  + 
 '               <table class="table table-striped tablesorter" id="allTasksList">  '  + 
 '                   <thead>  '  + 
 '                   <tr>  '  + 
 '                     <th>Actions</th>  '  + 
 '                     <th class="byName">Task</th>  '  + 
 '                     <th>Description</th>  '  + 
 '                     <th class="byDate">Date</th>  '  + 
 '                     <th>Select <input type="checkbox" name="select-all" class="select-all"/> </th>  '  + 
 '                   </tr>  '  + 
 '                   </thead>  '  + 
 '                   <tbody id="allTasksListBody">  '  + 
 '                     '  + 
 '                   </tbody>  '  + 
 '               </table>  '  + 
 '     '  + 
 '     '  + 
 '                   <!-- inProgressTasksList -->  '  + 
 '     '  + 
 '               <table class="table table-striped" id="inProgressTasksList">  '  + 
 '                   <thead>  '  + 
 '                   <tr>  '  + 
 '                     <th>Actions</th>  '  + 
 '                     <th class="byName">Task</th>  '  + 
 '                     <th>Description</th>  '  + 
 '                     <th class="byDate">Date</th>  '  + 
 '                     <th>Select <input type="checkbox" name="select-all" class="select-all"/> </th>  '  + 
 '                   </tr>  '  + 
 '                   </thead>  '  + 
 '                   <tbody id="inProgressTasksListBody">  '  + 
 '                   </tbody>  '  + 
 '               </table>  '  + 
 '     '  + 
 '     '  + 
 '                    <!-- completedTasksList -->  '  + 
 '     '  + 
 '               <table class="table table-striped" id="completedTasksList">  '  + 
 '                   <thead>  '  + 
 '                   <tr>  '  + 
 '                     <th>Actions</th>  '  + 
 '                     <th class="byName">Task</th>  '  + 
 '                     <th>Description</th>  '  + 
 '                     <th class="byDate">Date</th>  '  + 
 '                     <th>Select <input type="checkbox" name="select-all" class="select-all"/> </th>  '  + 
 '                   </tr>  '  + 
 '                   </thead>  '  + 
 '                   <tbody id="completedTasksListBody">  '  + 
 '                   </tbody>  '  + 
 '               </table>  '  + 
 '     '  + 
 '                    <!-- archivedTasksList-->  '  + 
 '     '  + 
 '               <table class="table table-striped" id="archivedTasksList">  '  + 
 '                   <thead>  '  + 
 '                   <tr>  '  + 
 '                     <th>Actions</th>  '  + 
 '                     <th class="byName">Task</th>  '  + 
 '                     <th>Description</th>  '  + 
 '                     <th class="byDate">Date</th>  '  + 
 '                     <th>Select <input type="checkbox" name="select-all" class="select-all"/> </th>  '  + 
 '                   </tr>  '  + 
 '                   </thead>  '  + 
 '                   <tbody id="archivedTasksListBody">  '  + 
 '                   </tbody>  '  + 
 '               </table>  '  + 
 '     '  + 
 '     '  + 
 '     '  + 
 '               <br><a href="#" id="deletSelected"> Delete Selected</a>  '  + 
 '               <a href="#" id="cancelDeletSelected"> Cancel</a>  '  + 
 '     '  + 
 '     '  + 
 '     '  + 
 '     '  + 
 '     '  + 
 '     '  + 
 '                <!-- add task button and dialog -->  '  + 
 '     '  + 
 '     '  + 
 '     '  + 
 '     '  + 
 '     '  + 
 '     '  + 
 '     '  + 
 '     <!-- Trigger the modal with a button -->  '  + 
 '     <!-- Modal -->  '  + 
 '     <div class="modal fade" id="addTaskDialog" role="dialog">  '  + 
 '       <div class="modal-dialog">  '  + 
 '         '  + 
 '         <!-- Modal content-->  '  + 
 '         <div class="modal-content">  '  + 
 '           <div class="modal-header" style="padding:35px 50px; background-color: #87d3fb;" >  '  + 
 '             <button type="button" class="close" data-dismiss="modal"></button>  '  + 
 '             <h3>Add New Task</h3>  '  + 
 '           </div>  '  + 
 '           <div class="modal-body" style="padding:40px 50px;background-image: url(images/apple_ios_snow_mountains-wallpaper-1920x1080.jpg)">  '  + 
 '               <div class="form-group">  '  + 
 '                 <label for="Task">Task</label>  '  + 
 '               <input type="text" id="addTaskIN" placeholder="Whats on your list?" value="" class="form-control">  '  + 
 '               </div>  '  + 
 '               <div class="form-group">  '  + 
 '                 <label for="description">Description</label>  '  + 
 '               <input type="text" id="description" placeholder="Description" value="" class="form-control">  '  + 
 '               </div>  '  + 
 '                <div class="form-group">  '  + 
 '                 <label for="date">Due Data</label>  '  + 
 '               <input type="text" id="datepicker" class="datepicker form-control" placeholder="mm/dd/yyyy" value="">  '  + 
 '               </div>  '  + 
 '                 <button type="submit" id="submitTask" class="btn btn-success"><span class="glyphicon glyphicon-off"></span> Add Task</button>  '  + 
 '                 <button type="submit" id="cancelTask" class="btn btn-danger btn-default" data-dismiss="modal"><span class="glyphicon glyphicon-remove"></span> Cancel</button>  '  + 
 '     '  + 
 '           </div>  '  + 
 '         </div>  '  + 
 '           '  + 
 '       </div>  '  + 
 '     </div>  '  + 
 '     '  + 
 '     '  + 
 '     <div class="modal fade" id="editTaskDialog" role="dialog">  '  + 
 '       <div class="modal-dialog">  '  + 
 '         '  + 
 '         <!-- Modal content-->  '  + 
 '         <div class="modal-content">  '  + 
 '           <div class="modal-header" style="padding:35px 50px; background-color: #87d3fb;" >  '  + 
 '             <button type="button" class="close" data-dismiss="modal"></button>  '  + 
 '             <h3>Edit Task</h3>  '  + 
 '           </div>  '  + 
 '           <div class="modal-body" style="padding:40px 50px;background-image: url(images/apple_ios_snow_mountains-wallpaper-1920x1080.jpg)">  '  + 
 '     '  + 
 '               <div class="form-group">  '  + 
 '                 <label for="Task">Task</label>  '  + 
 '               <input type="text" id="editTaskIN" placeholder="Whats on your list?" value="" class="form-control">  '  + 
 '               </div>  '  + 
 '               <div class="form-group">  '  + 
 '                 <label for="description">Description</label>  '  + 
 '                 <input type="text" id="editDescription" placeholder="Description" value="" class="form-control">  '  + 
 '               </div>  '  + 
 '                <div class="form-group">  '  + 
 '                 <label for="date">Due Data</label>  '  + 
 '                 <input type="text" id="editDatepicker" class="datepicker form-control" placeholder="mm/dd/yyyy" value="">  '  + 
 '     '  + 
 '               </div>  '  + 
 '                 <button type="submit" id="editTask" class="btn btn-success"><span class="glyphicon glyphicon-off"></span>Done Editing</button>  '  + 
 '                 <button type="submit" id="cancelEdit" class="btn btn-danger btn-default" data-dismiss="modal"><span class="glyphicon glyphicon-remove"></span> Cancel</button>  '  + 
 '           </div>  '  + 
 '         </div>  '  + 
 '           '  + 
 '       </div>  '  + 
 '     </div>  '  + 
 '     '  + 
 '     '  + 
 '     '  + 
 '     '  + 
 '               <!-- Edit task dialog -->  '  + 
 '     '  + 
 '               <!-- add task button -->  '  + 
 '               <br><br><hr>  '  + 
 '                <button id="Mybtn" class="btn btn-default btn-lg"> Add New Task</button>  '  + 
 '                <button id="dummy" style="display: none;"></button>  '  + 
 //'                <form action="/save" method="POST" id="dummy"><input type="text" name="dummy" id="in1" value=""></input>  <input type="text" name="USERID" id="USERID" value="'+id+'"></input><input type="submit"  id="submitDummy"></input> </form>' + 
 '           </div>  '  + 
 '         </div>  '  + 
 '       </div>  '  + 
 '     '  + 
 '   </body>  '  + 
 '   </html>  '  + 
 '    ' ; 
    return page;
}




function tables(table1, table2, table3, table4, name, id) {

  var page =  '   <!DOCTYPE html>  '  + 
 '   <html>  '  + 
 '   <head>  '  + 
 '       <script src="jquery-2.2.3.js"></script>  '  + 
 '     '  + 
 '     '  + 
 '       <link rel="stylesheet" href="jquery-ui.css">  '  + 
 '       <script src="jquery-ui.js"></script>  '  + 
 '     '  + 
 '       <!-- // +++++++ sourcehttp://www.whoop.ee/posts/2013/04/05/the-resurrection-of-jquery-notify-bar.html +++++  -->  '  + 
 '       <script src="jQuery-Notify-bar-master/jquery.notifyBar.js"></script>  '  + 
 '       <link rel="stylesheet" href="jQuery-Notify-bar-master/css/jquery.notifyBar.css">  '  + 
 '     '  + 
 '       <link rel="stylesheet" href="bootstrap.min.css">  '  + 
 '       <script src="bootstrap.min.js"></script>  '  + 
 '       <link href="dashboard.css" rel="stylesheet">  '  + 
 '     '  + 
 '     '  + 
 '       <link rel="stylesheet" href="2DoList.css">  '  + 
 '       <script src="2DoList.js"></script>  '  + 
 '     '  + 
 '       <script src="jquery.tablesorter.js"></script>  '  + 
 '     '  + 
 '       <title>2DoList</title>  '  + 
 '     '  + 
 //'     <script>function mymessage() { alert("This message was triggered from the onunload event")}</script>'  + 
 '     '  + 
 '   </head>  '  + 
 '   <body style="background-image: url(images/apple_ios_snow_mountains-wallpaper-1920x1080.jpg)" onunload="mymessage()">  '  + 
 '     '  + 
 '   <nav class="navbar navbar-inverse navbar-fixed-top">  '  + 
 '         <div class="container-fluid">  '  + 
 '           <div class="navbar-header">  '  + 
 '             <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">  '  + 
 '               <span class="sr-only">Toggle navigation</span>  '  + 
 '               <span class="icon-bar"></span>  '  + 
 '               <span class="icon-bar"></span>  '  + 
 '               <span class="icon-bar"></span>  '  + 
 '             </button>  '  + 
 '             <a class="navbar-brand" href="#" style="font-size: 2em">To Do List</a>  '  + 
 '                     </div>  '  + 
 '           <div id="navbar" class="navbar-collapse collapse">  '  + 
 '             <ul class="nav navbar-nav navbar-right">  '  + 
 '                <li><a href="#" style="color:white" id="USERID" data-id="'+id+'"> Welcome, ' + name +'</a></li>' +
 '               <li><a href="#" id="allTasks2">All Tasks</a></li>  '  + 
 '               <li><a href="#" id="inProgress2">In Progress</a></li>  '  + 
 '               <li><a href="#" id="completed2">Completed</a></li>  '  + 
 '               <li><a href="#" id="archived2">Archived</a></li>  '  + 
 '            <li style="color:white; padding-top:0.5em; padding-right:0.5em; "><form action="/logout" method="GET"><button class="btn btn-default" type="submit">Logout</button></form></li>' + 
 '             </ul>  '  + 
 '           </div>  '  + 
 '           </div>  '  + 
 '           <div id="navbar" class="navbar-collapse collapse">  '  + 
 '             <ul class="nav navbar-nav navbar-right">  '  + 
 '             </ul>  '  + 
 '           </div>  '  + 
 '         </div>  '  + 
 '       </nav>  '  + 
 '     '  + 
 '     '  + 
 '       <!-- S I D E B A R -->  '  + 
 '     '  + 
 '     '  + 
 '   <div class="container-fluid">  '  + 
 '         <div class="row">  '  + 
 '           <div class="col-sm-3 col-md-2 sidebar">  '  + 
 '             <ul class="nav nav-sidebar">  '  + 
 '                 <li><a href="#" class="taskMenu" id="allTasks"> <b>All Tasks</b> <span class="badge" id="badge1">0</span>  </a></li>  '  + 
 '                 <li><a href="#" class="taskMenu" id="inProgress"> <b>In Progress</b> <span class="badge" id="badge2">0</span> </a></li>  '  + 
 '                 <li><a href="#" class="taskMenu" id="completed"> <b>Completed</b> <span class="badge" id="badge3">0</span>  </a></li>  '  + 
 '                 <li><a href="#" class="taskMenu" id="archived"> <b>Archived</b>  <span class="badge" id="badge4">0</span>  </a></li>  '  + 
 '             </ul>  '  + 
 '           </div>  '  + 
 '     '  + 
 '           <div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main" >  '  + 
 '           <table>  '  + 
 '                   <thead>  '  + 
 '                   <tr>  '  + 
 '                     <td><h1 class="page-header">All Tasks</h1>  '  + 
 '                     </td>  '  + 
 '                     <td>  '  + 
 '                     <div class="dropdown">  '  + 
 '                     <button type="button" data-toggle="dropdown" id="sortOptions">  '  + 
 '                       <span class="caret"></span></button>  '  + 
 '                       <ul class="dropdown-menu">  '  + 
 '                         <li class="dropdown-header">Actions</li>  '  + 
 '                         <li class="sortByName" ><p>Sort By Name</p></li>  '  + 
 '                         <li class="sortByDate" ><p>Sort By Date</p></li>  '  + 
 '                       </ul>  '  + 
 '                     </div>  '  + 
 '                     </td>  '  + 
 '     '  + 
 '                   </tr>  '  + 
 '                   </thead>  '  + 
 '               </table>  '  + 
 '     '  + 
 '           '  + 
 '     '  +                                         /// tables ////
 '                 <!-- allTasksList -->  '           + table1 + //
 '                   <!-- inProgressTasksList -->  '  + table2 + //
 '                    <!-- completedTasksList -->  '  + table3 + //
 '                    <!-- archivedTasksList-->  '    + table4 + //
 '               <br><a href="#" id="deletSelected"> Delete Selected</a>  '  + 
 '               <a href="#" id="cancelDeletSelected"> Cancel</a>  '  + 
 '                <!-- add task button and dialog -->  '  + 
 '     <!-- Trigger the modal with a button -->  '  + 
 '     <!-- Modal -->  '  + 
 '     <div class="modal fade" id="addTaskDialog" role="dialog">  '  + 
 '       <div class="modal-dialog">  '  + 
 '         '  + 
 '         <!-- Modal content-->  '  + 
 '         <div class="modal-content">  '  + 
 '           <div class="modal-header" style="padding:35px 50px; background-color: #87d3fb;" >  '  + 
 '             <button type="button" class="close" data-dismiss="modal"></button>  '  + 
 '             <h3>Add New Task</h3>  '  + 
 '           </div>  '  + 
 '           <div class="modal-body" style="padding:40px 50px;background-image: url(images/apple_ios_snow_mountains-wallpaper-1920x1080.jpg)">  '  + 
 '               <div class="form-group">  '  + 
 '                 <label for="Task">Task</label>  '  + 
 '               <input type="text" id="addTaskIN" placeholder="Whats on your list?" value="" class="form-control">  '  + 
 '               </div>  '  + 
 '               <div class="form-group">  '  + 
 '                 <label for="description">Description</label>  '  + 
 '               <input type="text" id="description" placeholder="Description" value="" class="form-control">  '  + 
 '               </div>  '  + 
 '                <div class="form-group">  '  + 
 '                 <label for="date">Due Data</label>  '  + 
 '               <input type="text" id="datepicker" class="datepicker form-control" placeholder="mm/dd/yyyy" value="">  '  + 
 '               </div>  '  + 
 '                 <button type="submit" id="submitTask" class="btn btn-success"><span class="glyphicon glyphicon-off"></span> Add Task</button>  '  + 
 '                 <button type="submit" id="cancelTask" class="btn btn-danger btn-default" data-dismiss="modal"><span class="glyphicon glyphicon-remove"></span> Cancel</button>  '  + 
 '     '  + 
 '           </div>  '  + 
 '         </div>  '  + 
 '           '  + 
 '       </div>  '  + 
 '     </div>  '  + 
 '     '  + 
 '     '  + 
 '     <div class="modal fade" id="editTaskDialog" role="dialog">  '  + 
 '       <div class="modal-dialog">  '  + 
 '         '  + 
 '         <!-- Modal content-->  '  + 
 '         <div class="modal-content">  '  + 
 '           <div class="modal-header" style="padding:35px 50px; background-color: #87d3fb;" >  '  + 
 '             <button type="button" class="close" data-dismiss="modal"></button>  '  + 
 '             <h3>Edit Task</h3>  '  + 
 '           </div>  '  + 
 '           <div class="modal-body" style="padding:40px 50px;background-image: url(images/apple_ios_snow_mountains-wallpaper-1920x1080.jpg)">  '  + 
 '     '  + 
 '               <div class="form-group">  '  + 
 '                 <label for="Task">Task</label>  '  + 
 '               <input type="text" id="editTaskIN" placeholder="Whats on your list?" value="" class="form-control">  '  + 
 '               </div>  '  + 
 '               <div class="form-group">  '  + 
 '                 <label for="description">Description</label>  '  + 
 '                 <input type="text" id="editDescription" placeholder="Description" value="" class="form-control">  '  + 
 '               </div>  '  + 
 '                <div class="form-group">  '  + 
 '                 <label for="date">Due Data</label>  '  + 
 '                 <input type="text" id="editDatepicker" class="datepicker form-control" placeholder="mm/dd/yyyy" value="">  '  + 
 '     '  + 
 '               </div>  '  + 
 '                 <button type="submit" id="editTask" class="btn btn-success"><span class="glyphicon glyphicon-off"></span>Done Editing</button>  '  + 
 '                 <button type="submit" id="cancelEdit" class="btn btn-danger btn-default" data-dismiss="modal"><span class="glyphicon glyphicon-remove"></span> Cancel</button>  '  + 
 '           </div>  '  + 
 '         </div>  '  + 
 '           '  + 
 '       </div>  '  + 
 '     </div>  '  + 
 '     '  + 
 '     '  + 
 '     '  + 
 '     '  + 
 '               <!-- Edit task dialog -->  '  + 
 '     '  + 
 '               <!-- add task button -->  '  + 
 '               <br><br><hr>  '  + 
 '                <button id="Mybtn" class="btn btn-default btn-lg"> Add New Task</button>  '  + 
 '                <button id="dummy" style="display: none;"></button>  '  + 
 '</div></div></div>' +
 //'       <script src="2DoList.js"></script>'  + 
 '</body></html>'; 
    return page;
}


app.get('*',function(req, res) {
    res.sendStatus(404);
})

var server = app.listen(3000, function () {
var host = server.address().address
var port = server.address().port
console.log("Example app listening at http://%s:%s", host, port) })
