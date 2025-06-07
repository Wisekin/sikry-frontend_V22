"use client"

import { useEffect, useState } from "react"
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { getCompanies } from "@/lib/actions/companies"
import type { DiscoveredCompany, Contact } from "@/types/database"
import { format } from "date-fns"

// Dummy getContacts, replace with real import if available
async function getContacts() {
  // Replace with actual API call
  return [] as Contact[]
}

const STATUS_OPTIONS = [
  { value: "pending", label: "Pending" },
  { value: "sent", label: "Sent" },
  { value: "delivered", label: "Delivered" },
  { value: "read", label: "Opened" },
  { value: "answered", label: "Replied" },
  { value: "failed", label: "Failed" },
]

const CHANNEL_OPTIONS = [
  { value: "email", label: "Email" },
  { value: "sms", label: "SMS" },
  { value: "whatsapp", label: "WhatsApp" },
  { value: "call", label: "Call" },
  { value: "linkedin", label: "LinkedIn" },
  { value: "other", label: "Other" },
]

export interface CommunicationFiltersProps {
  onChange?: (filters: Record<string, any>) => void
}

export function CommunicationFilters({ onChange }: CommunicationFiltersProps) {
  const [status, setStatus] = useState<string>("")
  const [channel, setChannel] = useState<string>("")
  const [company, setCompany] = useState<string>("")
  const [contact, setContact] = useState<string>("")
  const [subject, setSubject] = useState<string>("")
  const [dateRange, setDateRange] = useState<{ from: Date | undefined; to?: Date | undefined }>({ from: undefined, to: undefined })
  const [companies, setCompanies] = useState<DiscoveredCompany[]>([])
  const [contacts, setContacts] = useState<Contact[]>([])

  useEffect(() => {
    getCompanies().then(setCompanies)
    getContacts().then(setContacts)
  }, [])

  useEffect(() => {
    if (onChange) {
      onChange({
        status: status === "all" ? undefined : status,
        channel: channel === "all" ? undefined : channel,
        company_id: company === "all" ? undefined : company,
        contact_id: contact === "all" ? undefined : contact,
        subject: subject || undefined,
        sent_from: dateRange.from ? format(dateRange.from, "yyyy-MM-dd") : undefined,
        sent_to: dateRange.to ? format(dateRange.to, "yyyy-MM-dd") : undefined,
      })
    }
  }, [status, channel, company, contact, subject, dateRange, onChange])

  return (
    <Card>
      <CardContent className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {/* Status */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Status</label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger>
                <SelectValue placeholder="All" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                {STATUS_OPTIONS.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Channel */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Channel</label>
            <Select value={channel} onValueChange={setChannel}>
              <SelectTrigger>
                <SelectValue placeholder="All" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                {CHANNEL_OPTIONS.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Company */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Company</label>
            <Select value={company} onValueChange={setCompany}>
              <SelectTrigger>
                <SelectValue placeholder="All" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                {companies.map((c) => (
                  <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Contact */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Contact</label>
            <Select value={contact} onValueChange={setContact}>
              <SelectTrigger>
                <SelectValue placeholder="All" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                {contacts.map((c) => (
                  <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Subject */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Subject</label>
            <Input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Search subject..."
            />
          </div>

          {/* Date Range */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Sent Date</label>
            <div className="relative">
              <Calendar
                mode="range"
                selected={dateRange}
                onSelect={(range) => setDateRange(range ?? { from: undefined, to: undefined })}
                numberOfMonths={1}
                className="rounded-md border"
              />
            </div>
          </div>
        </div>

        {/* Reset Button */}
        <div className="flex justify-end mt-4">
          <Button
            variant="outline"
            onClick={() => {
              setStatus("all")
              setChannel("all")
              setCompany("all")
              setContact("all")
              setSubject("")
              setDateRange({ from: undefined, to: undefined })
            }}
          >
            Reset Filters
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default CommunicationFilters
