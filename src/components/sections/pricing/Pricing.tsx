'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Star, Zap, Shield, Users, Rocket } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useSmartNavigation } from '@/hooks/useSmartNavigation';

const DEFAULT_PRICING = {
  badge: 'Flexible Pricing',
  mainTitle: 'Scale Your Business with',
  mainTitleHighlight: 'Transparent Pricing',
  mainDescription:
    'Choose the perfect plan to accelerate your SaaS growth. Start free, upgrade as you scale. No hidden fees, cancel anytime.',
  billingMonthly: 'Monthly',
  billingAnnual: 'Annual',
  billingAnnualBadge: 'Save 25%',
  plan1Name: 'Starter',
  plan1Description: 'Perfect for startups and individual developers',
  plan1Price: 'Free',
  plan1CTA: 'Start Building',
  plan1CTAHref: '/',
  plan2Name: 'Professional',
  plan2Description: 'Ideal for growing teams and scaling businesses',
  plan2Price: '$49',
  plan2Period: '/month',
  plan2Badge: 'Most Popular',
  plan2CTA: 'Start Free Trial',
  plan2CTAHref: '/',
  plan2Trial: '14-day free trial • No credit card required',
  plan3Name: 'Enterprise',
  plan3Description: 'Advanced features for large organizations',
  plan3Price: 'Custom',
  plan3Badge: 'Contact Sales',
  plan3CTA: 'Get Custom Quote',
  plan3CTAHref: '/',
  bottomTitle: 'Need a custom solution?',
  bottomDescription:
    'Our enterprise team specializes in building tailored SaaS solutions for complex business requirements. Get dedicated support and custom integrations.',
  bottomCTA: 'Schedule Consultation',
  bottomCTAHref: '/',
} as const;

type PricingProps = Partial<typeof DEFAULT_PRICING>;

