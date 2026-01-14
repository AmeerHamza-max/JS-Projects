let filters={
    brightness:{
        value:100,
        min:0,
        max:200,
        unit:'%'
    },
    contrast:{
        value:100,
        min:0,
        max:200,
        unit:'%'
    },
    saturation:{
        value:100,
        min:0,
        max:200,
        unit:'%'
    },
    hueRotation:{
        value:0,
        min:0,
        max:360,
        unit:'deg'
    },
    blur:{
        value:0,
        min:0,
        max:20,
        unit:'px',

    },
    grayScale:{
        value:0,
        min:0,
        max:100,
        unit:'%'
    },
    sepia:{
        value:0,
        min:0,
        max:100,
        unit:'%'
    },
    opacity:{
        value:100,
        min:0,
        max:200,
        unit:'%'
    },
    invert:{
        value:0,
        min:0,
        max:100,
        unit:'%'
    },
}
const presetContainer=document.querySelector('.presets')
const file=null;
const filterContainer=document.querySelector('.filters');
const imageCanvas=document.querySelector('#image-canvas');
const imageInput=document.querySelector('#image-input');
const canvasCtx=imageCanvas.getContext('2d');
let image=null;
const downloadBtn=document.querySelector('#download-btn');
const resetBtn=document.querySelector('#reset-btn')
function createFilterElement(name,unit='%',value,min,max){
    const div=document.createElement('div');
    div.classList.add('filter');
    const input=document.createElement('input');
    input.type='range';
    input.min=min;
    input.max=max;
    input.id=name;
    const p=document.createElement('p');
    p.innerText=name;
    div.appendChild(p);
    div.appendChild(input);
    input.addEventListener('input',(event)=>{
        filters[name].value=input.value;
        applyfilters();
        
    })
    return div;
}
function createFilters(){
Object.keys(filters).forEach(key=>{
    const filterElement=createFilterElement(key,filters[key].unit,filters[key].value,filters[key].min,filters[key].max);
    console.log(filterElement)
    filterContainer.appendChild(filterElement);
    
})
}
createFilters();
imageInput.addEventListener('change',(e)=>{
    const file=e.target.files[0];
    const imagePlaceholder=document.querySelector('.placeholder');
    imageCanvas.style.display='block';
    imagePlaceholder.style.display='none';
    const img=new Image();
    img.src=URL.createObjectURL(file);
    img.onload=()=>{
        image=img;
        imageCanvas.width=img.width;
        imageCanvas.height=img.height;
        canvasCtx.drawImage(img,0,0);
        

    }

})
function applyfilters() {
    if (!image) return;

    canvasCtx.clearRect(0, 0, imageCanvas.width, imageCanvas.height);

    canvasCtx.filter = `
        brightness(${filters.brightness.value}${filters.brightness.unit})
        contrast(${filters.contrast.value}${filters.contrast.unit})
        saturate(${filters.saturation.value}${filters.saturation.unit})
        hue-rotate(${filters.hueRotation.value}${filters.hueRotation.unit})
        blur(${filters.blur.value}${filters.blur.unit})
        grayscale(${filters.grayScale.value}${filters.grayScale.unit})
        sepia(${filters.sepia.value}${filters.sepia.unit})
        opacity(${filters.opacity.value}${filters.opacity.unit})
        invert(${filters.invert.value}${filters.invert.unit})
    `;

    canvasCtx.drawImage(image, 0, 0);
    canvasCtx.filter = 'none';
}
resetBtn.addEventListener('click',()=>{
    filters={
    brightness:{
        value:100,
        min:0,
        max:200,
        unit:'%'
    },
    contrast:{
        value:100,
        min:0,
        max:200,
        unit:'%'
    },
    saturation:{
        value:100,
        min:0,
        max:200,
        unit:'%'
    },
    hueRotation:{
        value:0,
        min:0,
        max:360,
        unit:'deg'
    },
    blur:{
        value:0,
        min:0,
        max:20,
        unit:'px',

    },
    grayScale:{
        value:0,
        min:0,
        max:100,
        unit:'%'
    },
    sepia:{
        value:0,
        min:0,
        max:100,
        unit:'%'
    },
    opacity:{
        value:100,
        min:0,
        max:200,
        unit:'%'
    },
    invert:{
        value:0,
        min:0,
        max:100,
        unit:'%'
    },
}
applyfilters();
filterContainer.innerHTML='';
createFilters();


})
downloadBtn.addEventListener('click',()=>{
    const link=document.createElement('a');
    link.download='edited-image.png';
    link.href=imageCanvas.toDataURL();
    link.click();

})
const presets = {
    normal: {
        brightness: 100,
        contrast: 100,
        saturation: 100,
        hueRotation: 0,
        blur: 0,
        grayScale: 0,
        sepia: 0,
        opacity: 100,
        invert: 0
    },

    drama: {
        brightness: 90,
        contrast: 140,
        saturation: 120,
        hueRotation: 0,
        blur: 0,
        grayScale: 0,
        sepia: 0,
        opacity: 100,
        invert: 0
    },

    vintage: {
        brightness: 105,
        contrast: 110,
        saturation: 80,
        hueRotation: 10,
        blur: 1,
        grayScale: 0,
        sepia: 40,
        opacity: 100,
        invert: 0
    },

    oldSchool: {
        brightness: 95,
        contrast: 120,
        saturation: 70,
        hueRotation: 0,
        blur: 1,
        grayScale: 20,
        sepia: 60,
        opacity: 100,
        invert: 0
    },

    blackWhite: {
        brightness: 100,
        contrast: 130,
        saturation: 0,
        hueRotation: 0,
        blur: 0,
        grayScale: 100,
        sepia: 0,
        opacity: 100,
        invert: 0
    },

    cinematic: {
        brightness: 95,
        contrast: 125,
        saturation: 110,
        hueRotation: 200,
        blur: 0,
        grayScale: 0,
        sepia: 10,
        opacity: 100,
        invert: 0
    },

    softGlow: {
        brightness: 110,
        contrast: 95,
        saturation: 105,
        hueRotation: 0,
        blur: 2,
        grayScale: 0,
        sepia: 0,
        opacity: 100,
        invert: 0
    }
};
Object.keys(presets).forEach(presetName=>{
    const presetButton=document.createElement('button');
    presetButton.classList.add('btn');
    presetButton.innerText=presetName;
    presetContainer.appendChild(presetButton);
    presetButton.addEventListener('click',()=>{
        const preset=presets[presetName];
        Object.keys(preset).forEach(filterName=>{
            filters[filterName].value=preset[filterName];
            const slider = document.getElementById(filterName);
            if (slider) slider.value = preset[filterName];
        })
        applyfilters();
        
    })
})

