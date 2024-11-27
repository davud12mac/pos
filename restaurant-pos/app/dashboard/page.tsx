import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Layout } from "@/components/layout"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ArrowUpIcon, ArrowDownIcon } from 'lucide-react'

export default function DashboardPage() {
  return (
    <Layout>
      <div className="p-6 space-y-6">
        <div className="flex gap-4">
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Country" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Countries</SelectItem>
              <SelectItem value="us">United States</SelectItem>
              <SelectItem value="uk">United Kingdom</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select City" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Cities</SelectItem>
              <SelectItem value="ny">New York</SelectItem>
              <SelectItem value="ld">London</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">342</div>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <ArrowUpIcon className="w-4 h-4 text-green-500" />
                4.2% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$1,290</div>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <ArrowUpIcon className="w-4 h-4 text-green-500" />
                2.2% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Net Sales</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$1,940</div>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <ArrowUpIcon className="w-4 h-4 text-green-500" />
                4.0% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Cancelled Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <ArrowDownIcon className="w-4 h-4 text-red-500" />
                1.5% from last month
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  )
}

