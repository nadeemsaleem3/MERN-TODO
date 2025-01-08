const router = require("express").Router();
const User = require("../models/user");
const List = require("../models/list");
const list = require("../models/list");

// CREATE
router.post("/addTask", async (req, res) => {
   try {
    const { title, body, id } = req.body;  // Destructure the necessary fields from the request body
    const existingUser = await User.findById(id);  // Find the user by their ID
    if (existingUser) {
        // If user exists, create a new list item
        const list = new List({ title, body, user: existingUser });
        await list.save().then(() => res.status(200).json({ list }));
        
        // Add the new list item to the user's list array and save the user
        existingUser.list.push(list);
        await existingUser.save();  // Ensure the user is saved with the updated list
    } else {
        res.status(404).json({ error: "User not found" });
    }
   } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
   }
});

// UPDATE
router.put("/updateTask/:id", async (req, res) => {
    try {
      const { title, body } = req.body;
      const list = await List.findByIdAndUpdate(req.params.id, { title, body });
      list.save().then(() => res.status(200).json({ message: "Task Updated" }));
    } catch (error) {
      console.log(error);
    }
  });

 // DELETE
 router.delete("/deleteTask/:id", async (req, res) => {
   try {
       const {id} = req.body;
       const existingUser = await User.findByIdAndUpdate(id, {$pull: {list: req.params.id}});
       if (existingUser) {
        await List.findByIdAndDelete(req.params.id).then(()=> {
            res.status(200).json({message: "Task Deleted."})
        });
       }
   } catch (error) {
       console.log(error);
       return res.status(500).json({ message: "Server Error" });
   }
});

 // GET TASKS
 router.get("/getTasks/:id", async (req, res) => {
    const list = await List.find({user : req.params.id}).sort({createdAt: -1});
    if (list.length !== 0) {
        res.status(200).json({list});
    }
    else {
        res.status(200).json({message : "No Tasks"});
    }
 });

module.exports = router;