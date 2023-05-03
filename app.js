const uploadBox= document.querySelector('.upload-box'),
previewImg = uploadBox.querySelector('img'),
fileInput = uploadBox.querySelector('input');

const loadFile = (e)=>{
    const file = e.target.files[0]; //prendre le premier fichier selectionné

    if(!file) return;//si l'utilisateur n'a rien selectioné

    previewImg.src = URL.createObjectURL(file); //attribution de l'url de l'image à la variable previewImg
    previewImg.addEventListener('load', ()=>{ //quand l'image est chargé
        document.querySelector('.wrapper').classList.add('active')
    })
    console.log(file);
}

fileInput.addEventListener('change', loadFile);

uploadBox.addEventListener('click', ()=> fileInput.click());