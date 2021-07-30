## NorthOne Take Home Challenge

# Objective:
```
Build a To Do List-type web application or API that meets the challenge requirements
```
I decided to build a REST API service with Node.js, Express and MongoDB.

# Installation and Running the app

```
1. Install Dependencies

npm install

2. Start the server

npm start

```

# MongoDb Model
```
TABLE "todos" (
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "due" TEXT NOT NULL,
);
```

# Testing the REST API controller
```
I also thought of adding a unit test for all routes using mocha and chai but because of time restrictions, I decided not to add this time but certainly I will add that in the future.

```

# Testing the REST API

```

Used Postman and curl requests to test API endpoints

example curl
```
curl -X GET http://127.0.0.1:3000/todos
```

# Endpoints Available

Create a TODO item (POST)

```
endpoint: /todos

body {
    title: string,
    description: string,
    status: string,
    due: string
}

returns full item with unique id and timestamps
```

Get all todo items (GET)

```
endpoint: /todos

returns all tasks as an array
```

Get specific todo item  (GET)

```
endpoint: /todos/{itemId}

returns item
```

Update todo item (PUT)

```
endpoint: /todos/{itemId}

body: {
    title: string,
    description: string,
    status: ["pending", "In progress", "Done"],
    due: string
}

returns the updated item
```

Delete an item (DELETE)

```
endpoint: /todos/{itemId}

return message as confirmation
```

