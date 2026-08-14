const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
app.use(express.static("frontend"));

app.use(express.json());

var users = [
    {
        "id" : 1,
        "name" : "Aiden",
        "gender" : "male",
        "image" : "https://randomuser.me/api/portraits/med/men/8.jpg",
    },
    {
        "id" : 2,
        "name" : "Cecile",
        "gender" : "female",
        "image" : "https://randomuser.me/api/portraits/med/women/63.jpg",
    },
    {
        "id" : 3,
        "name" : "Dev",
        "gender" : "male",
        "image" : "https://randomuser.me/api/portraits/med/men/89.jpg",
    },
    {
        "id" : 4,
        "name" : "Elisa",
        "gender" : "female",
        "image" : "https://randomuser.me/api/portraits/med/women/13.jpg",
    },
    {
        "id" : 5,
        "name" : "Marie",
        "gender" : "female",
        "image" : "https://randomuser.me/api/portraits/med/women/7.jpg",
    },
    {
        "id" : 6,
        "name" : "Mackenzie",
        "gender" : "female",
        "image" : "https://randomuser.me/api/portraits/med/women/73.jpg",
    },
    {
        "id" : 7,
        "name" : "Alice",
        "gender" : "female",
        "image" : "https://randomuser.me/api/portraits/med/women/83.jpg",
    },
    {
        "id" : 8,
        "name" : "Dean",
        "gender" : "male",
        "image" : "https://randomuser.me/api/portraits/med/men/10.jpg",
    },
    {
        "id" : 9,
        "name" : "Bianor",
        "gender" : "male",
        "image" : "https://randomuser.me/api/portraits/med/men/94.jpg",
    },
    {
        "id" : 10,
        "name" : "Gordana",
        "gender" : "female",
        "image" : "https://randomuser.me/api/portraits/women/74.jpg",
    },
]

var nextId =11;

function findIndex(id){
    for(var i = 0;i<users.length;i++){
        if(id === users[i].id){
            return i;
        }
    }
    return -1;
}

app.get("/api/users", function(req, res){
    return res.json(users);
})

app.get("/api/users/:id", function(req, res){
    var id = Number(req.params.id);
    var index = findIndex(id);

    if(index === -1){
        res.status(404).json({"message": "User not found with id :"+id});
    }
    var user = users[index];
    return res.json(user);
})

app.get("/api/random-user",function(req, res){
    if(users.length ==0){
        return res.status(404).json({"message" : "No user found"});
    }
    var randomIndex = Math.floor(users.length * Math.random());
    return res.json(users[randomIndex]);

})

app.post("/api/users", function(req,res){
    var newUser = req.body;
    var tempUser = {
        "id" : nextId,
        "name" : newUser.name,
        "gender" : newUser.gender,
        "image" : newUser.image
    };
    nextId = nextId +1;
    users.push(tempUser);
    return res.status(201).json({"message": "user created successfully",
        "user":tempUser
    });
})


































app.listen(port, function(){
    console.log("Server running on http://localhost:" + port);
});