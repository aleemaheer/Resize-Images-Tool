const fs = require("fs");
const sharp = require("sharp");

const folderPath = "images";

// Read the files in the folder
fs.readdir(folderPath, (err, files) => {
	if (err) {
		console.error("Error reading folder:", err);
		return;
	}

	// Process each file
	files.forEach((file) => {
		const filePath = `${folderPath}/${file}`;

		// Check if the file is a JPG image
		if (file.endsWith(".png") || file.endsWith(".jpeg") || file.endsWith(".webp") || file.endsWith(".jpg") ) {
			// Resize the image using sharp
			sharp(filePath)
				.resize(1920, 1080)
				.toBuffer((resizeErr, buffer) => {
					if (resizeErr) {
						console.error(`Error resizing image ${file}:`, resizeErr);
						return;
					}

					// Replace the original file with the resized image
					fs.writeFile(filePath, buffer, (writeErr) => {
						if (writeErr) {
							console.error(`Error replacing image ${file}:`, writeErr);
							return;
						}

						console.log(`Image ${file} resized and replaced successfully.`);
					});
				});
		}
	});
});
