const Habit = require('../model/habit');

// This will return current date
function getTodyDate() {
    let date = new Date();
    let today = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let fullDate = today + "/" + month + "/" + year;
    return fullDate;
}

// This function will create the new habit of the particular user
module.exports.createHabit = async function (req, res) {
    try {
        let habit = await Habit.findOne({
            content: req.body.habit,
            userRef: req.user._id
        });

        if (habit) {
            req.flash('error', 'Habit Exist!');
            return res.redirect('/');
        }
        habit = await Habit.create({
            content: req.body.habit,
            userRef: req.user._id,
            dates: {
                date: getTodyDate(),
                completed: 'none'
            }
        });

        req.flash('success', 'New Habit created');
        return res.redirect('/');
    }
    catch (err) {
        console.log(`Error in habit creation ${err}`);
    }
}

// Status update for the habit, and the particular date also.
module.exports.toggleStatus = async function (req, res) {
    let message;
    try {
        const habit = await Habit.findById(req.query.id);

        // if habit is not present then return,
        if (!habit) {
            console.log("Habit is not present");
            return res.redirect('/');
        }

        let dates = habit.dates;
        let found = false;
        
        // changes the complete argument accodingly.
        dates.find((item) => {
            if (item.date == req.query.date) {
                if (item.complete === 'yes') {
                    item.complete = 'no';
                    message = 'changed from done to undone'
                }
                else if (item.complete === 'no') {
                    item.complete = 'none';
                    message = 'Not done not mark'
                }
                else if (item.complete === 'none') {
                    item.complete = 'yes';
                    message = "You have completed your task"
                }
                found = true;
            }
        });
        req.flash('success', message);
        if (!found) {
            dates.push({ date: req.query.date, complete: 'yes' });
        }

        habit.dates = dates;
        habit.save();
        return res.redirect('/');
    }
    catch (err) {
        console.log("Error in toggling Status of the habit, " + err);
        return res.redirect('/');
    }
}


// Toggle Favourites
module.exports.toggleFavourite = async function (req, res) {
    let message;
    try {
        let habit = await Habit.findById(req.query.id);

        // if habit is not present,
        if (!habit) {
            console.log("Habit is not present");
            return res.redirect('/');
        }

        // if habit is presnet , then we have to toogle its favourite.
        let favourite = habit.favorite;
        if (favourite == true) {
            message = "Habit removed from favourites"
            favourite = false;
        }
        else {
            message = "Habit added to favourites"
            favourite = true;
        }

        req.flash('success', message);
        habit.favorite = favourite;

        await habit.save();
        return res.redirect('/');
    }
    catch (err) {
        console.log(`Error in favourites toggleing ${err}`);
        return res.redirect('/');
    }
}

// This will delete the habit 
module.exports.removeHabit = async function (req, res) {
    try {
        req.flash('success', 'Deleted habit successfully!');
        const id = req.query.id;
        const userId = req.user._id;

        await Habit.deleteOne({
            _id: {
                $in: [id]
            },
            userRef: userId
        });
        return res.redirect('/');
    }
    catch (err) {
        console.log(`Error in deleting record(s)! ${err}`);
        return res.redirect('/');
    }
}