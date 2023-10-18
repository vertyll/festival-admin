import Image from 'next/image'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div className='bg-blue-400 w-screen h-screen flex items-center'>
      <div className='text-center w-full'>
        <button className='bg-white p-5 rounded-3xl px-4'>Zaloguj się za pomocą <b>Google</b></button>
      </div>
    </div>
  )
}
