export const fileToBlobURL = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = function () {
            const blob = dataURLtoBlob(reader.result);
            const blobURL = URL.createObjectURL(blob);
            resolve(blobURL);
        };

        reader.onerror = function (error) {
            reject(error);
        };

        // Read the file as a data URL
        reader.readAsDataURL(file);
    });
}


const dataURLtoBlob = (dataURL) => {
    const parts = dataURL.split(',');
    const byteString = atob(parts[1]);
    const contentType = parts[0].split(':')[1].split(';')[0];

    const arrayBuffer = new ArrayBuffer(byteString.length);
    const uint8Array = new Uint8Array(arrayBuffer);

    for (let i = 0; i < byteString.length; i++) {
        uint8Array[i] = byteString.charCodeAt(i);
    }

    return new Blob([arrayBuffer], { type: contentType });
}