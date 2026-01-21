import cloudinary from '../config/cloudinary.js';
import fs from 'fs';
import path from 'path';

export const uploadToCloudinary = async (filePath, folder = 'letlearn') => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder,
      resource_type: 'auto'
    });

    // Delete local file after upload
    fs.unlinkSync(filePath);

    return {
      url: result.secure_url,
      publicId: result.public_id
    };
  } catch (error) {
    // Delete local file if upload fails
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
    throw new Error('File upload failed');
  }
};

export const deleteFromCloudinary = async (publicId) => {
  try {
    await cloudinary.uploader.destroy(publicId);
    return true;
  } catch (error) {
    console.error('Error deleting from cloudinary:', error);
    return false;
  }
};

export const getFileUrl = (filename) => {
  const useCloudinary = process.env.USE_CLOUDINARY === 'true';
  
  if (useCloudinary) {
    return filename; // Already a full Cloudinary URL
  } else {
    return `${process.env.BACKEND_URL || 'http://localhost:5001'}/uploads/${filename}`;
  }
};
