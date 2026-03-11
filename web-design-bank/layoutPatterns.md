# Layout Patterns - Ascension Codex

## Grid System

### Base Grid Configuration

```tsx
// 12-column responsive grid
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
  {/* Grid items */}
</div>
```

### Grid Breakpoints

| Breakpoint | Min Width | Columns | Gap | Container |
|------------|-----------|---------|-----|-----------|
| `xs` | 0px | 1 | 16px | 100% |
| `sm` | 640px | 2 | 20px | 640px |
| `md` | 768px | 2-3 | 24px | 768px |
| `lg` | 1024px | 3-4 | 24px | 1024px |
| `xl` | 1280px | 4-6 | 32px | 1280px |
| `2xl` | 1536px | 6-12 | 32px | 1536px |

### Common Grid Patterns

#### Two-Column Layout (Content + Sidebar)
```tsx
<div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8">
  <main>{/* Main content */}</main>
  <aside>{/* Sidebar */}</aside>
</div>
```

#### Three-Column Feature Grid
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <FeatureCard />
  <FeatureCard />
  <FeatureCard />
</div>
```

#### Masonry-Style Grid
```tsx
<div className="columns-1 md:columns-2 lg:columns-3 gap-6">
  <div className="break-inside-avoid mb-6">
    <Card />
  </div>
</div>
```

## Container System

### Container Widths

```tsx
// Full width container
<div className="w-full px-4">
  {/* Content */}
</div>

// Constrained container
<div className="container mx-auto px-4 max-w-7xl">
  {/* Content */}
</div>

// Narrow container (reading width)
<div className="container mx-auto px-4 max-w-3xl">
  {/* Content */}
</div>
```

### Container Variations

#### Standard Container
```tsx
<div className="container mx-auto px-4 sm:px-6 lg:px-8">
  {/* Responsive padding */}
</div>
```

#### Full-Bleed Section
```tsx
<section className="w-full bg-cosmic-50 dark:bg-cosmic-900">
  <div className="container mx-auto px-4 py-16">
    {/* Contained content in full-width section */}
  </div>
</section>
```

#### Asymmetric Container
```tsx
<div className="ml-0 mr-auto max-w-4xl px-4">
  {/* Left-aligned container */}
</div>
```

## Section Blueprints

### Hero Section

#### Full-Screen Hero
```tsx
<section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-cosmic-900 via-cosmic-800 to-cosmic-900">
  {/* Background effects */}
  <div className="absolute inset-0 bg-[url('/sacred-geometry.svg')] opacity-10" />
  
  {/* Content */}
  <div className="relative z-10 container mx-auto px-4 text-center">
    <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-white mb-6">
      Ascension Codex
    </h1>
    <p className="text-xl md:text-2xl text-cosmic-100 mb-8 max-w-3xl mx-auto">
      Your journey to spiritual enlightenment begins here
    </p>
    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      <Button size="lg">Begin Your Journey</Button>
      <Button size="lg" variant="outline">Learn More</Button>
    </div>
  </div>
</section>
```

#### Split Hero (Image + Content)
```tsx
<section className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
  {/* Visual side */}
  <div className="relative bg-cosmic-900 flex items-center justify-center p-8">
    <ChakraVisualization />
  </div>
  
  {/* Content side */}
  <div className="flex items-center justify-center p-8 lg:p-16">
    <div className="max-w-lg">
      <h1 className="text-4xl lg:text-5xl font-display font-bold mb-6">
        Explore Your Energy Centers
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
        Interactive chakra system visualization and guidance
      </p>
      <Button size="lg">Start Exploring</Button>
    </div>
  </div>
