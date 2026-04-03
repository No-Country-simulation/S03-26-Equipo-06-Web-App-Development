interface Props {
  titulo: string;
  pathname:string;
}

export default function Header({ titulo, pathname }: Props) {
  return (
    <header className='flex h-15 w-full items-center justify-between border-b border-gray-300/40 bg-white px-11 sm:h-20 sm:px-20'>
      <h1 className={`p-3 text-lg font-bold tracking-tight text-blue-600 sm:text-xl ${pathname === '/' ? 'ml-0' : 'ml-15'}`}>{titulo}</h1>

      <div className='h-10 w-10 rounded-full border border-gray-300/70'></div>
    </header>
  )
}
