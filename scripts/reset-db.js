const { MongoClient } = require('mongodb')

//Vagrant forwards to port 27107
const url = 'mongodb://localhost:27017';
const dbName = 'my_gatsby_db'; //Testing DB

async function main(){
    const client = new MongoClient(url);

    try{
        console.log("Connecting to Vagrant MongoDB...")
        await client.connect();
        const db = client.db(dbName);

        // Drop Phase 
        console.log(`Dropping database: ${dbName}...`)
        await db.dropDatabase();

        //Create or seed phase like in JPA create
        console.log("Seeding fresh development data....")

        // seeding products collection for testing
        await db.collection('products').insertMany([
            { 
                name: "Gatsby Premium Theme", 
                price: 49.99, 
                description: "A gorgeous, blazing-fast blog theme." 
            },
            { 
                name: "Jamstack Sticker Pack", 
                price: 4.99, 
                description: "Decorate your laptop with static-site pride." 
            }
        ]);

        console.log("Database reset and seeded successfully! 🌱" );
    } catch(err){
        console.log("Error resetting database:", err.message);
    }finally {
        await client.close();
    }
}
main();