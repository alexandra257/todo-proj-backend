'use strict';

const serverless = require('serverless-http');
const express = require('express');
const app = express();
app.use(express.json()); //takes JSON from the client & converts it to a JS object
const uuidv4 = require('uuid/v4');
const mysql = require('mysql');
const cors = require('cors');
app.use(cors());


const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_SCHEMA
});

app.get('/tasks', function (req, res) {

  connection.query('SELECT * FROM `task` WHERE `user_id` = "7096d2b7-e612-4b44-a9e2-8e29fc9bed69"', function (error, results, fields) {
    // error will be an Error if one occurred during the query
    if (error) {
      console.log("Your query had a problem with fetching the tasks", error);
      res.status(500).json({ errorMessage: error });
    }
    else {
      //Query worked!
      res.json({ tasks: results })
    }
    // results will contain the results of the query
    // fields will contain information about the returned results fields (if any)
  });
});

//creating tasks
app.post('/tasks', function (req, res) {

  //Accept information from the client
  //about what task if being created

  const taskToInsert = req.body;
  taskToInsert.taskID = uuidv4();

  taskToInsert.user_id = "7096d2b7-e612-4b44-a9e2-8e29fc9bed69";
  taskToInsert.completed = 0;

  //Take that information and pre-poulate a SQL INSERT statement
  ///Execute the statement
  connection.query('INSERT INTO `task` SET ?', taskToInsert, function (error, results, fields) {
    if (error) {
      console.log("Your query had a problem with inserting a new task", error);
      res.status(500).json({ errorMessage: error });
    }
    else {
      //Return to the client information about the task that has been created
      res.json({
        task: taskToInsert
      });
    }
    // results will contain the results of the query
    // fields will contain information about the returned results fields (if any)
  });
});



app.put('/tasks/:taskID', function (req, res) {
  const taskUpdated = req.params;
  // "This PUT edits / creates a new task if the ID doesn't exist"	  // set completed to 1 where id = id
  connection.query('UPDATE `task` SET `completed` = ? WHERE `taskID` = ?', [true, taskUpdated.taskId],
    function (error, results, fields) {
      if (error) {
        console.error('Could not mark tasks as updated', error);
        res.status(500).json({ errorMessage: error });
      } else {
        res.json({ task: taskUpdated });
        console.log(taskUpdated.completed);
      }
    }
  );
});


// Updating tasks
// app.put('/tasks/:taskID', function (req, res) {
//   res.json({
//     message: 'Your PUT works',
//   });
// });


//Deleting tasks
app.delete('/tasks/:taskID', function (req, res) {
  const taskId = req.params.taskID;

  connection.query('DELETE FROM `task` WHERE `taskID` = ?', taskId, function (error, results, fields) {
    // error will be an Error if one occurred during the query
    if (error) {
      console.log("Your query had a problem with DELETING the task", error);
      res.status(500).json({ errorMessage: error });
    }
    else {
      //Query worked!
      res.json({
        tasks: results
      });
    }
    // results will contain the results of the query
    // fields will contain information about the returned results fields (if any)
  });
});



module.exports.tasks = serverless(app);







// module.exports.tasks = async event => {
//   return {
//     statusCode: 200,
//     body: JSON.stringify(
//       {
//         message: 'Your API works',
//       },
//       null,
//       2
//     ),
//   };


  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
// };
