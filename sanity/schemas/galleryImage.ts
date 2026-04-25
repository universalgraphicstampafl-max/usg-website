import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'galleryImage',
  title: 'Gallery Image',
  type: 'document',
  fields: [
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'alt',
      title: 'Alt Text',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'industry',
      title: 'Industry',
      type: 'string',
      options: {
        list: [
          { title: 'Convenience', value: 'convenience' },
          { title: 'Tobacco', value: 'tobacco' },
          { title: 'Beverage', value: 'beverage' },
          { title: 'Franchise', value: 'franchise' },
        ],
      },
    }),
    defineField({
      name: 'zone',
      title: 'Zone',
      type: 'string',
      options: {
        list: [
          { title: 'Entrance', value: 'entrance' },
          { title: 'Cooler', value: 'cooler' },
          { title: 'Checkout', value: 'checkout' },
          { title: 'Window', value: 'window' },
          { title: 'Outdoor', value: 'outdoor' },
        ],
      },
    }),
  ],
})
