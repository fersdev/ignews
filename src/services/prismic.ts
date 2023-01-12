import * as Prismic from '@prismicio/client'

export function  getPrismicClient(req?: unknown) {

  const endpoint = Prismic.getRepositoryEndpoint('dnews')
  const prismic = Prismic.createClient(endpoint, { fetch })
  prismic.enableAutoPreviewsFromReq(req)

  return prismic;
}