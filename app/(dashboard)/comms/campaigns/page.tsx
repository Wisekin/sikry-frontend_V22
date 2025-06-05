import { Suspense } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PlusCircle } from "lucide-react"
import { DataTable } from "@/components/data/tables/DataTable"
import { PageLoader } from "@/components/core/loading/PageLoader"
import { ROUTES } from "@/lib/constants/routes"

export const metadata = {
  title: "Campaigns | SIKRY",
  description: "Manage your communication campaigns",
}

export default function CampaignsPage() {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Campaigns</h1>
          <p className="text-muted-foreground">Manage your communication campaigns and track their performance.</p>
        </div>
        <Button asChild>
          <Link href={ROUTES.CAMPAIGNS + "/new"}>
            <PlusCircle className="mr-2 h-4 w-4" />
            New Campaign
          </Link>
        </Button>
      </div>

      <Tabs defaultValue="active" className="w-full">
        <TabsList>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="draft">Draft</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="all">All Campaigns</TabsTrigger>
        </TabsList>
        <TabsContent value="active" className="space-y-4">
          <Suspense fallback={<PageLoader />}>
            <CampaignsList status="active" />
          </Suspense>
        </TabsContent>
        <TabsContent value="draft" className="space-y-4">
          <Suspense fallback={<PageLoader />}>
            <CampaignsList status="draft" />
          </Suspense>
        </TabsContent>
        <TabsContent value="completed" className="space-y-4">
          <Suspense fallback={<PageLoader />}>
            <CampaignsList status="completed" />
          </Suspense>
        </TabsContent>
        <TabsContent value="all" className="space-y-4">
          <Suspense fallback={<PageLoader />}>
            <CampaignsList />
          </Suspense>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function CampaignsList({ status }: { status?: string }) {
  // In a real app, this would fetch data from the API
  const campaigns = Array.from({ length: 10 }).map((_, i) => ({
    id: `camp-${i + 1}`,
    name: `Campaign ${i + 1}`,
    type: i % 3 === 0 ? "email" : i % 3 === 1 ? "linkedin" : "multi-channel",
    status: status || (i % 4 === 0 ? "active" : i % 4 === 1 ? "draft" : i % 4 === 2 ? "paused" : "completed"),
    sent: Math.floor(Math.random() * 1000),
    opened: Math.floor(Math.random() * 500),
    clicked: Math.floor(Math.random() * 200),
    replied: Math.floor(Math.random() * 100),
    createdAt: new Date(Date.now() - i * 86400000).toISOString(),
  }))

  const columns = [
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }: any) => (
        <Link href={ROUTES.CAMPAIGN_DETAIL(row.original.id)} className="font-medium hover:underline">
          {row.original.name}
        </Link>
      ),
    },
    {
      accessorKey: "type",
      header: "Type",
      cell: ({ row }: any) => <div className="capitalize">{row.original.type}</div>,
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }: any) => {
        const status = row.original.status
        const statusClasses = {
          active: "bg-green-100 text-green-800",
          draft: "bg-gray-100 text-gray-800",
          paused: "bg-yellow-100 text-yellow-800",
          completed: "bg-blue-100 text-blue-800",
        }
        return (
          <div
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              statusClasses[status as keyof typeof statusClasses]
            }`}
          >
            {status}
          </div>
        )
      },
    },
    {
      accessorKey: "sent",
      header: "Sent",
    },
    {
      accessorKey: "opened",
      header: "Opened",
    },
    {
      accessorKey: "clicked",
      header: "Clicked",
    },
    {
      accessorKey: "replied",
      header: "Replied",
    },
    {
      accessorKey: "createdAt",
      header: "Created",
      cell: ({ row }: any) => <div>{new Date(row.original.createdAt).toLocaleDateString()}</div>,
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {status ? `${status.charAt(0).toUpperCase() + status.slice(1)} Campaigns` : "All Campaigns"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <DataTable columns={columns} data={campaigns} />
      </CardContent>
    </Card>
  )
}
