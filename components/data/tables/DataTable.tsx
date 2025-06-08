"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useTranslation } from "@/lib/i18n/useTranslation"
import { Search, Filter, Download, RefreshCw } from "lucide-react"

type Column = {
  accessorKey: string;
  header: string;
  cell?: (props: { row: { original: any } }) => React.ReactNode;
}

interface DataTableProps {
  data: any[];
  columns: Column[];
  searchable?: boolean;
  filterable?: boolean;
  exportable?: boolean;
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

  // Default translations in case the translation context is not available
  const defaultTranslations = {
    searchPlaceholder: "Search...",
    filters: "Filters",
    refresh: "Refresh",
    export: "Export",
    showing: "Showing",
    to: "to",
    of: "of",
    results: "results",
    filteredFrom: "filtered from",
    total: "total"
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
                placeholder={t?.("search.placeholder") || defaultTranslations.searchPlaceholder}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 w-64 h-9 text-sm"
              />
            </div>
          )}

          {filterable && (
            <Button variant="outline" size="sm" className="h-9 gap-1 text-sm">
              <Filter className="w-3.5 h-3.5" />
              {t?.("search.filters.label") || defaultTranslations.filters}
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
            {t?.("common.refresh") || defaultTranslations.refresh}
          </Button>

          {exportable && (
            <Button variant="outline" size="sm" className="h-9 gap-1 text-sm">
              <Download className="w-3.5 h-3.5" />
              {t?.("common.export") || defaultTranslations.export}
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
          {t?.("pagination.showing") || defaultTranslations.showing} {startIndex + 1} {t?.("pagination.to") || defaultTranslations.to} {Math.min(endIndex, filteredData.length)} {t?.("pagination.of") || defaultTranslations.of} {filteredData.length} {t?.("pagination.results") || defaultTranslations.results}
          {searchTerm && ` (${t?.("pagination.filteredFrom") || defaultTranslations.filteredFrom} ${data.length} ${t?.("pagination.total") || defaultTranslations.total})`}
        </div>
      </div>
    </div>
  )
}