</section>
```

### Feature Sections

#### Three-Column Features
```tsx
<section className="py-16 lg:py-24">
  <div className="container mx-auto px-4">
    {/* Section header */}
    <div className="text-center mb-12">
      <h2 className="text-3xl lg:text-4xl font-display font-bold mb-4">
        Spiritual Tools & Features
      </h2>
      <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
        Everything you need for your spiritual development journey
      </p>
    </div>
    
    {/* Features grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <FeatureCard
        icon={<Sparkles />}
        title="Meditation Center"
        description="Guided meditations and binaural beats"
      />
      <FeatureCard
        icon={<Eye />}
        title="Chakra Visualization"
        description="Interactive energy center exploration"
      />
      <FeatureCard
        icon={<TrendingUp />}
        title="Progress Tracking"
        description="Monitor your spiritual development"
      />
    </div>
  </div>
</section>
```

#### Alternating Feature Rows
```tsx
<section className="py-16">
  <div className="container mx-auto px-4 space-y-24">
    {/* Feature 1 - Image Left */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      <div className="order-2 lg:order-1">
        <img src="/feature-1.png" alt="Feature" className="rounded-xl shadow-2xl" />
      </div>
      <div className="order-1 lg:order-2">
        <h3 className="text-3xl font-display font-bold mb-4">
          Interactive Visualizations
        </h3>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
          Explore spiritual concepts through beautiful, interactive diagrams
        </p>
        <Button>Learn More</Button>
      </div>
    </div>
    
    {/* Feature 2 - Image Right */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      <div>
        <h3 className="text-3xl font-display font-bold mb-4">
          AI-Powered Guidance
        </h3>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
          Get personalized spiritual insights from VERS AI
        </p>
        <Button>Try VERS</Button>
      </div>
      <div>
        <img src="/feature-2.png" alt="Feature" className="rounded-xl shadow-2xl" />
      </div>
    </div>
  </div>
</section>
```

### Card Layouts

#### Card Grid
```tsx
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
  {concepts.map((concept) => (
    <Card key={concept.id} className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle>{concept.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          {concept.description}
        </p>
      </CardContent>
      <CardFooter>
        <Button variant="ghost" size="sm">Learn More</Button>
      </CardFooter>
    </Card>
  ))}
</div>
```

#### Horizontal Scrolling Cards
```tsx
<div className="flex overflow-x-auto gap-6 pb-4 snap-x snap-mandatory">
  {items.map((item) => (
    <Card key={item.id} className="flex-shrink-0 w-80 snap-start">
      <CardContent>{/* Content */}</CardContent>
    </Card>
  ))}
</div>
```

### Form Layouts

#### Single Column Form
```tsx
<form className="max-w-md mx-auto space-y-6">
  <div>
    <Label htmlFor="name">Name</Label>
    <Input id="name" type="text" />
  </div>
  
  <div>
    <Label htmlFor="email">Email</Label>
    <Input id="email" type="email" />
  </div>
  
  <Button type="submit" className="w-full">Submit</Button>
</form>
```

#### Two-Column Form
```tsx
<form className="grid grid-cols-1 md:grid-cols-2 gap-6">
  <div>
    <Label htmlFor="firstName">First Name</Label>
    <Input id="firstName" />
  </div>
  
  <div>
    <Label htmlFor="lastName">Last Name</Label>
    <Input id="lastName" />
  </div>
  
  <div className="md:col-span-2">
    <Label htmlFor="message">Message</Label>
    <Textarea id="message" rows={4} />
  </div>
  
  <div className="md:col-span-2">
    <Button type="submit" className="w-full md:w-auto">Submit</Button>
  </div>
</form>
```

### Testimonial Sections

#### Three-Column Testimonials
```tsx
<section className="py-16 bg-cosmic-50 dark:bg-cosmic-900">
  <div className="container mx-auto px-4">
    <h2 className="text-3xl font-display font-bold text-center mb-12">
      Spiritual Journeys
    </h2>
    
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {testimonials.map((testimonial) => (
        <Card key={testimonial.id}>
          <CardContent className="pt-6">
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              "{testimonial.quote}"
            </p>
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src={testimonial.avatar} />
                <AvatarFallback>{testimonial.initials}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold">{testimonial.name}</p>
                <p className="text-sm text-gray-500">{testimonial.role}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
</section>
```

## Gestalt Principles

### Proximity
Group related elements together with consistent spacing:

```tsx
// Related items grouped with tight spacing
<div className="space-y-2">
  <h3 className="font-semibold">Chakra Name</h3>
  <p className="text-sm text-gray-600">Description</p>
</div>

// Separate sections with larger spacing
<div className="space-y-8">
  <Section1 />
  <Section2 />
</div>
```

### Similarity
Use consistent styling for similar elements:

```tsx
// All primary actions use same button style
<Button variant="default">Action 1</Button>
<Button variant="default">Action 2</Button>

// All secondary actions use same style
<Button variant="outline">Secondary 1</Button>
<Button variant="outline">Secondary 2</Button>
```

### Continuity
Create visual flow with alignment and rhythm:

```tsx
<div className="space-y-4">
  {/* All elements aligned to same grid */}
  <div className="flex items-center gap-4">
    <Icon className="w-6 h-6" />
    <span>Item 1</span>
  </div>
  <div className="flex items-center gap-4">
    <Icon className="w-6 h-6" />
    <span>Item 2</span>
  </div>
</div>
```

### Figure-Ground
Clear distinction between content and background:

```tsx
<div className="bg-white dark:bg-gray-900 shadow-lg rounded-xl p-6">
  {/* Content clearly separated from background */}
  <h2 className="text-2xl font-bold mb-4">Content</h2>
  <p className="text-gray-600 dark:text-gray-300">Description</p>
</div>
```

### Common Region
Group elements within visual boundaries:

```tsx
<Card className="border-2 border-cosmic-200 dark:border-cosmic-800">
  <CardHeader>
    <CardTitle>Grouped Content</CardTitle>
  </CardHeader>
  <CardContent>
    {/* Related items within card boundary */}
    <div className="space-y-4">
      <Item1 />
      <Item2 />
    </div>
  </CardContent>
</Card>
```

## Visual Hierarchy

### Hierarchy Levels

#### Level 1: Primary Focus
```tsx
<h1 className="text-5xl font-display font-bold text-cosmic-900 dark:text-cosmic-50">
  Primary Heading
</h1>
```

#### Level 2: Section Headers
```tsx
<h2 className="text-3xl font-display font-semibold text-cosmic-800 dark:text-cosmic-100">
  Section Header
</h2>
```

#### Level 3: Subsections
```tsx
<h3 className="text-xl font-semibold text-cosmic-700 dark:text-cosmic-200">
  Subsection
</h3>
```

#### Level 4: Body Text
```tsx
<p className="text-base text-gray-700 dark:text-gray-300">
  Body content
</p>
```

#### Level 5: Supporting Text
```tsx
<p className="text-sm text-gray-600 dark:text-gray-400">
  Supporting information
</p>
```

### Visual Weight Techniques

#### Size
```tsx
<div className="space-y-4">
  <h1 className="text-4xl">Most Important</h1>
  <h2 className="text-2xl">Important</h2>
  <p className="text-base">Normal</p>
  <small className="text-sm">Less Important</small>
</div>
```

#### Color
```tsx
<div className="space-y-2">
  <p className="text-cosmic-900 dark:text-cosmic-50">High Emphasis</p>
  <p className="text-gray-700 dark:text-gray-300">Medium Emphasis</p>
  <p className="text-gray-500 dark:text-gray-500">Low Emphasis</p>
</div>
```

#### Weight
```tsx
<div className="space-y-2">
  <p className="font-bold">Bold - High Importance</p>
  <p className="font-semibold">Semibold - Medium Importance</p>
  <p className="font-normal">Normal - Standard Text</p>
</div>
```

## Responsive Patterns

### Mobile-First Navigation

#### Mobile Menu
```tsx
<nav className="lg:hidden">
  <Sheet>
    <SheetTrigger asChild>
      <Button variant="ghost" size="icon">
        <Menu className="h-6 w-6" />
      </Button>
    </SheetTrigger>
    <SheetContent side="left">
      <nav className="flex flex-col gap-4">
        <Link href="/">Home</Link>
        <Link href="/concepts">Concepts</Link>
        <Link href="/meditation">Meditation</Link>
      </nav>
    </SheetContent>
  </Sheet>
</nav>
```

#### Desktop Navigation
```tsx
<nav className="hidden lg:flex items-center gap-6">
  <Link href="/" className="hover:text-cosmic-600">Home</Link>
  <Link href="/concepts" className="hover:text-cosmic-600">Concepts</Link>
  <Link href="/meditation" className="hover:text-cosmic-600">Meditation</Link>
</nav>
```

### Responsive Images

#### Responsive Image Container
```tsx
<div className="relative aspect-video w-full overflow-hidden rounded-xl">
  <img
    src="/image.jpg"
    alt="Description"
    className="object-cover w-full h-full"
  />
</div>
```

#### Responsive Background
```tsx
<div className="
  bg-cover bg-center bg-no-repeat
  h-64 md:h-96 lg:h-[500px]
  rounded-xl
" style={{ backgroundImage: 'url(/bg.jpg)' }}>
  {/* Content */}
</div>
```

### Responsive Typography

```tsx
<h1 className="
  text-3xl sm:text-4xl md:text-5xl lg:text-6xl
  font-display font-bold
  leading-tight
">
  Responsive Heading
</h1>

<p className="
  text-sm sm:text-base md:text-lg
  leading-relaxed
">
  Responsive body text
</p>
```

### Responsive Spacing

```tsx
<section className="
  py-8 sm:py-12 md:py-16 lg:py-24
  px-4 sm:px-6 lg:px-8
">
  <div className="
    space-y-6 sm:space-y-8 md:space-y-12
  ">
    {/* Content with responsive spacing */}
  </div>
</section>
```

## Layout Performance

### Layout Shift Prevention

#### Reserve Space for Images
```tsx
<div className="relative aspect-video w-full">
  <img
    src="/image.jpg"
    alt="Description"
    className="absolute inset-0 w-full h-full object-cover"
    loading="lazy"
  />
</div>
```

#### Skeleton Loaders
```tsx
<div className="space-y-4">
  <Skeleton className="h-8 w-3/4" />
  <Skeleton className="h-4 w-full" />
  <Skeleton className="h-4 w-5/6" />
</div>
```

### Efficient Layouts

#### CSS Grid over Flexbox (when appropriate)
```tsx
// Grid for 2D layouts
<div className="grid grid-cols-3 gap-4">
  {items.map(item => <Item key={item.id} />)}
</div>

// Flexbox for 1D layouts
<div className="flex gap-4">
  {items.map(item => <Item key={item.id} />)}
</div>
```

#### Content Visibility
```tsx
<div className="content-visibility-auto">
  {/* Browser can skip rendering off-screen content */}
  <HeavyComponent />
</div>
```

## Accessibility Patterns

### Skip Links
```tsx
<a
  href="#main-content"
  className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-cosmic-600 focus:text-white focus:rounded"
>
  Skip to main content
</a>
```

### Landmark Regions
```tsx
<div>
  <header role="banner">{/* Site header */}</header>
  <nav role="navigation">{/* Main navigation */}</nav>
  <main role="main" id="main-content">{/* Main content */}</main>
  <aside role="complementary">{/* Sidebar */}</aside>
  <footer role="contentinfo">{/* Site footer */}</footer>
</div>
```

### Focus Management
```tsx
// Focus trap in modal
<Dialog>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Modal Title</DialogTitle>
    </DialogHeader>
    {/* Focus stays within modal */}
    <DialogFooter>
      <Button>Action</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

---

**Layout Patterns Status**: ✅ Active  
**Last Updated**: 2025-10-01  
**Next Review**: Monthly  
**Maintained By**: Cascade AI Design System
