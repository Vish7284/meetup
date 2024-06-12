import { MongoClient } from "mongodb";
import Head from "next/head";
import MeetupList from "../components/meetups/MeetupList";

const HomePage = (props) => {
  // const [loadesMeet , setLoadedMeet] = useState([])
  //     useEffect(()=>{
  //         setLoadedMeet(DummyMeetup)
  //     },[])

  return (
    <>
    <Head>
        <title>React MeetUps</title>
        <meta name="description" content="Browse a list of the RadheKrishna meets of the last time"/>
    </Head>
      <MeetupList meetups={props.meetups} />
    </>
  );
};

// export async function getServerSideProps(context) {

//     const req = context.req;
//     const res = context.res;
//   return {
//     props: {
//       meetups: DummyMeetup,
//     },
//   };
// }
export async function getStaticProps() {
  const client = await MongoClient.connect(
    "mongodb+srv://vishal:S4iMKeQrV8vjqjnH@cluster0.f8itl6g.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  );
  const db = client.db();
  const meetupCollection = db.collection("meetups");
const meetups = await meetupCollection.find().toArray();

client.close()
  return {
    props: {
      meetups: meetups.map(meet=> ({
        id : meet._id.toString(),
        title:meet.title,
        address:meet.address,
        description:meet.description,
        image:meet.image,
      })),
    },
    revalidate: 1,
  };
}

export default HomePage;
