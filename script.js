const div_container=document.getElementById('div_container');



 fetch('https://openapi.programming-hero.com/api/ai/tools')
.then(res=>res.json())
.then(data=>{
    
    display((data.data.tools).slice(0,6))
   
    })


const display=(datas)=>{
div_container.innerHTML="";
datas.forEach(index=>{
const div=document.createElement('div');
div.classList.add('col')
div.innerHTML=`
         
          <div class="card h-100 ">
            <img src="${index.image}"style="height:250px;" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title font-bold">Feature</h5>
       
         

            <div >${index.features.map(index2=>`<li style="list-style-type:decimal">${index2}</li>`).join('')}</div>
            <div>


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
     

`
div_container.appendChild(div);

})
load(false);
}

//modal-part-code

const modal_section=search_id=>{

    fetch(`https://openapi.programming-hero.com/api/ai/tool/${search_id}`)
    .then(res=>res.json())
    .then(data=>modal_display(data.data))
}
const modal_display=(modaldata)=>{
console.log(modaldata);
document.getElementById('modal_body').innerHTML=`

<div class="row row-cols-1 row-cols-md-2 g-4">
<div class="col">
  <div class="card h-100 p-3 bg-light">
   <h5 class="card-title">${modaldata.description}</h5>

    <div class="card-body">
    
    <div class="d-flex  justify-content-center">
    <div class="bg-white p-2 d-flex justify-content-between align-items-center text-center rounded text-success "style="font-weight:bold;width:60%">${modaldata.pricing!==null?modaldata.pricing[0].price:"Free of Cost"} ${modaldata.pricing!==null?modaldata.pricing[0].plan:"/Basic"}</div>
    <div class="bg-white mx-1 p-2  d-flex justify-content-between align-items-center text-center rounded text-warning "style="font-weight:bold;width:60%">${modaldata.pricing!==null?modaldata.pricing[1].price:"Free of Cost"} ${modaldata.pricing!==null?modaldata.pricing[1].plan:"/Pro"} </div>
    <div class="bg-white p-2  d-flex justify-content-between align-items-center text-center rounded text-danger "style="font-weight:bold;width:60%">${modaldata.pricing!==null?modaldata.pricing[2].price:"Free of Cost"} ${modaldata.pricing!==null?modaldata.pricing[2].plan:"/Enterprice"} </div>                  
    </div>

   <div class="d-flex  justify-content-between my-4">
   <div ><span class="mx-4" style="font-weight:bold">Features:</span>${Object.entries(modaldata.features).map(index=>`<ul><li>${index[1].feature_name}</li></ul>`).join(' ')}</div>
   <div>
   
   <p><span class="mx-4" style="font-weight:bold">Integration:</span><br/>${modaldata.integrations!==null?modaldata.integrations.map(index=>`<ul><li>${index}</li></ul>`).join(''):`<span class="ms-3">No data Found</span>`}</p>
   </div>

   </div>


    </div>
  </div>
</div>
<div class="col">
  <div class="card  h-100 p-3">
  <div style="position:relative;">
    <img src="${modaldata.image_link[0]}"style="height:300px;" class="card-img-top" alt="...">
    ${modaldata.accuracy.score!=null?`<button id="btn2" class="btn btn-danger"style="position:absolute;right:0;top:0;">${(modaldata.accuracy.score*100)}% accuracy</button>`:" " }</div>
    <div>
    <div class="card-body text-center">
      <h5 class="card-title">${modaldata.input_output_examples?modaldata.input_output_examples[0].input:"Can you give any example? "}</h5>
      <p class="card-text my-4">${modaldata.input_output_examples?modaldata.input_output_examples[1].output:"No! Not Yet! Take a break!!!"}</p>
    </div>
  </div>
</div>

</div> 



`;

}












//see all button section
document.getElementById('seebtn').addEventListener('click',function(){
    load(true);
    fetch('https://openapi.programming-hero.com/api/ai/tools')
    .then(res=>res.json())
    .then(data=>display(data.data.tools))  
    document.getElementById('seebtn').classList.add('d-none');

    document.getElementById('sortdate').addEventListener('click',function(){
  
        fetch('https://openapi.programming-hero.com/api/ai/tools')
        .then(res=>res.json())
        .then(data=>{
           
            
            load(true);
        
            display((data.data.tools).sort(sortdate))
            document.getElementById('seebtn').classList.add('d-none');
    
    
        } )})
})


    //slice card sort
    document.getElementById('sortdate').addEventListener('click',function(){
  
        fetch('https://openapi.programming-hero.com/api/ai/tools')
        .then(res=>res.json())
        .then(data=>{
         display(((data.data.tools).slice(0,6)).sort(sortdate))
} )})

        //all card sort
// document.getElementById('sortdate').addEventListener('click',function(){
  
//     fetch('https://openapi.programming-hero.com/api/ai/tools')
//     .then(res=>res.json())
//     .then(data=>{
       
        
//         load(true);
    
//         display((data.data.tools).sort(sortdate))
//         document.getElementById('seebtn').classList.add('d-none');


//     } )})
//date sorting
    const sortdate=(a,b)=>{
        const datea=new Date(a.published_in);
        const dateb=new Date(b.published_in);
        if(datea<dateb) return 1;
        else if(datea>dateb) return -1;
        return 0;}
   

//loading btn
const load=(loading)=>{
    const loadbtn=document.getElementById('loading');
    if(loading){
loadbtn.classList.remove('d-none');
    }
    else{
        loadbtn.classList.add('d-none');

    }
}

   
   
    






{/* <p class="card-text"> <i class="fa-solid fa-circle-arrow-right me-1"></i>
${index.features.join('<br> <i class="fa-solid fa-circle-arrow-right me-2"></i>')}</p> */}