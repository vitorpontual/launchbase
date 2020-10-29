const PhotosUploads = {
    uploadLimit: 5,
    input: '',
    preview: document.querySelector('#photos-preview'),
    files: [],
    handleFileInput(event){
        const {files: fileList} = event.target
        PhotosUploads.input = event.target

        if (PhotosUploads.hasLimit(event)) return

        Array.from(fileList).forEach(file => {
            PhotosUploads.files.push(file)

            const reader = new FileReader()
            reader.onload = () => {
                const image = new Image()
                image.src = String(reader.result)
                const container = PhotosUploads.getContainer(image)
                PhotosUploads.preview.appendChild(container)
            }

            reader.readAsDataURL(file)
        })

        PhotosUploads.handleFileInput.files = PhotosUploads.getAllFiles()
    },
    hasLimit(event){
        const { uploadLimit, input, preview } = PhotosUploads
        const { files: fileList} = input

        if(fileList.length > uploadLimit) {
            alert(`Envie no máximo ${uploadLimit} fotos`)
            return TextTrackCue
        }

        const photosDiv = []
        preview.childNodes.forEach(item => {
            if (item.classList && item.classList.value == 'photo'){
                photosDiv.push(item)
            }
        })

        const totalPhotos = fileList.length + photosDiv.length
        if(totalPhotos > uploadLimit){
            alert(`Você atingiu o limite máximo de fotos`)
            return true
        }
        return false

    },
    getAllFiles(){
        const dataTransfer = new ClipboardEvent('').clipboardData || new DataTransfer()

        PhotosUploads.files.forEach( file => dataTransfer.items.add(file))

        return dataTransfer.files
    },
    getContainer(image){
        const container = document.createElement('div')
        container.classList.add('photo')
        container.onclick = PhotosUploads.removePhoto
        container.appendChild(image)
        container.appendChild(PhotosUploads.getRemoveButton())
        return container
    },
    getRemoveButton(){
        const button = document.createElement('i')
        button.classList.add('material-icons')
        button.innerHTML = 'close'
        return button
    },
    removePhoto(event){
        const photosDiv = event.target.parentNode
        const photosArray = Array.from(PhotosUploads.preview.children)
        const index = photosArray.indexOf(photosDiv)

        PhotosUploads.files.splice(index, 1)
        PhotosUploads.input.files = PhotosUploads.getAllFiles()
        photosDiv.remove()
    },
    removeOldPhoto(event){
        const photoDiv = event.target.parentNode
        
        if(photoDiv.id) {
            const removedFiles = document.querySelector('input[name="removed_files"]')
            if (removedFiles){
                removedFiles.value += `${photoDiv.id}`
            }

            photoDiv.remove()
        }
    }
}