import "./globals.css"
import localFont from 'next/font/local'

const epunda = localFont({
  src: [
    {
      path: 'fonts/Libertinus_Keyboard/LibertinusKeyboard-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    // {
    //   path: 'fonts/epunda/EpundaSlab-VariableFont_wght.ttf',
    //   weight: '700',
    //   style: 'normal',
    // },
    // {
    //   path: 'fonts/epunda/EpundaSlab-Italic-VariableFont_wght.ttf',
    //   weight: '400',
    //   style: 'italic',
    // },
  ],
  // variable: '--font-epunda-slab',
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
