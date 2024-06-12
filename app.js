const mainDiv = document.getElementById("mainDiv");
card();
function card(){

    const cartItems = JSON.parse(localStorage.getItem("arr"));

    if(cartItems && cartItems.length > 0){
        
    
    const div1 = document.createElement("div");
    div1.setAttribute("class" , "col");
    mainDiv.appendChild(div1);

    const div2 = document.createElement("div");
    div1.setAttribute("class" , "card h-100");
    div1.appendChild(div2);

    const image = document.createElement("img");
    image.setAttribute("class" , "card h-100");
    image.setAttribute("alt" , "image");
    image.src = "avatar-1-removebg-preview.png";
    div2.appendChild(image);
    
    const div3 = document.createElement("div");
    div1.setAttribute("class" , "card-body");
    div2.appendChild(div3); 

    const h1card = document.createElement("h1");
    h1card.innerHTML = cartItems[0];
    div3.appendChild(h1card);

    const h4Date = document.createElement("h4");
    h4Date.innerHTML = cartItems[2];
    div3.appendChild(h4Date);

    
    const Gender = document.createElement("h4");
    Gender.innerHTML = cartItems[3];
    div3.appendChild(Gender);


    const Phone = document.createElement("h4");
    Phone.innerHTML = cartItems[4];
    div3.appendChild(Phone);


    const Diseases = document.createElement("h4");
    Diseases.innerHTML = cartItems[5];
    div3.appendChild(Diseases);

    }else{

        alert("empty");

    }
}

document.getElementById('submitButton').addEventListener('click', submitForm);


function submitForm(event) {

    event.preventDefault();

    const card_name = document.getElementById('full-name').value;
    const password = document.getElementById('password').value;
    const card_Date = document.getElementById('date').value;
    const card_Gender = document.getElementById('gender').value;
    const card_Phone = document.getElementById('phone-number').value;
    const card_Diseases = document.getElementById('chronic-diseases').value;

   

    const arr =[card_name, password, card_Date, card_Gender, card_Phone, card_Diseases];

   
    localStorage.setItem("arr" ,JSON.stringify(arr));
    
    card();

}