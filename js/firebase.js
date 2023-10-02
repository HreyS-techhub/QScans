import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.2/firebase-app.js";

const firebaseConfig = {
    apiKey: "AIzaSyDKSce8N-ioFXWgNAUz-dy7QG_eU52rM3o",
    authDomain: "qscans-website.firebaseapp.com",
    projectId: "qscans-website",
    storageBucket: "qscans-website.appspot.com",
    databaseURL: "https://qscans-website-default-rtdb.asia-southeast1.firebasedatabase.app/",
    messagingSenderId: "608895913283",
    appId: "1:608895913283:web:a54bfc2c28a06832c833f6",
    measurementId: "G-M2KJBDQX81"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

import {getDatabase,ref,set,get,child,update} from "https://www.gstatic.com/firebasejs/9.9.2/firebase-database.js";
const database=getDatabase();

export async function insertQueryData(name,email,message){
    await get(child(ref(database),'Registrations/NoOfQueries'))
    .then(async(data)=>{
        if(data.exists()){
            console.log(data.val());
            let key=data.val();

            await set(ref(database,'Queries/'+key),{
                Name: name,
                Email: email,
                Message: message
            })
            .then(async ()=>{
                const updates = {};
                updates['Registrations/NoOfQueries'] = key+1;
                await update(ref(database), updates);
            })
            .catch((error)=>{
                alert("An internal error occured.Check your connection and try again!\nError Details:"+error);
            });
        }else{
            console.log("Data doesn't exist");
        }
    })
    .catch((error)=>{
        alert("An internal error occured.Check your connection and try again!\nError Details:"+error);
    });
}

export async function insertAppointmentData(){
    await get(child(ref(database),'Registrations/NoOfAppointments'))
    .then(async (data)=>{
        if(data.exists()){
            console.log(data.val());
            let key=data.val();
            const fname = $("#a-fname").val();
            const lname = $("#a-lname").val();
            const address = $("#a-address").val();
            const city = $("#a-city").val();
            const number = $("#a-number").val();
            const email = $("#a-email").val();
            const gender = $('input[name="genderRadio"]:checked').val();
            const age = $("#a-age").val();
            const allergies = $("#a-allergy").val();
            var selectedServices = [];
            $('#checkbox-section input[type="checkbox"]:checked').each(function() {
              selectedServices.push($(this).val());
            });
            const services = selectedServices.join(', ');
            const message = $("#a-message").val();

            console.log(services);
            await set(ref(database,'Appointments/'+key),{
                FirstName: fname,
                LastName: lname,
                Address: address,
                City:city,
                MobileNo: number,
                Email: email,
                Gender: gender,
                Age: age,
                Allergies: allergies,
                ServicesRequired: services,
                Message: message
            })
            .then(async()=>{
                const updates = {};
                updates['Registrations/NoOfAppointments'] = key+1;
                await update(ref(database), updates);
            })
            .catch((error)=>{
                console.log("An internal error occured.Check your connection and try again!\nError Details:"+error);
            });
        }else{
            console.log("Data doesn't exist");
        }
    })
    .catch((error)=>{
        console.log("An internal error occured.Check your connection and try again!\nError Details:"+error);
    });
}