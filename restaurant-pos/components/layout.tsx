import { ArrowLeft, HomeIcon, ClipboardIcon, HistoryIcon, FileTextIcon, UserIcon, PackageIcon } from 'lucide-react'
import Link from "next/link"
import Image from "next/image"

interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="h-16 border-b flex items-center px-4 gap-4">
        <button className="p-2">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center">
            <Image
              src="/placeholder.svg"
              alt="Logo"
              width={20}
              height={20}
              className="text-white"
            />
          </div>
          <div>
            <div className="font-medium">Walk-In</div>
            <div className="text-sm text-muted-foreground">Coca coffeetalk</div>
          </div>
        </div>
        <nav className="flex items-center gap-8 mx-8">
          <Link href="/" className="text-orange-500 flex items-center gap-2">
            <HomeIcon className="w-5 h-5" />
            Home
          </Link>
          <Link href="/orders" className="text-muted-foreground flex items-center gap-2">
            <ClipboardIcon className="w-5 h-5" />
            Order
          </Link>
          <Link href="/history" className="text-muted-foreground flex items-center gap-2">
            <HistoryIcon className="w-5 h-5" />
            History
          </Link>
          <Link href="/bills" className="text-muted-foreground flex items-center gap-2">
            <FileTextIcon className="w-5 h-5" />
            Bills
          </Link>
          <Link href="/customers" className="text-muted-foreground flex items-center gap-2">
            <UserIcon className="w-5 h-5" />
            Customers
          </Link>
          <Link href="/inventory" className="text-muted-foreground flex items-center gap-2">
            <PackageIcon className="w-5 h-5" />
            Inventory
          </Link>
        </nav>
        <div className="ml-auto flex items-center gap-4">
          <span>Dinning option</span>
          <span className="text-muted-foreground">10:53:00 26/02/2023</span>
          <div className="w-8 h-8 rounded-full bg-gray-200" />
        </div>
      </header>
      {children}
    </div>
  )
}

