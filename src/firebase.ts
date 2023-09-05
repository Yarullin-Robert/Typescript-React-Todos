import {initializeApp} from "firebase/app";
import {getAnalytics} from "firebase/analytics";
import {getFirestore, collection, query, doc, addDoc, getDocs, deleteDoc, where, updateDoc} from "firebase/firestore";
import {getAuth, signInWithEmailAndPassword} from "firebase/auth";
import {setCookie} from "./hooks/hooks";
import {ITodo, IUser} from "./components/types/types";

const firebaseConfig = {
	apiKey: process.env["REACT_APP_FIREBASE_API_KEY"],
	authDomain: process.env["REACT_APP_FIREBASE_AUTH_DOMAIN"],
	projectId: process.env["REACT_APP_FIREBASE_PROJECT_ID"],
	storageBucket: process.env["REACT_APP_FIREBASE_STORAGE_BUCKET"],
	messagingSenderId: process.env["REACT_APP_FIREBASE_MESSAGING_SENDER_ID"],
	appId: process.env["REACT_APP_FIREBASE_APP_ID"],
	measurementId: process.env["REACT_APP_FIREBASE_MEASUREMENT_ID"]
};

const app = initializeApp(firebaseConfig);
const db = app && getFirestore(app)
const appCollection = db && collection(db, 'todos')
export const analytics = getAnalytics(app);

interface ISignInData {
	email: string
	password: string
}

export const appSignIn = async ({email, password}: ISignInData) => {
	const auth = getAuth()
	console.log(auth)
	let appUser: IUser = {
		email: '',
		id: '',
		token: ''
	}
	await signInWithEmailAndPassword(auth, email, password)
		.then(({user}) => {
			setCookie('email', email, {"max-age": 86400e3 * 10})
			setCookie('password', password, {"max-age": 86400e3 * 10})
			appUser = {
				email: user.email,
				id: user.uid,
				token: user.refreshToken
			}
		})
		.catch(console.error)
	return appUser
}
export const userCollection = (id: string) => collection(appCollection, id, 'todos')
export const getTodos = async (id: string) => {
	let fireTodos: ITodo[] = []
	const snapshot = await getDocs(userCollection(id))
	snapshot.forEach((doc) => {
		fireTodos.push({title: doc.data().title, completed: doc.data().completed, id: doc.id})
	})
	return fireTodos
}
export const deleteTodoFire = async (uId:string,id:string) => {
	const docRef = doc(userCollection(uId),id)
	await deleteDoc(docRef)
}
export const updateTodoFire = async (uId:string,id:string,data:{}) => {
	const docRef = doc(userCollection(uId),id)
	await updateDoc(docRef,data)
}
// export const getTodoByTitleFire = async (uId:string,title:string) => {
// 	const q = query(userCollection(uId),where('title','==',title))
// 	let data:ITodo
// 	const snapshot = await getDocs(q)
// }
// export const getTodoByIdFire = async (uId:string,id:string) => {
// 	const q = query(userCollection(uId),where('id','==',id))
// 	const data = await getDocs(q)
// 	const todo = data.docs
// }
export const addTodoFire = async (id: string, title: string) => {
	if (title.trim().length) {
		await addDoc(await userCollection(id), {
			title: title,
			completed: false
		})
	}
}
console.log(process.env)



