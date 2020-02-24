'use strict';

const serverless = require('serverless-http');
const express = require('express');
const app = express();


app.get('/tasks', function (req, res) {
  res.json({
    tasks: {
      taskList: [
        {
          id: '1',
          description: 'Learn serverless!',
          completed: false,
        },
        {
          id: '2',
          description: 'Understand APIs',
          completed: false,
        },
        {
          id: '3',
          description: 'Meditate',
          completed: false,
        },
        {
          id: '4',
          description: 'Order a pizza',
          completed: false,
        },
      ]
    }
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
