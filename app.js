import {db, doc, collection, addDoc, getDocs, updateDoc, deleteDoc, getDoc} from './firebase.js' 

let loader = document.getElementById("loader");
let list = document.getElementById("list");

let addBtn = document.getElementById("addBtn");
let Add = async() => {
    list.innerHTML = '';
    let inp = document.getElementById("inp");
    const docRef = await addDoc(collection(db, "todos"), {
        todoList: inp.value,
    });
    inp.value = '';
    await getData()
    loader.style.display = "none";
}

let getData = async() => {
        loader.style.display = "block"
        const querySnapshot = await getDocs(collection(db, "todos"));  
        querySnapshot.forEach((doc) => {
        list.innerHTML += `<li>${doc.data().todoList} <button class="del" onclick="delFunc('${doc.id}')"><i class="fa-regular fa-trash-can"></i></button> <button class="upd" onclick = "updFunc('${doc.id}')"><i class="fa-regular fa-pen-to-square"></i></button> </li>`
        console.log(doc.id, " => ", doc.data());
    });
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