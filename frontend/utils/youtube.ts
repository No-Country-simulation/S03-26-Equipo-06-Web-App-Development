export const getYoutubeThumbnail = (url?: string | null) => {
  if (!url) return '/testimoniales.webp'

  const match = url.match(/(?:v=|youtu\.be\/)([^?&]+)/)
  const id = match?.[1]

  if (!id || id.length !== 11) return '/testimoniales.webp'

  return `https://img.youtube.com/vi/${id}/hqdefault.jpg`
}

export const getYoutubeEmbed = (url?: string | null) => {
  if (!url) return null

  const match = url.match(/(?:v=|youtu\.be\/)([^?&]+)/)
  const id = match?.[1]

  if (!id || id.length !== 11) return null

  return `https://www.youtube.com/embed/${id}`
}
