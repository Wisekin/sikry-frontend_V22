//WORKING TRANSLATIONS:

export const translations = {
  en: {
    statistics: {
      dashboard: {
        title: "Enterprise Analytics Dashboard",
        description: "Monitor key metrics, track performance, and gain valuable insights into your business operations.",
        keyMetrics: {
          totalCompanies: "Total Companies",
          activeScrapers: "Active Scrapers",
          campaigns: "Campaigns",
          dataQuality: "Data Quality",
          lastRun: "Last run: {time} ago",
          deliveryRate: "{rate}% delivery rate",
          changeFromLastMonth: "{change}% from last month"
        },
        analyticsCards: {
          collectionTrends: "Collection Trends",
          sectorAnalysis: "Sector Analysis",
          expand: "Expand",
          collapse: "Collapse",
          topPerformingSources: "Top Performing Sources:",
          linkedinScraper: "LinkedIn Scraper",
          companyWebsites: "Company Websites",
          publicDirectories: "Public Directories"
        },
        tabs: {
          overview: "Overview",
          performance: "Performance",
          dataSources: "Data Sources",
          quality: "Quality"
        },
        overview: {
          dataCollectionSummary: "Data Collection Summary",
          totalRecords: "Total Records",
          thisMonth: "This Month",
          successRate: "Success Rate",
          topIndustries: "Top Industries",
          technology: "Technology",
          finance: "Finance",
          healthcare: "Healthcare",
          regionalDistribution: "Regional Distribution",
          dachRegion: "DACH Region",
          eu: "EU",
          global: "Global"
        },
        performance: {
          metrics: "Performance Metrics",
          uptime: "Uptime",
          avgResponse: "Avg Response",
          errorRate: "Error Rate"
        },
        dataSources: {
          title: "Data Source Performance",
          source: "Source",
          records: "Records",
          quality: "Quality",
          status: "Status",
          active: "Active",
          monitoring: "Monitoring",
          needsAttention: "Needs Attention",
          apiIntegrations: "API Integrations"
        },
        quality: {
          title: "Data Quality Breakdown",
          description: "An overview of the core data quality dimensions.",
          completeness: "Completeness",
          accuracy: "Accuracy",
          freshness: "Freshness"
        }
      }
    },
    nav: {
      dashboard: "Dashboard",
      search: "Search",
      companies: "Companies",
      marketIntel: "Market Intel",
      scrapers: "Scrapers",
      statistics: "Statistics",
      statisticsOverview: "Statistics Overview",
      statisticsCollectionTrends: "Collection Trends",
      statisticsGeographicDistribution: "Geographic Distribution",
      statisticsSectorDistribution: "Sector Distribution",
      statisticsSourceComparison: "Source Comparison",
      scrapersOverview: "Scrapers Overview",
      newScraper: "New Scraper",
      runScraper: "Run Scraper",
      scheduleJob: "Schedule Job",
      settings: "Settings",
      admin: "Admin",
      financial: "Financial",
      reengagement: "Re-engagement",
      referrals: "Referrals",
      reviews: "Reviews",
      funnels: "Funnels",
      gapAnalysis: "Gap Analysis",
      vsl: "VSL Pages",
      leadResponse: "Lead Response",
      analytics: "Analytics",
      secondary: {
        addCompany: "Add Company",
        importCompanies: "Import Companies",
        exportData: "Export Data",
        newMessage: "New Message",
        newCampaign: "New Campaign",
        templates: "Templates",
        newScraper: "New Scraper",
        runScraper: "Run Scraper",
        scheduleJob: "Schedule Job"
      }
    },
    comms: {
      campaigns: "Campaigns",
      bulkSender: "Bulk Sender",
      newMessage: "New Message",
      newCampaign: "New Campaign",
      channel: "Channel",
      subject: "Subject",
      content: "Content",
      recipient: "Recipient",
      status: "Status",
      sentAt: "Sent At",
      deliveredAt: "Delivered At",
      openedAt: "Opened At",
      clickedAt: "Clicked At"
    },
    companies: {
      title: "Companies",
      addNew: "Add New Company",
      import: "Import Companies",
      export: "Export Companies",
      name: "Company Name",
      domain: "Domain",
      industry: "Industry",
      location: "Location",
      size: "Company Size",
      confidence: "Confidence",
      lastContacted: "Last Contacted",
      verified: "Verified",
      description: "Description",
      website: "Website",
      phone: "Phone",
      employees: "Employees",
      card: {
        employees: "employees",
        extractedData: "Extracted Data",
        lastUpdated: "Last Updated",
        viewDetails: "View Details",
        more: "more",
        confidence: {
          high: "High Confidence",
          medium: "Medium Confidence",
          low: "Low Confidence"
        }
      }
    },
    search: {
      title: "Search Companies",
      placeholder: "Search companies, contacts, or market data...",
      recentSearches: "Recent Searches",
      suggestions: {
        title: "Suggestions",
        quick: "Quick suggestions",
        recent: "Recent Searches",
        examples: {
          marketing: "Marketing agencies in Geneva using HubSpot",
          compare: "Compare SaaS companies with Series A funding",
          analyze: "Analyze tech startups using React with >50 employees",
          filter: "Filter Fintech companies in Switzerland by revenue"
        }
      },
      refine: "Refine your search...",
      searching: "Searching...",
      searchingMultiple: "Searching multiple sources...",
      results: "Found {{count}} results for '{{query}}'",
      all: "all companies",
      export: "Export Results",
      noResults: "No results found",
      tryAdjusting: "Try adjusting your filters or search terms",
      filters: {
        label: "Filters",
        dataSources: "Data Sources",
        industry: "Industry",
        allIndustries: "All Industries",
        softwareDev: "Software Development",
        marketing: "Marketing & Advertising",
        fintech: "Financial Technology",
        location: "Location",
        enterLocation: "Enter location...",
        companySize: "Company Size",
        allSizes: "All Sizes",
        employees: "Employees",
        minConfidence: "Minimum Confidence",
        anyScore: "Any Score",
        clear: "Clear Filters"
      },
      dataSources: {
        title: "Data Sources",
        internal: "Internal Database",
        wikidata: "Wikidata",
        opencorporates: "OpenCorporates",
        businessRegistries: "Business Registries"
      },
      viewModes: {
        grid: "Grid View",
        list: "List View",
        map: "Map View"
      }
    },
    dashboard: {
      title: "Dashboard",
      welcome: "Welcome back",
      overview: "Overview",
      totalCompanies: "Total Companies",
      totalCommunications: "Total Communications",
      activeScrapers: "Active Scrapers",
      recentActivity: "Recent Activity",
      quickActions: "Quick Actions",
      insights: "Insights",
      performance: "Performance"
    },
    financial: {
      dashboard: "Financial Dashboard",
      dashboardDescription: "Overview of your financial data",
      addRecord: "Add Record",
      records: "Records",
      summary: "Summary",
      campaignRoi: "Campaign ROI",
      campaignROI: "Campaign ROI",
      campaign: "Campaign",
      revenue: "Revenue",
      cost: "Cost",
      costs: "Costs",
      expense: "Expense",
      refund: "Refund",
      currency: "Currency",
      type: "Type",
      source: "Source",
      amount: "Amount",
      category: "Category",
      netProfit: "Net Profit",
      roi: "ROI"
    },
    reengagement: {
      tasks: "Tasks",
      classification: "Classification",
      automation: "Automation"
    },
    referrals: {
      dashboard: "Dashboard",
      tracking: "Tracking",
      rewards: "Rewards"
    },
    reviews: {
      requests: "Requests",
      booster: "Booster",
      monitoring: "Monitoring"
    },
    funnels: {
      builder: "Builder",
      progress: "Progress",
      automation: "Automation"
    },
    gapAnalysis: {
      form: "Analysis Form",
      letters: "Sales Letters",
      results: "Results"
    },
    vsl: {
      templates: "Templates",
      pages: "Pages",
      tracking: "Tracking"
    },
    leadResponse: {
      rules: "Rules",
      queue: "Queue",
      analytics: "Analytics"
    },

    admin: {
      title: "Administration",
      description: "Manage system settings, users, and compliance",
      teamManagement: "Team Management",
      billing: "Billing & Usage",
      antiSpam: "Anti-Spam Settings",
      compliance: "Compliance",
      systemHealth: "System Health",
      users: "Users",
      roles: "Roles",
      permissions: "Permissions",
      security: {
        activeSessions: "Active Sessions",
        manageActiveSessions: "Manage your active sessions",
        recentEvents: "Recent Events",
        securityEventLog: "Security Event Log"
      }
    },
    form: {
      save: "Save",
      cancel: "Cancel",
      submit: "Submit",
      reset: "Reset",
      required: "Required",
      optional: "Optional",
      loading: "Loading...",
      saving: "Saving...",
      saved: "Saved successfully",
      error: "An error occurred"
    },
    pagination: {
      showing: "Showing",
      to: "to",
      of: "of",
      results: "results",
      rowsPerPage: "Rows per page:",
      page: "Page",
      goToPage: "Go to page"
    },
    common: {
      previous: "Previous",
      next: "Next",
      delete: "Delete",
      edit: "Edit",
      view: "View",
      actions: "Actions",
      yes: "Yes",
      no: "No",
      confirm: "Confirm",
      close: "Close",
      open: "Open",
      new: "New",
      create: "Create",
      update: "Update",
      refresh: "Refresh",
      search: "Search",
      filter: "Filter",
      sort: "Sort",
      export: "Export",
      import: "Import",
      all: "All",
      description: "Description",
      date: "Date"
    },
    status: {
      active: "Active",
      inactive: "Inactive",
      pending: "Pending",
      completed: "Completed",
      failed: "Failed",
      running: "Running",
      scheduled: "Scheduled",
      draft: "Draft",
      sent: "Sent",
      delivered: "Delivered",
      opened: "Opened",
      clicked: "Clicked",
      bounced: "Bounced"
    },
    error: {
      general: "An error occurred",
      notFound: "Not found",
      unauthorized: "Unauthorized",
      forbidden: "Forbidden",
      serverError: "Server error",
      networkError: "Network error",
      tryAgain: "Please try again",
      contactSupport: "Contact support if the problem persists"
    },
    success: {
      created: "Created successfully",
      updated: "Updated successfully",
      deleted: "Deleted successfully",
      sent: "Sent successfully",
      imported: "Imported successfully",
      exported: "Exported successfully"
    },
    ai: {
      title: "AI Assistant",
      welcome: "Hi! I'm your AI assistant. I can help you find companies, create scrapers, or analyze market data. What would you like to do?",
      openAssistant: "Open AI Assistant",
      placeholder: "Ask me anything...",
      quickSuggestions: "Quick suggestions",
      response: "I understand you want to {{query}}. Let me help you with that...",
      suggestions: {
        findCompanies: "Find tech companies in Switzerland",
        createScraper: "Create a LinkedIn scraper",
        analyzeMarket: "Analyze market trends",
        leadStrategy: "Suggest lead generation strategy"
      }
    },
    statisticsPages: {
      collectionTrends: {
        pageTitle: "Data Collection Trends",
        pageSubtitle: "Analyze trends in data acquisition over time.",
        newRecordsThisPeriod: "New Records This Period",
        growthRate: "Growth Rate",
        peakCollection: "Peak Collection",
        peakCollectionDetail: "on {peakDate}",
        volumeOverTime: "Collection Volume Over Time",
        daily: "Daily",
        weekly: "Weekly",
        monthly: "Monthly",
        vsLastPeriod: "vs last period",
        noTrendData: "No trend data available for the selected period.",
        dataQuality: "Data Quality Metrics",
        completeness: "Completeness",
        accuracy: "Accuracy",
        timeliness: "Timeliness",
        dataSources: "Data Sources"
      },
      geographicDistribution: {
        pageTitle: "Geographic Distribution",
        pageSubtitle: "View the geographic spread of your data collection.",
        totalRegionsCovered: "Total Regions Covered",
        topRegion: "Top Region",
        regionsWithGrowth: "Regions with Growth",
        distributionMap: "Distribution Map",
        allDataTypes: "All Data Types",
        topRegionsByVolume: "Top Regions by Data Volume",
        region: "Region",
        recordCount: "Record Count",
        growth: "Growth",
        filterByCountry: "Filter by Country",
        filterByRegion: "Filter by Region"
      },
      sectorDistribution: {
        pageTitle: "Sector Distribution",
        pageSubtitle: "Analyze the distribution of data across different sectors.",
        totalSectorsTracked: "Total Sectors Tracked",
        fastestGrowingSector: "Fastest Growing Sector",
        distributionBySector: "Distribution by Sector",
        companiesPerSector: "Companies per Sector",
        sectorGrowth: "Sector Growth",
        filterBySector: "Filter by Sector",
        noSectorData: "No sector data available",
        sectorBreakdown: "Sector Breakdown",
        companyCount: "Company Count"
      },
      sourceComparison: {
        pageTitle: "Comparaison des Sources de Données",
        pageSubtitle: "Évaluez et comparez la performance de vos différentes sources de données.",
        totalDataSources: "Total Sources de Données",
        highestVolumeSource: "Source au Volume le Plus Élevé",
        bestQualitySource: "Source de Meilleure Qualité",
        compareBy: "Comparer par :",
        allMetrics: "Toutes Métriques",
        dataVolume: "Volume de Données",
        qualityScore: "Score de Qualité",
        coveragePercentage: "Pourcentage de Couverture",
        sourcePerformanceMetrics: "Métriques de Performance des Sources",
        detailedSourceMetrics: "Métriques Détaillées des Sources",
        sourceName: "Nom de la Source",
        updateFrequency: "Fréquence de Mise à Jour"
      },
      commonFilters: {
        apply: "Appliquer"
      }
    },
    analyticsPages: {
      overview: {
        pageTitle: "Analytics Overview",
        pageSubtitle: "Explore key metrics and insights across your application.",
        overallKeyMetric: "Overall Key Metric"
      }
    },
    status: {
      sent: "Sent",
      bounced: "Bounced"
    },
    error: {
      contactSupport: "Contact support if the problem persists"
    },
    success: {
      sent: "Sent successfully",
      exported: "Exported successfully"
    },

    ai: {
      openAssistant: "Open AI Assistant"
    }
  },
  fr: {
    statistics: {
      dashboard: {
        title: "Tableau de Bord d'Analyse d'Entreprise",
        description: "Surveillez les indicateurs clés, suivez les performances et obtenez des informations précieuses sur vos opérations commerciales.",
        keyMetrics: {
          totalCompanies: "Total des Entreprises",
          activeScrapers: "Scrapeurs Actifs",
          campaigns: "Campagnes",
          dataQuality: "Qualité des Données",
          lastRun: "Dernière exécution : il y a {time}",
          deliveryRate: "Taux de livraison de {rate}%",
          changeFromLastMonth: "{change}% par rapport au mois dernier"
        },
        analyticsCards: {
          collectionTrends: "Tendances de Collecte",
          sectorAnalysis: "Analyse par Secteur",
          expand: "Développer",
          collapse: "Réduire",
          topPerformingSources: "Sources les plus performantes :",
          linkedinScraper: "Extracteur LinkedIn",
          companyWebsites: "Sites Web d'Entreprises",
          publicDirectories: "Annuaires Publics"
        },
        tabs: {
          overview: "Vue d'Ensemble",
          performance: "Performance",
          dataSources: "Sources de Données",
          quality: "Qualité"
        },
        overview: {
          dataCollectionSummary: "Résumé de la Collecte de Données",
          totalRecords: "Total des Enregistrements",
          thisMonth: "Ce Mois-ci",
          successRate: "Taux de Réussite",
          topIndustries: "Secteurs Principaux",
          technology: "Technologie",
          finance: "Finance",
          healthcare: "Santé",
          regionalDistribution: "Répartition Régionale",
          dachRegion: "Région DACH",
          eu: "UE",
          global: "Monde"
        },
        performance: {
          metrics: "Métriques de Performance",
          uptime: "Disponibilité",
          avgResponse: "Temps de Réponse Moyen",
          errorRate: "Taux d'Erreur"
        },
        dataSources: {
          title: "Performance des Sources de Données",
          source: "Source",
          records: "Enregistrements",
          quality: "Qualité",
          status: "Statut",
          active: "Actif",
          monitoring: "Surveillance",
          needsAttention: "Nécessite une Attention",
          apiIntegrations: "Intégrations API"
        },
        quality: {
          title: "Analyse de la Qualité des Données",
          description: "Aperçu des dimensions clés de la qualité des données.",
          completeness: "Exhaustivité",
          accuracy: "Exactitude",
          freshness: "Fraîcheur"
        }
      }
    },
    statisticsPages: {
      collectionTrends: {
        pageTitle: "Tendances de la Collecte de Données",
        pageSubtitle: "Analysez les tendances d'acquisition de données au fil du temps.",
        newRecordsThisPeriod: "Nouveaux Enregistrements (Période)",
        growthRate: "Taux de Croissance",
        peakCollection: "Pic de Collecte",
        peakCollectionDetail: "le {peakDate}",
        volumeOverTime: "Volume de Collecte au Fil du Temps",
        daily: "Quotidien",
        weekly: "Hebdomadaire",
        monthly: "Mensuel",
        vsLastPeriod: "vs période précédente",
        noTrendData: "Aucune donnée de tendance disponible pour la période sélectionnée.",
        dataQuality: "Métriques de Qualité des Données",
        completeness: "Exhaustivité",
        accuracy: "Exactitude",
        timeliness: "Actualité",
        dataSources: "Sources de Données"
      },
      geographicDistribution: {
        pageTitle: "Distribution Géographique des Données",
        pageSubtitle: "Visualisez la répartition de vos données à travers différentes régions.",
        totalRegionsCovered: "Total Régions Couvertes",
        topRegion: "Région Principale",
        regionsWithGrowth: "Régions en Croissance",
        distributionMap: "Carte de Distribution",
        allDataTypes: "Tous Types de Données",
        topRegionsByVolume: "Top Régions par Volume de Données",
        region: "Région",
        recordCount: "Nombre d'Enregistrements",
        growth: "Croissance",
        filterByCountry: "Filtrer par Pays",
        filterByRegion: "Filtrer par Région"
      },
      sectorDistribution: {
        pageTitle: "Distribution des Données par Secteur",
        pageSubtitle: "Analysez la répartition de vos données par secteurs d'activité.",
        totalSectorsTracked: "Total Secteurs Suivis",
        fastestGrowingSector: "Secteur à Croissance Rapide",
        distributionBySector: "Distribution par Secteur",
        companiesPerSector: "Entreprises par Secteur",
        sectorGrowth: "Croissance par Secteur",
        filterBySector: "Filtrer par Secteur",
        noSectorData: "Aucune donnée de secteur disponible",
        sectorBreakdown: "Répartition par Secteur",
        companyCount: "Nombre d'Entreprises",
        contacts: "Contacts"
      },
      sourceComparison: {
        pageTitle: "Comparaison des Sources de Données",
        pageSubtitle: "Évaluez et comparez la performance de vos différentes sources de données.",
        updateFrequency: "Fréquence de Mise à Jour"
      },
      commonFilters: {
        apply: "Appliquer"
      }
    },
    nav: {
      dashboard: "Tableau de bord",
      search: "Recherche",
      companies: "Entreprises",
      communications: "Communications",
      marketIntel: "Intelligence marché",
      scrapers: "Scrapeurs",
      statistics: "Statistiques",
      statisticsOverview: "Vue d'ensemble des statistiques",
      statisticsCollectionTrends: "Tendances de collecte",
      statisticsGeographicDistribution: "Distribution géographique",
      statisticsSectorDistribution: "Distribution par secteur",
      statisticsSourceComparison: "Comparaison des sources",
      scrapersOverview: "Vue d'ensemble des scrapeurs",
      newScraper: "Nouveau scrapeur",
      settings: "Paramètres",
      admin: "Administration",
      financial: "Financier",
      reengagement: "Réengagement",
      referrals: "Parrainages",
      reviews: "Avis",
      funnels: "Entonnoirs",
      gapAnalysis: "Analyse des écarts",
      vsl: "Pages VSL",
      leadResponse: "Réponse aux leads",
      analytics: "Analytique",
      overview: "Vue d'ensemble",
      secondary: {
        addCompany: "Ajouter une entreprise",
        importCompanies: "Importer des entreprises",
        exportData: "Exporter les données",
        newMessage: "Nouveau message",
        newCampaign: "Nouvelle campagne",
        templates: "Modèles",
        newScraper: "Nouveau scrapeur",
        runScraper: "Exécuter le scrapeur",
        scheduleJob: "Planifier une tâche"
      }
    },
    comms: {
      campaigns: "Campagnes",
      templates: "Modèles",
      bulkSender: "Envoi en masse",
      newMessage: "Nouveau message",
      newCampaign: "Nouvelle campagne",
      channel: "Canal",
      subject: "Sujet",
      content: "Contenu",
      recipient: "Destinataire",
      status: "Statut",
      sentAt: "Envoyé le",
      deliveredAt: "Livré le",
      openedAt: "Ouvert le",
      clickedAt: "Cliqué le"
    },
    companies: {
      title: "Entreprises",
      addNew: "Ajouter une nouvelle entreprise",
      import: "Importer des entreprises",
      export: "Exporter des entreprises",
      name: "Nom de l'entreprise",
      domain: "Domaine",
      industry: "Industrie",
      location: "Localisation",
      size: "Taille de l'entreprise",
      confidence: "Confiance",
      lastContacted: "Dernier contact",
      verified: "Vérifié",
      website: "Site web",
      phone: "Téléphone",
      email: "Email",
      employees: "Employés",
      card: {
        employees: "employés",
        extractedData: "Données extraites",
        lastUpdated: "Dernière mise à jour",
        viewDetails: "Voir les détails",
        more: "plus",
        confidence: {
          high: "Confiance élevée",
          medium: "Confiance moyenne",
          low: "Confiance faible"
        }
      }
    },
    search: {
      title: "Rechercher des entreprises",
      placeholder: "Rechercher des entreprises ou des sujets...",
      recentSearches: "Recherches récentes",
      suggestions: {
        title: "Suggestions",
        quick: "Suggestions rapides",
        recent: "Recherches récentes",
        examples: {
          marketing: "Agences de marketing à Genève utilisant HubSpot",
          compare: "Comparer les entreprises SaaS avec un financement Series A",
          analyze: "Analyser les startups tech utilisant React avec >50 employés",
          filter: "Filtrer les entreprises Fintech en Suisse par revenu"
        }
      },
      refine: "Affinez votre recherche...",
      searching: "Recherche en cours...",
      searchingMultiple: "Recherche dans plusieurs sources...",
      results: "{{count}} résultats trouvés pour '{{query}}'",
      all: "toutes les entreprises",
      export: "Exporter les résultats",
      noResults: "Aucun résultat trouvé",
      tryAdjusting: "Essayez d'ajuster vos filtres ou termes de recherche",
      filters: {
        label: "Filtres",
        dataSources: "Sources de données",
        industry: "Industrie",
        allIndustries: "Toutes les industries",
        softwareDev: "Développement logiciel",
        marketing: "Marketing & Publicité",
        fintech: "Technologie financière",
        location: "Localisation",
        enterLocation: "Entrer la localisation...",
        companySize: "Taille de l'entreprise",
        allSizes: "Toutes les tailles",
        employees: "Employés",
        minConfidence: "Score de confiance minimum",
        clear: "Effacer les filtres"
      },
      dataSources: {
        title: "Sources de données",
        internal: "Base de données interne",
        businessRegistries: "Registres du commerce"
      },
      viewModes: {
        grid: "Vue grille",
        list: "Vue liste",
        map: "Vue carte"
      }
    },
    dashboard: {
      title: "Tableau de bord",
      welcome: "Bon retour",
      overview: "Aperçu",
      totalCompanies: "Total entreprises",
      totalCommunications: "Total communications",
      activeScrapers: "Extracteurs actifs",
      recentActivity: "Activité récente",
      quickActions: "Actions rapides",
      performance: "Performance"
    },
    financial: {
      dashboard: "Tableau de bord financier",
      dashboardDescription: "Aperçu de vos données financières",
      addRecord: "Ajouter un enregistrement",
      records: "Enregistrements",
      summary: "Résumé",
      campaignRoi: "ROI de la campagne",
      campaignROI: "ROI de la campagne",
      campaign: "Campagne",
      revenue: "Revenu",
      cost: "Coût",
      costs: "Coûts",
      expense: "Dépense",
      refund: "Remboursement",
      currency: "Devise",
      amount: "Montant",
      category: "Catégorie",
      netProfit: "Bénéfice net",
      roi: "ROI"
    },
    reengagement: {
      tasks: "Tâches",
      automation: "Automatisation"
    },
    referrals: {
      dashboard: "Tableau de bord",
      tracking: "Suivi",
      rewards: "Récompenses"
    },
    reviews: {
      requests: "Demandes",
      monitoring: "Surveillance"
    },
    funnels: {
      builder: "Constructeur",
      progress: "Progrès",
      automation: "Automatisation"
    },
    gapAnalysis: {
      form: "Formulaire d'analyse",
      letters: "Lettres de vente",
      results: "Résultats"
    },
    vsl: {
      tracking: "Suivi"
    },
    leadResponse: {
      rules: "Règles",
      queue: "File d'attente",
      analytics: "Analytique"
    },
    analytics: {
      performance: "Performance",
      conversion: "Conversion",
      revenue: "Revenu",
      prioritizedProspects: "Prospects prioritaires par potentiel d'engagement",
      marketTrends: "Tendances du Marché",
      emergingOpportunities: "Opportunités émergentes par secteur",
      growth: "croissance",
      marketOpportunityAlert: "Alerte d'Opportunité de Marché",
      fintechSector: "Secteur fintech affichant un potentiel de croissance de 23% - 42 cibles à haute valeur identifiées",
      exploreOpportunities: "Explorer les Opportunités"
    },
    scrapers: {
      title: "Gestion des Scrapeurs",
      description: "Créez, gérez et surveillez vos robots de collecte de données",
      createScraper: "Créer un Scrapeur",
      activeScrapers: "Scrapeurs Actifs",
      successRate: "Taux de Réussite",
      totalJobs: "Total des Tâches",
      v2Scrapers: "Scrapeurs V2",
      nextGenScrapers: "Scrapeurs nouvelle génération",
      scraperManagement: "Gestion des Scrapeurs",
      searchPlaceholder: "Rechercher des scrapeurs...",
      filterByStatus: "Filtrer par statut",
      allStatuses: "Tous les statuts",
      active: "Actif",
      inactive: "Inactif",
      running: "En cours",
      error: "Erreur",
      filterByType: "Filtrer par type",
      allTypes: "Tous les types",
      v1: "V1",
      v2: "V2",
      api: "API",
      noScrapers: "Aucun scrapeur trouvé",
      createFirstScraper: "Créer votre premier scrapeur",
      lastRun: "Dernière exécution",
      never: "Jamais",
      runs: "exécutions",
      success: "succès",
      last24Hours: "Dernières 24 heures"
    },
    marketIntel: {
      title: "Tableau de Bord d'Intelligence Marché",
      description: "Informations stratégiques sur les concurrents, les tendances du marché et les opportunités de croissance",
      stats: {
        marketSize: "Taille du Marché",
        competitorsTracked: "Concurrents Suivis",
        leadScoreAvg: "Score Moyen des Leads",
        opportunities: "Opportunités",
        currentlyRunning: "Actuellement en cours",
        highPotential: "Haut potentiel"
      },
      competitorLandscape: "Paysage Concurrentiel",
      marketPosition: "Analyse de la position sur le marché",
      relationshipMapping: "Cartographie des Relations",
      industryConnections: "Connexions entre les acteurs du secteur et les parties prenantes clés",
      leadScoring: "Notation des Leads",
      exploreOpportunities: "Explorer les Opportunités"
    },
    search: {
      title: "Recherche d'Entreprises",
      placeholder: "Rechercher des entreprises, contacts ou données de marché...",
      suggestions: {
        title: "Suggestions",
        examples: {
          compare: "Comparer les entreprises SaaS avec un financement Série A",
          analyze: "Analyser les startups tech utilisant React avec plus de 50 employés",
          filter: "Filtrer les entreprises Fintech en Suisse par chiffre d'affaires"
        }
      },
      export: "Exporter les résultats",
      tryAdjusting: "Essayez d'ajuster vos filtres ou vos termes de recherche pour une meilleure correspondance.",
      clearAllFilters: "Réinitialiser tous les filtres",
      advancedFilters: "Filtres avancés",
      locationPlaceholder: "ex: Genève, Suisse",
      filters: {
        allFilters: "Tous les filtres",
        industry: "Secteur d'activité",
        allIndustries: "Tous les secteurs",
        marketing: "Marketing et Publicité",
        fintech: "Technologie Financière",
        enterLocation: "Saisir une localisation...",
        allSizes: "Toutes tailles",
        anyScore: "Tous les scores",
      },
      dataSources: {
        title: "Sources de données",
        businessRegistries: "Registres du commerce"
      },
      viewModes: {
        grid: "Vue Grille",
        list: "Vue Liste",
        map: "Vue Carte"
      },
      scrapers: {
        title: "Gestion des Scrapeurs",
        description: "Créez, gérez et surveillez vos robots de collecte de données",
        createScraper: "Créer un Scrapeur",
        activeScrapers: "Scrapeurs Actifs",
        successRate: "Taux de Réussite",
        totalJobs: "Total des Tâches",
        v2Scrapers: "Scrapeurs V2",
        nextGenScrapers: "Scrapeurs nouvelle génération",
        scraperManagement: "Gestion des Scrapeurs",
        searchPlaceholder: "Rechercher des scrapeurs...",
        filterByStatus: "Filtrer par statut",
        allStatuses: "Tous les statuts",
        active: "Actif",
        inactive: "Inactif",
        running: "En cours",
        error: "Erreur",
        filterByType: "Filtrer par type",
        allTypes: "Tous les types",
        v1: "V1",
        v2: "V2",
        api: "API",
        noScrapers: "Aucun scrapeur trouvé",
        createFirstScraper: "Créer votre premier scrapeur",
        lastRun: "Dernière exécution",
        never: "Jamais",
        runs: "exécutions",
        success: "succès",
        last24Hours: "Dernières 24 heures"
      }
    },
    admin: {
      title: "Administration",
      description: "Gérer les paramètres système, utilisateurs et conformité",
      teamManagement: "Gestion d'équipe",
      billing: "Facturation et utilisation",
      antiSpam: "Paramètres anti-spam",
      compliance: "Conformité",
      systemHealth: "Santé du système",
      users: "Utilisateurs",
      roles: "Rôles",
      security: {
        activeSessions: "Sessions actives",
        manageActiveSessions: "Gérer vos sessions actives",
        recentEvents: "Événements récents",
        securityEventLog: "Journal des événements de sécurité"
      }
    },
    form: {
      save: "Enregistrer",
      submit: "Soumettre",
      reset: "Réinitialiser",
      required: "Requis",
      optional: "Optionnel",
      loading: "Chargement...",
      saving: "Enregistrement...",
      saved: "Enregistré avec succès",
      error: "Une erreur s'est produite"
    },
    pagination: {
      showing: "Affichage de",
      to: "à",
      of: "sur",
      results: "résultats",
      rowsPerPage: "Lignes par page :",
      goToPage: "Aller à la page"
    },
    common: {
      previous: "Précédent",
      next: "Suivant",
      delete: "Supprimer",
      edit: "Modifier",
      view: "Voir",
      yes: "Oui",
      no: "Non",
      confirm: "Confirmer",
      open: "Ouvrir",
      new: "Nouveau",
      create: "Créer",
      update: "Mettre à jour",
      refresh: "Actualiser",
      search: "Rechercher",
      filter: "Filtrer",
      sort: "Trier",
      export: "Exporter",
      import: "Importer",
      all: "Tout",
      description: "Description",
      date: "Date"
    },
    status: {
      pending: "En attente",
      completed: "Terminé",
      failed: "Échoué",
      scheduled: "Planifié",
      draft: "Brouillon",
      sent: "Envoyé",
      delivered: "Livré",
      opened: "Ouvert",
      clicked: "Cliqué",
      bounced: "Rejeté"
    },
    error: {
      general: "Une erreur s'est produite",
      notFound: "Non trouvé",
      unauthorized: "Non autorisé",
      forbidden: "Interdit",
      serverError: "Erreur serveur",
      networkError: "Erreur réseau",
      tryAgain: "Veuillez réessayer",
      contactSupport: "Contactez le support si le problème persiste"
    },
    success: {
      created: "Créé avec succès",
      updated: "Mis à jour avec succès",
      deleted: "Supprimé avec succès",
      sent: "Envoyé avec succès",
      imported: "Importé avec succès",
      exported: "Exporté avec succès"
    },
    ai: {
      title: "Assistant IA",
      welcome: "Salut ! Je suis votre assistant IA. Je peux vous aider à trouver des entreprises, créer des extracteurs, ou analyser les données du marché. Que souhaitez-vous faire ?",
      openAssistant: "Ouvrir l'Assistant IA",
      placeholder: "Demandez-moi n'importe quoi...",
      quickSuggestions: "Suggestions rapides",
      response: "Je comprends que vous voulez {{query}}. Laissez-moi vous aider avec cela...",
      suggestions: {
        findCompanies: "Trouver des entreprises tech en Suisse",
        createScraper: "Créer un extracteur LinkedIn",
        analyzeMarket: "Analyser les tendances du marché",
        leadStrategy: "Suggérer une stratégie de génération de leads"
      }
    }
  }
}
