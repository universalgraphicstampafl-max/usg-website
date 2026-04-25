import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schemaTypes } from './sanity/schemas'

export default defineConfig({
  basePath: '/studio',
  projectId: '0q65tvx4',
  dataset: 'production',
  title: 'USG Website',
  plugins: [structureTool()],
  schema: {
    types: schemaTypes,
  },
})
