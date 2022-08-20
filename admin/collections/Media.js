export default {
  slug: 'media',
  upload: {
    staticURL: '/media',
    staticDir: 'media',
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        crop: 'centre',
      },
      {
        name: 'card',
        width: 768,
        crop: 'centre',
      },
      {
        name: 'tablet',
        width: 1024,
        crop: 'centre',
      }
    ],
    adminThumbnail: 'thumbnail',
    mimeTypes: ['image/*', 'video/*'],
  },
  access: {
    read: () => {
      return true;
    },
  }
}