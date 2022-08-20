export default {
  slug: 'about',
  fields: [
    {
      name: 'about',
      type: 'textarea',
    },
  ],
  access: {
    read: () => {
      return true;
    },
  }
}