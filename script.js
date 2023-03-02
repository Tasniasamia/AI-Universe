const div_container=document.getElementById('div_container');
let fetchdata=[];


 fetch('https://openapi.programming-hero.com/api/ai/tools')
.then(res=>res.json())
.then(data=>{
    
    display((data.data.tools).slice(0,6))
})


const display=(datas)=>{
div_container.innerHTML="";
datas.forEach(index=>{
const div=document.createElement('div');
div.innerHTML=`
          <div class="col">
          <div class="card p-3">
            <img src="${index.image}"style="height:250px;" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title font-bold">Feature</h5>
       
              <p class="card-text"> <i class="fa-solid fa-circle-arrow-right "></i>
            ${index.features.join('<br> <i class="fa-solid fa-circle-arrow-right "></i>')}
             <hr/>
            <div class="d-flex justify-content-between align-items-center" >

            <div>
            <h6>${index.name}</h6>
            <p><img src="Frame.png"class="me-2"/> <span>${index.published_in}</span></p>
            </div>
           <button type="button" class="btn " data-bs-toggle="modal" data-bs-target="#exampleModal"onclick="modal_section('${index.id}')">
            <i class="fa-solid fa-arrow-right"></i>
          </button>
            
            
            </div>
              </div>
          </div>
        </div>

`
div_container.appendChild(div);

})

}

//modal-part-code
//see all button section
document.getElementById('seebtn').addEventListener('click',function(){
    fetch('https://openapi.programming-hero.com/api/ai/tools')
    .then(res=>res.json())
    .then(data=>display(data.data.tools))  
    document.getElementById('seebtn').classList.add('d-none');
})


document.getElementById('sortdate').addEventListener('click',function(){
    fetch('https://openapi.programming-hero.com/api/ai/tools')
    .then(res=>res.json())
    .then(data=>{
       

        const sortdate=(a,b)=>{
            const datea=new Date(a.published_in);
            const dateb=new Date(b.published_in);
            if(datea>dateb) return 1;
            else if(datea<dateb) return -1;
            return 0;}
        display(data.data.tools.sort(sortdate))
        document.getElementById('seebtn').classList.add('d-none');


    } )})






   
   
    
