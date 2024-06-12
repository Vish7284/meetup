import { MongoClient } from "mongodb";

 async function handler(req,res){
    if(req.method === "POST"){
        const data = req.body;


        // const {image,title,address,description} = data;
       const client = await MongoClient.connect(
         "mongodb+srv://vishal:4eTKheKtErJmIBQd@cluster0.f8itl6g.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
       );
        const db= client.db();
        const meetupCollection = db.collection("meetups");
      const result =   await meetupCollection.insertOne(data);
      console.log(result);
      client.close();
      res.status(201).json({message:"MeetUp Inserted!"})
    }
};

export default handler;