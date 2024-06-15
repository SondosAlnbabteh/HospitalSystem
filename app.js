const mainDiv = document.getElementById("mainDiv");

document.getElementById('submitButton').addEventListener('click', submitForm);

function submitForm(event) {

    event.preventDefault();

    const card_name = document.getElementById('full-name').value;
    const password = document.getElementById('password').value;
    const card_Date = document.getElementById('date').value;
    const card_Gender = document.getElementById('gender').value;
    const card_Phone = document.getElementById('phone-number').value;
    const card_Diseases = document.getElementById('chronic-diseases').value;
    const card_email = document.getElementById('email').value;


   

    /***************regex**************** */
    const usernameRegex = /^\S+$/;
    if (!usernameRegex.test(card_name)) {
        document.getElementById("fullName").style.display = "inline";
        const spaceMass = document.getElementById("fullName");
        spaceMass.innerHTML ="Full Name should not contain spaces.";
        
        return;
    }else
    {
        document.getElementById("fullName").style.display = "none";
    }

    
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+[{\]};:'",/?]).{8,}$/;

    if (!passwordRegex.test(password)) {

        document.getElementById("pass").style.display = "inline";
        const passMass = document.getElementById("pass");
        passMass.innerHTML ="Password must be more than 8 characters, with at least 1 number, 1 uppercase letter, and 1 special character.";

        return; // إيقاف تقديم النموذج إذا كانت كلمة المرور لا تطابق الشروط
  
    }else
    {
        document.getElementById("pass").style.display = "none";
    }

    const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    if (!emailRegex.test(card_email)) {

        document.getElementById("emailVali").style.display = "inline";
        const emailMass = document.getElementById("emailVali");
        emailMass.innerHTML ="Unable to validate email";

        return; // إيقاف تقديم النموذج إذا كانت كلمة المرور لا تطابق الشروط
  
    }else
    {
        document.getElementById("emailVali").style.display = "none";
    }

    const phoneRegex =/^(07)\d{8,9}$/;
    
    if (!phoneRegex.test(card_Phone)) {

        document.getElementById("phoneVali").style.display = "inline";
        const phoneMass = document.getElementById("phoneVali");
        phoneMass.innerHTML ="Check that the phone number have 10 digits starts with 07";

        return; // إيقاف تقديم النموذج إذا كانت كلمة المرور لا تطابق الشروط
  
    }else
    {
        document.getElementById("phoneVali").style.display = "none";
    }
    /******************************************** */

   
    
  
    let patients = JSON.parse(localStorage.getItem('patients')) || [];
    
/********************User exists******************* */
   
    let userExists = false;
    patients.map(patient => {
        if (patient.card_email === card_email) {
            userExists = true;
        }
    });
    
    if (userExists) {
        alert("User already exists.");
        return; 
    }

    
/********************************************* */

    var newPerson = new CreatObj(card_name, password, card_Date, card_Gender, card_Phone, card_Diseases, card_email);
    
    patients.push(newPerson);

    
    localStorage.setItem('patients', JSON.stringify(patients));
    
    alert("Added successfully.");
    renderCards();
    
  
  
}

function CreatObj(card_name, password, card_Date, card_Gender, card_Phone, card_Diseases, card_email) {
  
    this.card_name = card_name;

    this.password = password;

    this.card_Date = card_Date;

    this.card_Gender = card_Gender;

    this.card_Phone = card_Phone;

    this.card_Diseases = card_Diseases;

    this.card_email = card_email;

}

function renderCards() {
    
    mainDiv.innerHTML = '';

   
    const patients = JSON.parse(localStorage.getItem('patients'));

    if (patients && patients.length > 0) {

        patients.forEach(patient => {

            const div1 = document.createElement("div");
            div1.setAttribute("class", "col patient-card");
            mainDiv.appendChild(div1);

            const div2 = document.createElement("div");
            div2.setAttribute("class", "card ");
            div1.appendChild(div2);

            const image = document.createElement("img");
            image.setAttribute("class", "card-img-top");
            image.setAttribute("alt", "image Patient ");

        if(patient.card_Gender == "Female"){
            image.src = "patient.webp";

        }else{

            image.src = "patientMale.webp";

        }
            div2.appendChild(image);

            const div3 = document.createElement("div");
            div3.setAttribute("class", "card-body");
            div2.appendChild(div3);

            const h1card = document.createElement("h1");
            h1card.setAttribute("class", "card-title");
            h1card.innerHTML = "<span class='title'>Full Name:  </span>" + patient.card_name;
            div3.appendChild(h1card);

            const h4Date = document.createElement("h4");
            h4Date.setAttribute("class", "card-text");
            h4Date.innerHTML = "<span class='title'>Date:  </span>" + patient.card_Date;
            div3.appendChild(h4Date);

            const Gender = document.createElement("h4");
            Gender.setAttribute("class", "card-text");
            Gender.innerHTML = "<span class='title'>Gender:  </span>" + patient.card_Gender;
            div3.appendChild(Gender);

            const Phone = document.createElement("h4");
            Phone.setAttribute("class", "card-text");
            Phone.innerHTML = "<span class='title'>Phone:  </span>" + patient.card_Phone;
            div3.appendChild(Phone);

            const Diseases = document.createElement("h4");
            Diseases.setAttribute("class", "card-text");
            Diseases.innerHTML = "<span class='title'>Diseases:  </span>" + patient.card_Diseases;
            div3.appendChild(Diseases);

            const email = document.createElement("h4");
            email.setAttribute("class", "card-text");
            email.innerHTML = "<span class='title'>Email:  </span>" + patient.card_email;
            div3.appendChild(email);

          
    
            // Create delete button
            const deleteBtn = document.createElement("button");
            deleteBtn.setAttribute("class", "btn btn-danger mt-3");
            deleteBtn.textContent = "Delete";
            deleteBtn.addEventListener("click", function() {
                // Remove the patient from localStorage and re-render the cards
                const updatedPatients = patients.filter(p => p.card_email !== patient.card_email);
                localStorage.setItem("patients", JSON.stringify(updatedPatients));
                renderCards();
            });
            div3.appendChild(deleteBtn);
            
        });

        
    } 
}

// عرض المرضى عند تحميل الصفحة
renderCards();
