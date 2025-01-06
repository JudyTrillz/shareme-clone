import {defineType, defineField} from 'sanity'

export const User = defineType({
  name: 'user',
  title: 'User',
  type: 'document',
  fields: [
    defineField({
      name: 'userName',
      title: 'User Name',
      type: 'string',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'string',
    }),
  ],
})
