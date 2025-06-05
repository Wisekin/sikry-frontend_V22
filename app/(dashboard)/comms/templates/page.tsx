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
  title: "Templates | SIKRY",
  description: "Manage your communication templates",
}

export default function TemplatesPage() {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Templates</h1>
          <p className="text-muted-foreground">Create and manage your communication templates.</p>
        </div>
        <Button asChild>
          <Link href={ROUTES.TEMPLATES + "/new"}>
            <PlusCircle className="mr-2 h-4 w-4" />
            New Template
          </Link>
        </Button>
      </div>

      <Tabs defaultValue="email" className="w-full">
        <TabsList>
          <TabsTrigger value="email">Email</TabsTrigger>
          <TabsTrigger value="linkedin">LinkedIn</TabsTrigger>
          <TabsTrigger value="phone">Phone</TabsTrigger>
          <TabsTrigger value="all">All Templates</TabsTrigger>
        </TabsList>
        <TabsContent value="email" className="space-y-4">
          <Suspense fallback={<PageLoader />}>
            <TemplatesList type="email" />
          </Suspense>
        </TabsContent>
        <TabsContent value="linkedin" className="space-y-4">
          <Suspense fallback={<PageLoader />}>
            <TemplatesList type="linkedin" />
          </Suspense>
        </TabsContent>
        <TabsContent value="phone" className="space-y-4">
          <Suspense fallback={<PageLoader />}>
            <TemplatesList type="phone" />
          </Suspense>
        </TabsContent>
        <TabsContent value="all" className="space-y-4">
          <Suspense fallback={<PageLoader />}>
            <TemplatesList />
          </Suspense>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function TemplatesList({ type }: { type?: string }) {
  // In a real app, this would fetch data from the API
  const templates = Array.from({ length: 10 }).map((_, i) => ({
    id: `temp-${i + 1}`,
    name: `Template ${i + 1}`,
    type: type || (i % 3 === 0 ? "email" : i % 3 === 1 ? "linkedin" : "phone"),
    category: i % 4 === 0 ? "outreach" : i % 4 === 1 ? "follow-up" : i % 4 === 2 ? "nurture" : "announcement",
    variables: Math.floor(Math.random() * 10),
    isPublic: i % 2 === 0,
    createdAt: new Date(Date.now() - i * 86400000).toISOString(),
    updatedAt: new Date(Date.now() - i * 43200000).toISOString(),
  }))

  const columns = [
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }: any) => (
        <Link href={`${ROUTES.TEMPLATES}/${row.original.id}`} className="font-medium hover:underline">
          {row.original.name}
        </Link>
      ),
    },
    {
      accessorKey: "category",
      header: "Category",
      cell: ({ row }: any) => <div className="capitalize">{row.original.category}</div>,
    },
    {
      accessorKey: "variables",
      header: "Variables",
    },
    {
      accessorKey: "isPublic",
      header: "Visibility",
      cell: ({ row }: any) => <div>{row.original.isPublic ? "Public" : "Private"}</div>,
    },
    {
      accessorKey: "updatedAt",
      header: "Last Updated",
      cell: ({ row }: any) => <div>{new Date(row.original.updatedAt).toLocaleDateString()}</div>,
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>{type ? `${type.charAt(0).toUpperCase() + type.slice(1)} Templates` : "All Templates"}</CardTitle>
      </CardHeader>
      <CardContent>
        <DataTable columns={columns} data={templates} />
      </CardContent>
    </Card>
  )
}
