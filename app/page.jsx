
import Reduxprovider from "@/Redux-provider";
import UserInfo from "./components/UserInfo";



export default function Home() {
  return (
    <main >
      <Reduxprovider>
  
     <UserInfo/>
    
     </Reduxprovider>
     
    </main>
  );
}
