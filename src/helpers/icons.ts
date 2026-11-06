// Tất cả icon trong assets/icons, key là tên file không gồm phần mở rộng
const modules = import.meta.glob('@/assets/icons/*.{png,svg,jpg,jpeg,webp,gif}', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>

export const icons: Record<string, string> = Object.fromEntries(
  Object.entries(modules).map(([path, url]) => [
    path.split('/').pop()!.replace(/\.[^.]+$/, ''),
    url,
  ])
)
