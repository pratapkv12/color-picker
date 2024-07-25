document.getElementById('imageUpload').addEventListener('change', function(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    
    reader.onload = function(e) {
        const img = document.getElementById('uploadedImage');
        const uploadBox = document.getElementById('uploadBox');
        img.src = e.target.result;
        img.style.display = 'block';
        uploadBox.style.display = 'none';
    };
    
    reader.readAsDataURL(file);
});

document.getElementById('uploadedImage').addEventListener('click', function(event) {
    const img = event.target;
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0, img.width, img.height);
    
    const rect = img.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const pixel = ctx.getImageData(x, y, 1, 1).data;
    
    const hex = `#${pixel[0].toString(16).padStart(2, '0')}${pixel[1].toString(16).padStart(2, '0')}${pixel[2].toString(16).padStart(2, '0')}`;
    document.getElementById('colorCode').textContent = `Color Code: ${hex}`;
});