export default function Pricing(props: PricingProps) {
  const config = { ...DEFAULT_PRICING, ...props };
  const navigate = useSmartNavigation();
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');

  const plans = [
    {
      name: config.plan1Name,
      description: config.plan1Description,
      price: config.plan1Price,
      period: '',
      badge: null,
      icon: Rocket,
      features: [
        'Up to 5 projects',
        'Core API access',
        'Community support',
        '5GB cloud storage',
        'Basic analytics dashboard',
        'Standard templates',
      ],
      cta: config.plan1CTA,
      ctaHref: config.plan1CTAHref,
      popular: false,
    },
    {
      name: config.plan2Name,
      description: config.plan2Description,
      price: billingCycle === 'annual' ? '$39' : config.plan2Price,
      period: config.plan2Period,
      badge: config.plan2Badge,
      icon: Users,
      features: [
        'Unlimited projects',
        'Advanced API & webhooks',
        'Priority email support',
        '100GB cloud storage',
        'Advanced analytics & reporting',
        'Premium templates library',
        'Team collaboration tools',
        'Custom integrations',
        'A/B testing suite',
      ],
      cta: config.plan2CTA,
      ctaHref: config.plan2CTAHref,
      popular: true,
    },
    {
      name: config.plan3Name,
      description: config.plan3Description,
      price: config.plan3Price,
      period: '',
      badge: config.plan3Badge,
      icon: Shield,
      features: [
        'Everything in Professional',
        'Unlimited cloud storage',
        '24/7 dedicated support',
        'White-label solutions',
        'Advanced security & compliance',
        '99.9% SLA guarantee',
        'Dedicated account manager',
        'Custom onboarding & training',
        'Multi-region deployment',
      ],
      cta: config.plan3CTA,
      ctaHref: config.plan3CTAHref,
      popular: false,
    },
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <Badge variant="outline" className="mb-6 px-4 py-2 text-sm">
            <span data-editable="badge">{config.badge}</span>
          </Badge>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            <span data-editable="mainTitle">{config.mainTitle}</span>
            <span className="block bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent">
              <span data-editable="mainTitleHighlight">{config.mainTitleHighlight}</span>
            </span>
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed mb-10 max-w-2xl mx-auto">
            <span data-editable="mainDescription">{config.mainDescription}</span>
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center p-1 bg-muted rounded-xl shadow-inner">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={cn(
                'px-6 py-3 text-sm font-medium rounded-lg transition-all duration-200',
                billingCycle === 'monthly'
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <span data-editable="billingMonthly">{config.billingMonthly}</span>
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={cn(
                'px-6 py-3 text-sm font-medium rounded-lg transition-all duration-200 flex items-center gap-2',
                billingCycle === 'annual'
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <span data-editable="billingAnnual">{config.billingAnnual}</span>
              <Badge variant="secondary" className="text-xs bg-primary/10 text-primary">
                <span data-editable="billingAnnualBadge">{config.billingAnnualBadge}</span>
              </Badge>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan, index) => {
            const IconComponent = plan.icon;
            return (
              <Card
                key={index}
                className={cn(
                  'relative overflow-hidden transition-all duration-300 hover:shadow-xl group',
                  plan.popular
                    ? 'border-primary/50 shadow-xl shadow-primary/10 lg:scale-105 bg-gradient-to-br from-background via-background to-primary/5'
                    : 'border-border/50 hover:border-primary/30 hover:shadow-lg'
                )}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                    <Badge className="bg-primary text-primary-foreground px-6 py-2 shadow-lg text-sm font-medium">
                      <Star className="size-4 mr-2 fill-current" />
                      <span data-editable="plan2Badge">{plan.badge}</span>
                    </Badge>
                  </div>
                )}

                <CardHeader className={cn('relative text-center pb-8', plan.popular && 'pt-12')}>
                  {plan.badge && !plan.popular && (
                    <Badge variant="outline" className="mb-4 mx-auto w-fit px-3 py-1">
                      <span data-editable="plan3Badge">{plan.badge}</span>
                    </Badge>
                  )}

                  <div className="mb-4 mx-auto w-fit">
                    <div
                      className={cn(
                        'size-12 rounded-xl flex items-center justify-center',
                        plan.popular
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary'
                      )}
                    >
                      <IconComponent className="size-6" />
                    </div>
                  </div>

                  <CardTitle className="text-2xl mb-3">
                    <span data-editable={`plan${index + 1}Name`}>{plan.name}</span>
                  </CardTitle>
                  <CardDescription className="text-base mb-8 leading-relaxed">
                    <span data-editable={`plan${index + 1}Description`}>{plan.description}</span>
                  </CardDescription>

                  <div className="flex items-end justify-center gap-1 mb-2">
                    <span className="text-5xl font-bold">
                      <span data-editable={`plan${index + 1}Price`}>{plan.price}</span>
                    </span>
                    {plan.period && (
                      <span className="text-muted-foreground mb-2 text-lg">
                        <span data-editable="plan2Period">{plan.period}</span>
                      </span>
                    )}
                  </div>
                  {billingCycle === 'annual' && plan.name === config.plan2Name && (
                    <p className="text-sm text-muted-foreground">Billed annually ($468/year)</p>
                  )}
                </CardHeader>

                <CardContent className="relative space-y-8">
                  {/* Features List */}
                  <ul className="space-y-4">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-3">
                        <div className="size-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="size-3 text-primary" />
                        </div>
                        <span className="text-sm leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <Button
                    className={cn(
                      'w-full text-base py-6 font-medium transition-all duration-200',
                      plan.popular
                        ? 'bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl'
                        : 'hover:bg-primary hover:text-primary-foreground'
                    )}
                    variant={plan.popular ? 'default' : 'outline'}
                    onClick={() => navigate(plan.ctaHref)}
                    data-editable-href={`plan${index + 1}CTAHref`}
                    data-href={plan.ctaHref}
                  >
                    {plan.popular && <Zap className="size-4 mr-2" />}
                    <span data-editable={`plan${index + 1}CTA`}>{plan.cta}</span>
                  </Button>

                  {plan.name === config.plan2Name && (
                    <p className="text-center text-sm text-muted-foreground">
                      <span data-editable="plan2Trial">{config.plan2Trial}</span>
                    </p>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Bottom CTA Section */}
        <div className="text-center mt-20 max-w-3xl mx-auto">
          <div className="bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 rounded-2xl p-8 border border-primary/10">
            <h3 className="text-2xl font-bold mb-4">
              <span data-editable="bottomTitle">{config.bottomTitle}</span>
            </h3>
            <p className="text-muted-foreground mb-8 text-lg leading-relaxed">
              <span data-editable="bottomDescription">{config.bottomDescription}</span>
            </p>
            <Button
              variant="outline"
              size="lg"
              className="px-8 py-6 text-base font-medium hover:bg-primary hover:text-primary-foreground transition-all duration-200"
              onClick={() => navigate(config.bottomCTAHref)}
              data-editable-href="bottomCTAHref"
              data-href={config.bottomCTAHref}
            >
              <span data-editable="bottomCTA">{config.bottomCTA}</span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
