const uploadBox= document.querySelector('.upload-box'),
previewImg = uploadBox.querySelector('img'),
fileInput = uploadBox.querySelector('input'),
widthInput = document.querySelector('.width input'),
heightInput = document.querySelector('.height input'),
ratioInput = document.querySelector('.ratio input'),
qualityInput = document.querySelector('.quality input'),
downloadBtn = document.querySelector('.download-btn');

let ogImageRatio;

const loadFile = (e)=>{
    const file = e.target.files[0]; //prendre le premier fichier selectionné

    if(!file) return;//si l'utilisateur n'a rien selectioné

    previewImg.src = URL.createObjectURL(file); //attribution de l'url de l'image à la variable previewImg
    previewImg.addEventListener('load', ()=>{ //quand l'image est chargé
        widthInput.value = previewImg.naturalWidth;
        heightInput.value = previewImg.naturalHeight;
        ogImageRatio = previewImg.naturalWidth / previewImg.naturalHeight;
        document.querySelector('.wrapper').classList.add('active')
    })
    
}

widthInput.addEventListener('keyup', ()=>{
    //avoir la taille de l'image à partir du ratio si le checkbox est coché
    const height = ratioInput.checked ? widthInput.value / ogImageRatio : heightInput.value;
    heightInput.value = Math.floor(height);
})

heightInput.addEventListener('keyup', ()=>{
    //avoir la largeur de l'image à partir du ratio si le checkbox est coché
    const width = ratioInput.checked ? heightInput.value / ogImageRatio : widthInput.value;
    widthInput.value = Math.floor(width);
})

const resizeAndDownload = ()=>{
    const canvas = document.createElement('canvas');
    const a = document.createElement('a');
    const ctx = canvas.getContext('2d');
    const imgQuality = qualityInput.checked ? 0.7 : 1.0;

    //mise de la taille et la largeur de l'image à partir de la taille et la largeur de entrees

    canvas.width = widthInput.value;
    canvas.height = heightInput.value;

    ctx.drawImage(previewImg, 0, 0, canvas.width, canvas.height);
    a.href = canvas.toDataURL('image/jpeg', imgQuality);
    a.download = new Date().getTime();
    a.click();
}
downloadBtn.addEventListener('click', resizeAndDownload);
fileInput.addEventListener('change', loadFile);
uploadBox.addEventListener('click', ()=> fileInput.click());