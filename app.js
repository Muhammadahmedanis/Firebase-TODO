import {db, doc, collection, addDoc, getDocs, updateDoc, deleteDoc, getDoc, onSnapshot, serverTimestamp, query, orderBy, where} from './firebase.js' 

let loader = document.getElementById("loader");
let list = document.getElementById("list");

let addBtn = document.getElementById("addBtn");
let Add = async() => {
    let inp = document.getElementById("inp");
    const docRef = await addDoc(collection(db, "todos"), {
        todoList: inp.value,
        timestamp: serverTimestamp(),
        status: "pending",
    });
    inp.value = '';
    getData()
    loader.style.display = "none";
}

let getData = async() => {
        loader.style.display = "block"
        // const ref = query(collection(db, "todos"), orderBy('timestamp', 'desc'), where('status', '==', 'completed'));
        const ref = query(collection(db, "todos"), orderBy('timestamp', 'desc'));
        const unsubscribe = onSnapshot(ref, (querySnapshot) => {
        list.innerHTML = '';
        querySnapshot.forEach((doc) => {
            // console.log("time:",doc.data().timestamp.toDate().toString().slice(0, 15));
        list.innerHTML += `<li>${doc.data().todoList}  <button class="del" onclick="delFunc('${doc.id}')"><i class="fa-regular fa-trash-can"></i></button> <button class="upd" onclick = "updFunc('${doc.id}')"><i class="fa-regular fa-pen-to-square"></i></button> <span class='spanTodo'>${doc.data().timestamp.toDate().toString().slice(0,15)}</span> </li>`
        });
        // console.log("Current cities in CA: ", cities.join(", "));
        });
        // const querySnapshot = await getDocs(collection(db, "todos"));  
        // querySnapshot.forEach((doc) => {
        // list.innerHTML += `<li>${doc.data().todoList} <button class="del" onclick="delFunc('${doc.id}')"><i class="fa-regular fa-trash-can"></i></button> <button class="upd" onclick = "updFunc('${doc.id}')"><i class="fa-regular fa-pen-to-square"></i></button> </li>`
        // console.log(doc.id, " => ", doc.data());
    // });
}
await getData()
loader.style.display = "none";


// Delete Function
let delFunc = async(delId) => {
    loader.style.display = "block";
    list.innerHTML = '';
    await deleteDoc(doc(db, "todos", delId));
    console.log("Deleted");
    await getData()
    loader.style.display = "none";

}
window.delFunc = delFunc;


// Update Function
let updFunc = async(updId) => {
    loader.style.display = "block";
    list.innerHTML = '';
    const userListRef = doc(db, "todos", updId);
    const docSnap = await getDoc(userListRef);
    let prom = prompt("Enter new value", docSnap.data().todoList);
    await updateDoc(userListRef, {
        todoList: prom, 
    });
    await getData()
    loader.style.display = "none";
}
window.updFunc = updFunc;


if(addBtn){
    addBtn.addEventListener("click", Add)
}




