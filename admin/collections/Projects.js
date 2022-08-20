export default {
  slug: 'projects',
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'thumbnail',
      type: 'upload',
      required: true,
      relationTo: 'media'
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'files',
      type: 'array',
      fields: [{
        name: 'file',
        type: 'upload',
        required: true,
        relationTo: 'media'
      }]
    }
  ],
  access: {
    read: () => {
      return true;
    },
  }
}