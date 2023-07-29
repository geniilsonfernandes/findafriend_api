import { cloudinaryUpload } from '../utils/cloudinary'

async function storagePhotos(files: { path: string }[]) {
    const urls: string[] = await Promise.all(
        files.map(async (file: { path: string }) => {
            const { path } = file

            const { secure_url } = await cloudinaryUpload(path, 'pets')

            return secure_url
        })
    )

    return urls
}

export { storagePhotos }
