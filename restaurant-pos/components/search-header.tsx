import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function SearchHeader() {
  return (
    <div className="p-4 border-b">
      <div className="flex items-center gap-4 mb-4">
        <div className="text-sm text-muted-foreground">
          Dashboard / Food
        </div>
      </div>
      <div className="flex items-center gap-4">
        <Input 
          placeholder="Search menu..." 
          className="max-w-sm"
        />
        <div className="flex items-center gap-2">
          <Button variant="ghost" className={`rounded-full ${
            true ? "bg-orange-500 text-white hover:bg-orange-600" : ""
          }`}>
            All
          </Button>
          <Button variant="ghost" className="rounded-full">Chicken</Button>
          <Button variant="ghost" className="rounded-full">Seafood</Button>
          <Button variant="ghost" className="rounded-full">Pasta</Button>
          <Button variant="ghost" className="rounded-full">Rice bowl</Button>
        </div>
      </div>
    </div>
  )
}

