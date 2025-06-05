"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useTranslation } from "@/lib/i18n/useTranslation"
import { Search, Filter, Download, RefreshCw } from "lucide-react"

interface DataTableProps {
  data: any[]
  columns: any[]
  searchable?: boolean
  filterable?: boolean
  exportable?: boolean
}

export function DataTable({ data, columns, searchable = true, filterable = true, exportable = true }: DataTableProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { t } = useTranslation()

  const itemsPerPage = 10

  // Filter data based on search term
  const filteredData = data.filter((item) =>
    Object.values(item).some((value) => String(value).toLowerCase().includes(searchTerm.toLowerCase())),
  )

  const totalPages = Math.ceil(filteredData.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentData = filteredData.slice(startIndex, endIndex)

  const handleRefresh = () => {
    setIsLoading(true)
    setTimeout(() => setIsLoading(false), 1000)
  }

  return (
    <div className="space-y-2">
      {/* Table Header with Actions */}
      <div className="flex items-center justify-between p-3 bg-surface rounded-md">
        <div className="flex items-center gap-3">
          {searchable && (
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder={t("search.placeholder")}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 w-64 h-9 text-sm"
              />
            </div>
          )}

          {filterable && (
            <Button variant="outline" size="sm" className="h-9 gap-1 text-sm">
              <Filter className="w-3.5 h-3.5" />
              {t("search.filters")}
            </Button>
          )}
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            disabled={isLoading}
            className="h-9 gap-1 text-sm"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? "animate-spin" : ""}`} />
            Refresh
          </Button>

          {exportable && (
            <Button variant="outline" size="sm" className="h-9 gap-1 text-sm">
              <Download className="w-3.5 h-3.5" />
              Export
            </Button>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="rounded-md border border-border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50 hover:bg-muted/50">
              {columns.map((column, index) => (
                <TableHead key={index} className="h-9 text-xs font-medium text-muted-foreground">
                  {column.header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentData.map((row, rowIndex) => (
              <TableRow key={rowIndex} className="h-12 hover:bg-muted/30 border-b border-border/50 last:border-0">
                {columns.map((column, colIndex) => (
                  <TableCell key={colIndex} className="py-2 px-4 text-sm">
                    {column.cell ? column.cell({ row: { original: row } }) : row[column.accessorKey]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between px-4 py-2 text-sm">
        <div className="text-xs text-muted-foreground">
          Showing {startIndex + 1} to {Math.min(endIndex, filteredData.length)} of {filteredData.length} results
          {searchTerm && ` (filtered from ${data.length} total)`}
        </div>
      </div>
    </div>
  )
}
