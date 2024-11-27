import { Coffee, Wine, UtensilsCrossed, Soup, Croissant, Cookie } from 'lucide-react'

export function CategorySidebar() {
  return (
    <div className="w-20 border-r flex flex-col items-center py-4 bg-white">
      <CategoryButton icon={Coffee} label="Coffee" isActive={false} />
      <CategoryButton icon={Wine} label="Beverages" isActive={false} />
      <CategoryButton icon={UtensilsCrossed} label="Food" isActive={true} />
      <CategoryButton icon={Soup} label="Appetizer" isActive={false} />
      <CategoryButton icon={Croissant} label="Bread" isActive={false} />
      <CategoryButton icon={Cookie} label="Snack" isActive={false} />
    </div>
  )
}

function CategoryButton({ 
  icon: Icon, 
  label, 
  isActive 
}: { 
  icon: any
  label: string
  isActive: boolean 
}) {
  return (
    <button
      className={`w-full p-4 flex flex-col items-center gap-1 ${
        isActive
          ? "text-orange-500 bg-orange-50"
          : "text-muted-foreground hover:text-orange-500 hover:bg-orange-50"
      }`}
    >
      <div className={`p-3 rounded-xl ${isActive ? "bg-orange-500 text-white" : "bg-muted"}`}>
        <Icon className="w-5 h-5" />
      </div>
      <span className="text-xs">{label}</span>
    </button>
  )
}

