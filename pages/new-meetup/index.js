import NewMeetupForm from "../../components/meetups/NewMeetupForm"
import { useRouter } from "next/router";
import Head from "next/head";
const NewMeetUp =()=>{
    const router = useRouter();
    const addingMeetup =async(meetUpdata)=>{
        const response = await fetch("/api/new-meetup",{
            method:"POST",
            body:JSON.stringify(meetUpdata),
            headers:{
                "Content-Type":"application/json",
            }
        });
        const data = await response.json();
        console.log(data);

        router.push("/");

    }
    return (
      <>
        <Head>
          <title>Add Your MeetUps</title>
          <meta
            name="description"
            content="Add your mmetups to get the lifeLessons form the krishna how he delt with all."
          />
        </Head>
        <NewMeetupForm onAddMeetup={addingMeetup} />;
      </>
    ); 
};
export default NewMeetUp;