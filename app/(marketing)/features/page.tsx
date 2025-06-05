import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, Users, MessageSquare, TrendingUp, Zap, Shield, Globe, BarChart3 } from "lucide-react"
import Link from "next/link"
import { Heading } from "@/components/core/typography/Heading"
import { Text } from "@/components/core/typography/Text"

export default function FeaturesPage() {
  const features = [
    {
      category: "Search & Discovery",
      icon: Search,
      items: [
        {
          title: "Natural Language Search",
          description:
            "Search using conversational queries like 'Find SaaS companies in Switzerland with 50+ employees'",
          badge: "AI-Powered",
        },
        {
          title: "Multi-Source Aggregation",
          description: "Combine data from Google, LinkedIn, Crunchbase, and custom sources",
          badge: "Enterprise",
        },
        {
          title: "Real-time Filtering",
          description: "Dynamic filters for industry, location, company size, and confidence scores",
          badge: "Fast",
        },
      ],
    },
    {
      category: "Data Intelligence",
      icon: BarChart3,
      items: [
        {
          title: "Automated Data Extraction",
          description: "Extract emails, phones, technologies, and social media with 95%+ accuracy",
          badge: "High Accuracy",
        },
        {
          title: "Confidence Scoring",
          description: "AI-powered confidence metrics for every extracted data point",
          badge: "Reliable",
        },
        {
          title: "Technology Detection",
          description: "Identify tech stacks, frameworks, and tools used by companies",
          badge: "Technical",
        },
      ],
    },
    {
      category: "Communication Hub",
      icon: MessageSquare,
      items: [
        {
          title: "Multi-Channel Outreach",
          description: "Send emails, SMS, and WhatsApp messages from one platform",
          badge: "Unified",
        },
        {
          title: "Template Management",
          description: "Create, manage, and optimize message templates with AI assistance",
          badge: "Smart",
        },
        {
          title: "Campaign Analytics",
          description: "Track open rates, response rates, and conversion metrics",
          badge: "Insights",
        },
      ],
    },
    {
      category: "Market Intelligence",
      icon: TrendingUp,
      items: [
        {
          title: "Competitor Analysis",
          description: "Monitor competitors and analyze market positioning",
          badge: "Strategic",
        },
        {
          title: "Lead Scoring",
          description: "AI-powered lead qualification and prioritization",
          badge: "Predictive",
        },
        {
          title: "Relationship Mapping",
          description: "Visualize company connections and partnerships",
          badge: "Network",
        },
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-surface/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
              <Search className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-semibold text-primary">S-I-K-R-Y</span>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-sm font-medium text-secondary hover:text-primary transition-colors">
              Home
            </Link>
            <span className="text-sm font-medium text-primary">Features</span>
            <Link href="/pricing" className="text-sm font-medium text-secondary hover:text-primary transition-colors">
              Pricing
            </Link>
            <Button size="sm" className="bg-accent hover:bg-accent/90">
              Get Started
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="secondary" className="mb-6 bg-accent/10 text-accent border-accent/20">
            <Zap className="w-3 h-3 mr-1" />
            Comprehensive Feature Set
          </Badge>
          <Heading level={1} className="mb-6">
            Everything You Need for <span className="text-accent">Business Intelligence</span>
          </Heading>
          <Text size="lg" className="text-secondary">
            Discover the full power of S-I-K-R-Y with advanced AI capabilities, unified communications, and
            comprehensive market intelligence tools.
          </Text>
        </div>

        {/* Features Grid */}
        <div className="space-y-16">
          {features.map((category, categoryIndex) => (
            <div key={categoryIndex}>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                  <category.icon className="w-5 h-5 text-white" />
                </div>
                <Heading level={2}>{category.category}</Heading>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {category.items.map((feature, featureIndex) => (
                  <Card key={featureIndex} className="shadow-card hover:shadow-floating transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <CardTitle className="text-lg">{feature.title}</CardTitle>
                        <Badge variant="outline" className="text-xs">
                          {feature.badge}
                        </Badge>
                      </div>
                      <CardDescription>{feature.description}</CardDescription>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Security & Compliance */}
        <div className="mt-16 p-8 bg-gradient-to-r from-primary/5 to-accent/5 rounded-xl border">
          <div className="text-center mb-8">
            <Shield className="w-12 h-12 mx-auto text-primary mb-4" />
            <Heading level={2} className="mb-4">
              Enterprise Security & Compliance
            </Heading>
            <Text className="text-secondary max-w-2xl mx-auto">
              Built with enterprise-grade security and compliance features to protect your data and ensure regulatory
              adherence.
            </Text>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Shield className="w-8 h-8 text-emerald-600" />
              </div>
              <Text className="font-medium">SOC 2 Certified</Text>
              <Text size="sm" className="text-secondary">
                Type II compliance
              </Text>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Globe className="w-8 h-8 text-blue-600" />
              </div>
              <Text className="font-medium">GDPR Compliant</Text>
              <Text size="sm" className="text-secondary">
                EU data protection
              </Text>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Users className="w-8 h-8 text-purple-600" />
              </div>
              <Text className="font-medium">Role-Based Access</Text>
              <Text size="sm" className="text-secondary">
                Granular permissions
              </Text>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Zap className="w-8 h-8 text-orange-600" />
              </div>
              <Text className="font-medium">99.9% Uptime</Text>
              <Text size="sm" className="text-secondary">
                SLA guarantee
              </Text>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary to-accent text-white">
        <div className="container mx-auto px-4 py-16 text-center">
          <Heading level={2} className="text-white mb-4">
            Ready to Experience These Features?
          </Heading>
          <Text size="lg" className="opacity-90 mb-8 max-w-2xl mx-auto">
            Start your free trial today and discover how S-I-K-R-Y can transform your business intelligence workflow.
          </Text>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/search">Start Free Trial</Link>
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-primary">
              Schedule Demo
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
