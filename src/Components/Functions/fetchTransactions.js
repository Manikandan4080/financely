import { collection, getDocs, query } from "firebase/firestore"
import { db } from "../../firebase"


const fetchTransactions = async (user) => {
    if(user){
        const q = query(collection(db, `users/${user.uid}/transactions`));
        const querySnap = await getDocs(q);

        let transactionsArray = [];
        querySnap.forEach((doc) => {
            transactionsArray.push(doc.data());
        });
        return transactionsArray;
    }
}

export {fetchTransactions};