# To Do List Application - Backend

This is the backend API of my To Do List Application, built throughout the [Tech Returners](https://techreturners.com) Step Into Tech course. It is consumed by a frontend React application, available [here](https://github.com/alexandra257/todo-proj-2020) and connects to an RDS Database.

The hosted version of the application is available here: [https://alexandra257.github.io/todo-proj-2020/](https://alexandra257.github.io/todo-proj-2020/).

### Technology Used

This project uses the following technologies:

- Serverless Framework
- JavaScript (ES2015+)
- Express
- SQL
- MySQL Library
- AWS Lambda and API Gateway
- AWS RDS

### Database Schema

<img width="471" alt="Screenshot 2020-05-11 at 16 03 31" src="https://user-images.githubusercontent.com/51163638/82533707-ba591f00-9b3b-11ea-8541-783ee00e48ed.png">


### Endpoints

The API exposes the following endpoints:

---

##### GET /tasks

[https://oabkodhmw0.execute-api.eu-west-2.amazonaws.com/dev/tasks](https://oabkodhmw0.execute-api.eu-west-2.amazonaws.com/dev/tasks)

Responds with JSON containing all tasks in the Database.

---

##### POST /tasks

[https://oabkodhmw0.execute-api.eu-west-2.amazonaws.com/dev/tasks](https://oabkodhmw0.execute-api.eu-west-2.amazonaws.com/dev/tasks)

Will create a new task when sent a JSON in the correct format.

```json
{
      "description": "Buy groceries",
      "completed": "0",
      "user_id": "7096d2b7-e612-4b44-a9e2-8e29fc9bed69"
}
```
---

##### DELETE /tasks/:taskID

[https://oabkodhmw0.execute-api.eu-west-2.amazonaws.com/dev/tasks/:taskID](https://oabkodhmw0.execute-api.eu-west-2.amazonaws.com/dev/tasks/:taskID)

Deletes the task of the given ID.

---

##### PUT /tasks/:taskID

[https://oabkodhmw0.execute-api.eu-west-2.amazonaws.com/dev/tasks/:taskID](https://oabkodhmw0.execute-api.eu-west-2.amazonaws.com/dev/tasks/:taskID)

Will update a task when sent a JSON in the correct format.

```json
{
      "taskID" : "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
      "description": "Buy groceries",
      "completed": "0",
      "user_id": "7096d2b7-e612-4b44-a9e2-8e29fc9bed69"
}
```
