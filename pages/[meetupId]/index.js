
import MeetDetail from "../../components/meetups/MeetDetail";
import { MongoClient,ObjectId } from "mongodb";
import Head from "next/head";
const MeetDetails = (props) => {
  return (
    <>
      <Head>
        <title>{props.meetUpData.title} MeetUps</title>
        <meta
          name="description"
          content="your meet up details "
        />
      </Head>
      <MeetDetail
        image={props.meetUpData.image}
        title={props.meetUpData.title}
        address={props.meetUpData.address}
        description={props.meetUpData.description}
      />
    </>
  );
};

export async function getStaticPaths(){
    const client = await MongoClient.connect(
      "mongodb+srv://vishal:S4iMKeQrV8vjqjnH@cluster0.f8itl6g.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    );
    const db = client.db();
    const meetupCollection = db.collection("meetups");
    const meetups = await meetupCollection.find({},{_id:1}).toArray();
    client.close();
    return {
        fallback :false,
        paths: meetups.map(meet => ({params:{meetupId:meet._id.toString()}})),
    }
}
export async function getStaticProps(context) {
    const meetupId = context.params.meetupId;
const client = await MongoClient.connect(
  "mongodb+srv://vishal:S4iMKeQrV8vjqjnH@cluster0.f8itl6g.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
);
    const db = client.db();
    const meetupCollection = db.collection("meetups");
    const selectedMeetUp = await meetupCollection.findOne({
      _id: new ObjectId(meetupId),
    });
    client.close();  return {
    props: {
        meetUpData :{
            id:selectedMeetUp._id.toString(),
            image:selectedMeetUp.image,
            address:selectedMeetUp.address,
            title:selectedMeetUp.title,
            description:selectedMeetUp.description,
        },
}
  };
}
export default MeetDetails;
