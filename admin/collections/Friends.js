export default {
  slug: 'friends',
  auth: true,
  admin: {
    useAsTitle: 'name',
  },
  access: {
    read: () => true,
  },
  fields: [{
    name: 'name',
    type: 'text',
    required: true,
  },
  {
    name: 'url',
    type: 'text',
  }, {
    name: 'image',
    type: 'upload',
    required: true,
    relationTo: 'media'
  }],
  access: {
    read: () => {
      return true;
    },
  }
};