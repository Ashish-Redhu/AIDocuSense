import "./globals.css"
import localFont from 'next/font/local'

const epunda = localFont({
  src: [
    {
      path: 'fonts/Libertinus_Keyboard/LibertinusKeyboard-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
  ],

  variable: '--font-libertinus-keyboard',
})

export const metadata = {
  title: "AI Doc Sense",
  description: "Your AI-powered document assistant",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={epunda.variable}>
      <body 
      // className="font-[var(--font-epunda-slab)] bg-gray-900 text-white"
      className="font-[var(--font-libertinus-keyboard)] bg-gray-900 text-white"
      >
        {children}
      </body>
    </html>
  )
}
