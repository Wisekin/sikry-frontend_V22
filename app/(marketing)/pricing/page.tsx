import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, Search, Zap, Crown } from "lucide-react"
import Link from "next/link"
import { Heading } from "@/components/core/typography/Heading"
import { Text } from "@/components/core/typography/Text"

export default function PricingPage() {
  const plans = [
    {
      name: "Starter",
      price: "$49",
      period: "per month",
      description: "Perfect for small teams getting started with business intelligence",
      icon: Search,
      features: [
        "1,000 company searches per month",
        "Basic data extraction",
        "Email outreach (500 emails/month)",
        "Standard templates",
        "Basic analytics",
        "Email support",
      ],
      limitations: ["No SMS/WhatsApp", "No AI insights", "No custom scrapers"],
      cta: "Start Free Trial",
      popular: false,
    },
    {
      name: "Professional",
      price: "$149",
      period: "per month",
      description: "Advanced features for growing businesses and sales teams",
      icon: Zap,
      features: [
        "10,000 company searches per month",
        "Advanced data extraction with AI",
        "Multi-channel outreach (Email, SMS, WhatsApp)",
        "AI-enhanced templates",
        "Advanced analytics & reporting",
        "Lead scoring",
        "Custom scrapers (5 active)",
        "Priority support",
      ],
      limitations: ["Limited market intelligence", "Basic competitor analysis"],
      cta: "Start Free Trial",
      popular: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "contact us",
      description: "Full-featured solution for large organizations",
      icon: Crown,
      features: [
        "Unlimited company searches",
        "Full AI-powered data extraction",
        "Unlimited multi-channel outreach",
        "Custom AI templates",
        "Advanced market intelligence",
        "Comprehensive competitor analysis",
        "Unlimited custom scrapers",
        "Relationship mapping",
        "White-label options",
        "Dedicated account manager",
        "24/7 phone support",
        "Custom integrations",
        "SSO & advanced security",
      ],
      limitations: [],
      cta: "Contact Sales",
      popular: false,
    },
  ]

  const faqs = [
    {
      question: "What's included in the free trial?",
      answer: "All plans include a 14-day free trial with full access to features. No credit card required.",
    },
    {
      question: "Can I change plans anytime?",
      answer: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect at the next billing cycle.",
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, PayPal, and bank transfers for Enterprise plans.",
    },
    {
      question: "Is there a setup fee?",
      answer: "No setup fees for Starter and Professional plans. Enterprise plans may include implementation services.",
    },
    {
      question: "Do you offer discounts for annual billing?",
      answer: "Yes, save 20% when you pay annually. Contact us for custom Enterprise pricing.",
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
            <Link href="/features" className="text-sm font-medium text-secondary hover:text-primary transition-colors">
              Features
            </Link>
            <span className="text-sm font-medium text-primary">Pricing</span>
            <Button size="sm" className="bg-accent hover:bg-accent/90">
              Get Started
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Heading level={1} className="mb-6">
            Simple, Transparent <span className="text-accent">Pricing</span>
          </Heading>
          <Text size="lg" className="text-secondary mb-8">
            Choose the perfect plan for your business intelligence needs. All plans include a 14-day free trial.
          </Text>
          <Badge variant="secondary" className="bg-emerald-50 text-emerald-700 border-emerald-200">
            <Check className="w-3 h-3 mr-1" />
            No setup fees • Cancel anytime • 14-day free trial
          </Badge>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => (
            <Card
              key={index}
              className={`shadow-card hover:shadow-floating transition-all relative ${
                plan.popular ? "ring-2 ring-accent scale-105" : ""
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-accent text-white">Most Popular</Badge>
                </div>
              )}

              <CardHeader className="text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center mx-auto mb-4">
                  <plan.icon className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-primary">{plan.price}</span>
                  <span className="text-secondary ml-2">{plan.period}</span>
                </div>
                <CardDescription className="mt-2">{plan.description}</CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                <div className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      <Text size="sm">{feature}</Text>
                    </div>
                  ))}
                  {plan.limitations.map((limitation, limitIndex) => (
                    <div key={limitIndex} className="flex items-center gap-2 opacity-60">
                      <div className="w-4 h-4 flex-shrink-0" />
                      <Text size="sm" className="line-through">
                        {limitation}
                      </Text>
                    </div>
                  ))}
                </div>

                <Button
                  className={`w-full ${plan.popular ? "bg-accent hover:bg-accent/90" : ""}`}
                  variant={plan.popular ? "default" : "outline"}
                >
                  {plan.cta}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto">
          <Heading level={2} className="text-center mb-8">
            Frequently Asked Questions
          </Heading>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <Card key={index} className="shadow-card">
                <CardHeader>
                  <CardTitle className="text-lg">{faq.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <Text className="text-secondary">{faq.answer}</Text>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary to-accent text-white">
        <div className="container mx-auto px-4 py-16 text-center">
          <Heading level={2} className="text-white mb-4">
            Ready to Get Started?
          </Heading>
          <Text size="lg" className="opacity-90 mb-8 max-w-2xl mx-auto">
            Join thousands of companies already using S-I-K-R-Y to transform their business intelligence.
          </Text>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary">
              Start Free Trial
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
