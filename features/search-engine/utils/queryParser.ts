export interface ParsedQuery {
  intent: "search" | "filter" | "compare" | "analyze"
  entities: {
    companies: string[]
    locations: string[]
    industries: string[]
    technologies: string[]
  }
  filters: {
    location?: string
    industry?: string
    size?: string
    revenue?: string
    founded?: string
  }
  operators: {
    comparison?: "greater" | "less" | "equal" | "between"
    logic?: "and" | "or" | "not"
  }
}

export class QueryParser {
  private static readonly INTENT_KEYWORDS = {
    search: ["find", "show", "get", "list"],
    filter: ["filter", "where", "with", "having"],
    compare: ["compare", "vs", "versus", "against"],
    analyze: ["analyze", "analysis", "insights", "trends"],
  }

  private static readonly ENTITY_PATTERNS = {
    location: /(?:in|from|located|based)\s+([^,\s]+(?:\s+[^,\s]+)*)/gi,
    industry: /(?:industry|sector|field):\s*([^,]+)/gi,
    size: /(?:size|employees|staff):\s*([^,]+)/gi,
    revenue: /(?:revenue|sales|turnover):\s*([^,]+)/gi,
    technology: /(?:using|with|technology|tech|stack):\s*([^,]+)/gi,
  }

  static parse(query: string): ParsedQuery {
    const normalizedQuery = query.toLowerCase().trim()

    return {
      intent: this.extractIntent(normalizedQuery),
      entities: this.extractEntities(query),
      filters: this.extractFilters(query),
      operators: this.extractOperators(normalizedQuery),
    }
  }

  private static extractIntent(query: string): ParsedQuery["intent"] {
    for (const [intent, keywords] of Object.entries(this.INTENT_KEYWORDS)) {
      if (keywords.some((keyword) => query.includes(keyword))) {
        return intent as ParsedQuery["intent"]
      }
    }
    return "search"
  }

  private static extractEntities(query: string): ParsedQuery["entities"] {
    const entities: ParsedQuery["entities"] = {
      companies: [],
      locations: [],
      industries: [],
      technologies: [],
    }

    // Extract locations
    const locationMatches = [...query.matchAll(this.ENTITY_PATTERNS.location)]
    entities.locations = locationMatches.map((match) => match[1].trim())

    // Extract industries
    const industryMatches = [...query.matchAll(this.ENTITY_PATTERNS.industry)]
    entities.industries = industryMatches.map((match) => match[1].trim())

    // Extract technologies
    const techMatches = [...query.matchAll(this.ENTITY_PATTERNS.technology)]
    entities.technologies = techMatches.map((match) => match[1].trim())

    return entities
  }

  private static extractFilters(query: string): ParsedQuery["filters"] {
    const filters: ParsedQuery["filters"] = {}

    // Location filter
    const locationMatch = query.match(this.ENTITY_PATTERNS.location)
    if (locationMatch) {
      filters.location = locationMatch[1].trim()
    }

    // Industry filter
    const industryMatch = query.match(this.ENTITY_PATTERNS.industry)
    if (industryMatch) {
      filters.industry = industryMatch[1].trim()
    }

    // Size filter
    const sizeMatch = query.match(this.ENTITY_PATTERNS.size)
    if (sizeMatch) {
      filters.size = sizeMatch[1].trim()
    }

    // Revenue filter
    const revenueMatch = query.match(this.ENTITY_PATTERNS.revenue)
    if (revenueMatch) {
      filters.revenue = revenueMatch[1].trim()
    }

    return filters
  }

  private static extractOperators(query: string): ParsedQuery["operators"] {
    const operators: ParsedQuery["operators"] = {}

    // Comparison operators
    if (query.includes("greater than") || query.includes(">")) {
      operators.comparison = "greater"
    } else if (query.includes("less than") || query.includes("<")) {
      operators.comparison = "less"
    } else if (query.includes("equal to") || query.includes("=")) {
      operators.comparison = "equal"
    } else if (query.includes("between")) {
      operators.comparison = "between"
    }

    // Logic operators
    if (query.includes(" and ")) {
      operators.logic = "and"
    } else if (query.includes(" or ")) {
      operators.logic = "or"
    } else if (query.includes(" not ")) {
      operators.logic = "not"
    }

    return operators
  }
}
