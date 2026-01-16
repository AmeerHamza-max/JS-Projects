const btnElement=document.querySelector('.btn');
const inputElement=document.querySelector('#input')
const copyIcon=document.querySelector('.fa-copy');
const alertContainer=document.querySelector('.alert-container')
btnElement.addEventListener('click',()=>{
    createPassword();
});
copyIcon.addEventListener('click',()=>{
    copyPassword();
    
    if(inputElement.value){
       
        alertContainer.classList.add('active');
        setTimeout(() => {
        alertContainer.classList.remove('active');
    }, 2000);
    }
    
})
function createPassword(){
    const chars = 
  'ABCDEFGHIJKLMNOPQRSTUVWXYZ' + // Uppercase
  'abcdefghijklmnopqrstuvwxyz' + // Lowercase
  '0123456789' +                // Numbers
  '!@#$%^&*()-_+=';              // Safe & strong symbols

    const passwordlength=14;
    let password='';
    for (let index = 0; index <passwordlength ; index++) {
        const randomNum=Math.floor(Math.random()*chars.length);
        password+=chars.substring(randomNum,randomNum+1);
    }
    inputElement.value=password;
    alertContainer.innerText=password+' copied';
}
function copyPassword(){
    inputElement.select();
    inputElement.setSelectionRange(0,9999);
    navigator.clipboard.writeText(inputElement.value);
    
}