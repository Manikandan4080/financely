import { signInWithPopup } from "firebase/auth";
import { toast } from "react-toastify";
import { auth, provider } from "../../firebase";
import { createDoc } from "./createDocument";


const authWithGoogle = async () => {
    try {
        const userCredentials = await signInWithPopup(auth, provider);
        const user = userCredentials.user;
        console.log(user);
        await createDoc(user);
        
        return user;

    } 
    catch (error) {
      toast.error(error.messaage);
      
    }
}

export {authWithGoogle};