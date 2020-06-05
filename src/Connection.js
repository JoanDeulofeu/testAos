const {MongoClient} = require('mongodb');

async function listDatabases(client){
    const databasesList = await client.db().admin().listDatabases();
 
    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};

async function createListing(client, newUser){
    const found = await client.db("testAos").collection("userList")
        .findOne({ login: newUser.login });

    if (found) {
        console.log('Login is already used')
    } else {
        const result = await client.db("testAos").collection("userList").insertOne(newUser);
        console.log(`New listing created with the following id: ${result.insertedId}`);
    }
}

async function findOneListingByLogin(client, loginOfListing) {
    const result = await client.db("testAos").collection("userList")
        .findOne({ login: loginOfListing });

    if (result) {
        console.log(`Found a listing in the collection with the name '${loginOfListing}':`);
        console.log(result);
    } else {
        console.log(`No listings found with the name '${loginOfListing}'`);
    }
}

async function main() {
    const uri = "mongodb+srv://user1:userpwd1@cluster0-d2hvv.mongodb.net/<dbname>?retryWrites=true&w=majority"

    const client = new MongoClient(uri, { useUnifiedTopology: true });

    const newUser = {
        login: "Joan",
        password: "1234"
    }

    try {
        // Connect to the MongoDB cluster
        await client.connect();
 
        // Make the appropriate DB calls
        await  listDatabases(client);

        //Add user to database
        //await createListing(client, newUser);
        //await findOneListingByLogin(client, newUser.login);
 
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

main().catch(console.error);

export default main;