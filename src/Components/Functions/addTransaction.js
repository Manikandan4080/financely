import { addDoc, collection } from "firebase/firestore"
import { useAuthState } from "react-firebase-hooks/auth"
import { auth, db } from "../../firebase"
import { toast } from "react-toastify";



const addTransAction = async (transaction, user) => {
    try{
        const docRef = await addDoc(
            collection(db, `users/${user.uid}/transactions`),
            transaction
        );
        
        if(docRef){
            // toast.success("Done bro");
            return docRef;
        }
    }
    catch(error){
        toast.error("Somthing went wrong")
    }

}

export {addTransAction};