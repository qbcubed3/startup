const { MongoClient } = require('mongodb');

const bcrypt = require('bcrypt');
const config = require('./dbConfig.json');
const jwt = require('jsonwebtoken');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('startup');

const users = db.collection('users');
const scores = db.collection('scores');
const items = db.collection('items');
const auths = db.collection('auths');

(async function testConnection() {
    await client.connect();
    await db.command({ping: 1});
})().catch((ex) => {
    console.log(`Unable to connect to database because ${ex.message}`);
    process.exit(1);
});

async function addUser(username, password){
    const salt = 5;
    const hashedPass = await bcrypt.hash(password, salt);
    const result = await users.insertOne({username: username, password: hashedPass});
    return newAuth(username)
}

async function newAuth(user){
    const key = "myKey";
    const token = jwt.sign(user, key);
    await auths.insertOne({username: user, authToken: token});
    return token;
}

async function checkAuth(user, auth){
    const result = await auths.findOne({authToken: auth}, (err, result) =>{
        if (err) {
            return false;
        }
        if (result){
            return result.username;
        }
    });
}

async function checkUser(username){
    const user = await users.findOne({username});
    console.log('user ' + user);
    if (user === null){
        return false;
    }
    else{
        return true;
    }
}

async function checkPass(username, password){
    try{
        const user = await users.findOne({username});
        const hashedPass = user.password;
        const same = await bcrypt.compare(password, hashedPass);
        if (same){
            return true;
        }
        return false;
    }
    catch (error){
        console.log("trouble inserting into the database " + error.message);
    }
}

async function addScores(username, scores){
    try{
        const curDate = new Date();
        const result = await scores.insertOne({
            username: username,
            date: curDate,
            scores: scores
        })
    }
    catch (error){
        console.log("trouble inserting into the database")
    }
}

async function getItems(user){
    const result = await items.findOne({user});
    if (result == null){
        const result2 = await items.insertOne(
            {username: user, items: [
                "Morning meditation",
                "Worked out",
                "Ate Breakfast",
                "Talked to a Friend",
                "Learned something new",
                "Took a walk",
                "Listened to music",
                "Did a Hobby",
                "Read a book",
                "Wrote in a journal",
                "Ate lunch",
                "Took Breaks from Work",
                "Disconnect from technology for a bit",
                "Had coffee/tea",
                "Did something creative",
                "Help someone in need",
                "Planned for future goals",
                "Laughed or watched something funny",
                "Attend a social event",
                "Ate Dinner",
                "Had restful sleep",
                "Unplugged before bedtime"
            ]}
        ); 
        return result2.items;
    }
    else{
        return result.items;
    }
}

async function addItem(item, user){
    const result = await items.findOne({user});
    const items = result.items;
    let index = items.indexOf(item);
    if (index !== -1){
        items.splice(index, 1);
    }
    const filter = { username: user };

        // Specify the update operation (e.g., set new values)
    const updateDoc = {
        $set: {
            items: items,
        }
    };

    // Update the document matching the filter
    const result2 = await collection.updateOne(filter, updateDoc);

}
module.exports = {addScores, checkPass, checkUser, addUser, getItems, addItem};