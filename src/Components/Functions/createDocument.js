import { doc, getDoc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { db } from "../../firebase";


const createDoc = async (user, fullName) => {

    if(!user) return;

    const useRef = doc(db, "users", user.uid);
    const userDoc = await getDoc(useRef);


    if(userDoc.exists()) return;


    const { displayName, email, photoURL } = user;
    const createdAt = new Date();
    const userData = {
        name : displayName ? displayName : fullName,
        email: email,
        photoURL: photoURL ? photoURL : "",
        createdAt: createdAt,
    }


    try {
        // const 
        await setDoc(useRef, userData);
    }
    catch (error) {
      toast.error(error.message)  
    }
}

export {createDoc}