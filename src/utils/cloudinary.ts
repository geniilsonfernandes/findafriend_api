import { v2 as cloudinary } from 'cloudinary'
import { env } from '../env'
import { UploadError } from './errors/ErrorHandler'

cloudinary.config({
    cloud_name: env.CLOUD_NAME,
    api_key: env.CLOUD_API_KEY,
    api_secret: env.CLOUD_API_SECRET
})

async function cloudinaryUpload(path: string, folder: string) {
    try {
        const response = await cloudinary.uploader.upload(path, {
            folder: folder
        })

        return response
    } catch (error) {
        throw new UploadError()
    }
}

export { cloudinaryUpload }
