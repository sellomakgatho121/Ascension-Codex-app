# Component Library - Ascension Codex

## Button Components

### Primary Button

**Usage**: Main call-to-action, primary user actions  
**File**: `client/src/components/ui/button.tsx`

```tsx
<Button variant="default" size="default">
  Primary Action
</Button>
```

**Variants**:
- `default` - Cosmic purple background, white text
- `destructive` - Red background for delete/remove actions
- `outline` - Transparent with border
- `secondary` - Muted background
- `ghost` - No background, hover effect only
- `link` - Text link styling

**Sizes**:
- `default` - Standard button (h-10 px-4)
- `sm` - Small button (h-9 px-3)
- `lg` - Large button (h-11 px-8)
- `icon` - Square icon button (h-10 w-10)

**States**:
- Default: `bg-cosmic-500 text-white`
- Hover: `bg-cosmic-600`
- Active: `bg-cosmic-700`
- Disabled: `opacity-50 cursor-not-allowed`
- Focus: `ring-2 ring-cosmic-500 ring-offset-2`

**Accessibility**:
- Keyboard navigable (Tab)
- Focus visible indicator
- Disabled state prevents interaction
- ARIA labels for icon-only buttons

### Button Examples

```tsx
// Primary action
<Button>Begin Journey</Button>

// Secondary action
<Button variant="outline">Learn More</Button>

// Destructive action
<Button variant="destructive">Delete</Button>

// Icon button
<Button variant="ghost" size="icon">
  <X className="h-4 w-4" />
</Button>

// Loading state
<Button disabled>
  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
  Loading...
</Button>
```

## Card Components

### Basic Card

**Usage**: Content containers, feature displays, concept cards  
**File**: `client/src/components/ui/card.tsx`

```tsx
<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card description text</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Main card content goes here</p>
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>
```

**Styling**:
- Background: `bg-white dark:bg-gray-900`
- Border: `border border-gray-200 dark:border-gray-800`
- Radius: `rounded-xl`
- Shadow: `shadow-sm hover:shadow-md`

**Variants**:

#### Concept Card
```tsx
<Card className="hover:shadow-lg transition-shadow cursor-pointer">
  <CardHeader>
    <div className="flex items-center gap-3">
      <div className="p-2 bg-cosmic-100 dark:bg-cosmic-900 rounded-lg">
        <Sparkles className="h-5 w-5 text-cosmic-600" />
      </div>
      <CardTitle>Chakra System</CardTitle>
    </div>
  </CardHeader>
  <CardContent>
    <p className="text-sm text-gray-600 dark:text-gray-300">
      Seven primary energy centers in the human body
    </p>
  </CardContent>
  <CardFooter>
    <Button variant="ghost" size="sm">
      Explore <ArrowRight className="ml-2 h-4 w-4" />
    </Button>
  </CardFooter>
</Card>
```

#### Feature Card
```tsx
<Card className="text-center">
  <CardHeader>
    <div className="mx-auto mb-4 p-3 bg-cosmic-100 dark:bg-cosmic-900 rounded-full w-fit">
      <Eye className="h-8 w-8 text-cosmic-600" />
    </div>
    <CardTitle>Meditation Center</CardTitle>
  </CardHeader>
  <CardContent>
    <p className="text-gray-600 dark:text-gray-300">
      Guided meditations and binaural beats for deep spiritual practice
    </p>
  </CardContent>
</Card>
```

#### Stat Card
```tsx
<Card>
  <CardHeader className="pb-2">
    <CardDescription>Meditation Streak</CardDescription>
  </CardHeader>
  <CardContent>
    <div className="text-3xl font-bold text-cosmic-600">7 Days</div>
    <p className="text-xs text-gray-500 mt-1">
      <TrendingUp className="inline h-3 w-3 mr-1" />
      Keep going!
    </p>
  </CardContent>
</Card>
```

## Input Components

### Text Input

**Usage**: Form fields, search, user input  
**File**: `client/src/components/ui/input.tsx`

```tsx
<div className="space-y-2">
  <Label htmlFor="email">Email</Label>
  <Input
    id="email"
    type="email"
    placeholder="your@email.com"
  />
</div>
```

**States**:
- Default: `border-gray-300 dark:border-gray-700`
- Focus: `ring-2 ring-cosmic-500 border-cosmic-500`
- Error: `border-red-500 ring-red-500`
- Disabled: `opacity-50 cursor-not-allowed`

**Variants**:

#### Search Input
```tsx
<div className="relative">
  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
  <Input
    type="search"
    placeholder="Search concepts..."
    className="pl-10"
  />
</div>
```

#### Input with Icon
```tsx
<div className="relative">
  <Input type="text" className="pr-10" />
  <Button
    variant="ghost"
    size="icon"
    className="absolute right-0 top-0"
  >
    <X className="h-4 w-4" />
  </Button>
</div>
```

### Textarea

```tsx
<div className="space-y-2">
  <Label htmlFor="message">Message</Label>
  <Textarea
    id="message"
    placeholder="Share your spiritual insights..."
    rows={4}
  />
</div>
```

### Select

```tsx
<Select>
  <SelectTrigger>
    <SelectValue placeholder="Select chakra" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="root">Root Chakra</SelectItem>
    <SelectItem value="sacral">Sacral Chakra</SelectItem>
    <SelectItem value="solar">Solar Plexus</SelectItem>
  </SelectContent>
</Select>
```

## Navigation Components

### Main Navigation

**Usage**: Primary site navigation  
**File**: `client/src/components/navigation.tsx`

```tsx
<nav className="border-b">
  <div className="container mx-auto px-4">
    <div className="flex items-center justify-between h-16">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2">
        <Sparkles className="h-6 w-6 text-cosmic-600" />
        <span className="font-display font-bold text-xl">
          Ascension Codex
        </span>
      </Link>
      
      {/* Desktop Nav */}
      <div className="hidden md:flex items-center gap-6">
        <Link href="/concepts" className="hover:text-cosmic-600">
          Concepts
        </Link>
        <Link href="/meditation" className="hover:text-cosmic-600">
          Meditation
        </Link>
        <Link href="/progress" className="hover:text-cosmic-600">
          Progress
        </Link>
      </div>
      
      {/* Mobile Menu Button */}
      <Button variant="ghost" size="icon" className="md:hidden">
        <Menu className="h-6 w-6" />
      </Button>
    </div>
  </div>
</nav>
```

### Breadcrumb Navigation

```tsx
<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/">Home</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbLink href="/concepts">Concepts</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>Chakra System</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>
```

### Tabs Navigation

```tsx
<Tabs defaultValue="overview">
  <TabsList>
    <TabsTrigger value="overview">Overview</TabsTrigger>
    <TabsTrigger value="details">Details</TabsTrigger>
    <TabsTrigger value="practice">Practice</TabsTrigger>
  </TabsList>
  <TabsContent value="overview">
    {/* Overview content */}
  </TabsContent>
  <TabsContent value="details">
    {/* Details content */}
  </TabsContent>
  <TabsContent value="practice">
    {/* Practice content */}
  </TabsContent>
</Tabs>
```

## Modal Components

### Dialog

**Usage**: Modal dialogs, confirmations, forms  
**File**: `client/src/components/ui/dialog.tsx`

```tsx
<Dialog>
  <DialogTrigger asChild>
    <Button>Open Dialog</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Meditation Session</DialogTitle>
      <DialogDescription>
        Choose your meditation duration and type
      </DialogDescription>
    </DialogHeader>
    
    <div className="space-y-4">
      {/* Dialog content */}
    </div>
    
    <DialogFooter>
      <Button variant="outline">Cancel</Button>
      <Button>Start Meditation</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

### Sheet (Slide-out)

```tsx
<Sheet>
  <SheetTrigger asChild>
    <Button variant="ghost" size="icon">
      <Menu className="h-6 w-6" />
    </Button>
  </SheetTrigger>
  <SheetContent side="left">
    <SheetHeader>
      <SheetTitle>Navigation</SheetTitle>
    </SheetHeader>
    <nav className="flex flex-col gap-4 mt-6">
      <Link href="/">Home</Link>
      <Link href="/concepts">Concepts</Link>
      <Link href="/meditation">Meditation</Link>
    </nav>
  </SheetContent>
</Sheet>
```

### Alert Dialog

```tsx
<AlertDialog>
  <AlertDialogTrigger asChild>
    <Button variant="destructive">Delete</Button>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction>Delete</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
```

## Feedback Components

### Toast Notifications

```tsx
import { useToast } from "@/hooks/use-toast"

function Component() {
  const { toast } = useToast()
  
  return (
    <Button
      onClick={() => {
        toast({
          title: "Meditation Complete",
          description: "You've completed a 10-minute session",
        })
      }}
    >
      Show Toast
    </Button>
  )
}
```

**Variants**:
```tsx
// Success
toast({
  title: "Success",
  description: "Achievement unlocked!",
  variant: "default",
})

// Error
toast({
  title: "Error",
  description: "Something went wrong",
  variant: "destructive",
})

// With action
toast({
  title: "New Feature",
  description: "Check out the meditation center",
  action: <ToastAction altText="Try it">Try it</ToastAction>,
})
```

### Progress Indicators

#### Progress Bar
```tsx
<div className="space-y-2">
  <div className="flex justify-between text-sm">
    <span>Spiritual Progress</span>
    <span>75%</span>
  </div>
  <Progress value={75} />
</div>
```

#### Loading Spinner
```tsx
<div className="flex items-center justify-center p-8">
  <Loader2 className="h-8 w-8 animate-spin text-cosmic-600" />
</div>
```

#### Skeleton Loader
```tsx
<div className="space-y-4">
  <Skeleton className="h-8 w-3/4" />
  <Skeleton className="h-4 w-full" />
  <Skeleton className="h-4 w-5/6" />
</div>
```

## Data Display Components

### Badge

```tsx
// Default badge
<Badge>New</Badge>

// Variants
<Badge variant="secondary">Beta</Badge>
<Badge variant="destructive">Deprecated</Badge>
<Badge variant="outline">Coming Soon</Badge>

// Chakra badges
<Badge className="bg-red-500">Root</Badge>
<Badge className="bg-orange-500">Sacral</Badge>
<Badge className="bg-yellow-500">Solar Plexus</Badge>
```

### Avatar

```tsx
<Avatar>
  <AvatarImage src="/avatar.jpg" alt="User" />
  <AvatarFallback>JD</AvatarFallback>
</Avatar>

// Avatar group
<div className="flex -space-x-2">
  <Avatar className="border-2 border-white">
    <AvatarImage src="/user1.jpg" />
    <AvatarFallback>U1</AvatarFallback>
  </Avatar>
  <Avatar className="border-2 border-white">
    <AvatarImage src="/user2.jpg" />
    <AvatarFallback>U2</AvatarFallback>
  </Avatar>
</div>
```

### Tooltip

```tsx
<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild>
      <Button variant="ghost" size="icon">
        <Info className="h-4 w-4" />
      </Button>
    </TooltipTrigger>
    <TooltipContent>
      <p>Additional information about this feature</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>
```

### Accordion

```tsx
<Accordion type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger>What is the chakra system?</AccordionTrigger>
    <AccordionContent>
      The chakra system consists of seven primary energy centers...
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger>How do I activate my lightbody?</AccordionTrigger>
    <AccordionContent>
      Lightbody activation occurs through specific practices...
    </AccordionContent>
  </AccordionItem>
</Accordion>
```

## Spiritual Components

### Chakra Visualization

**Usage**: Interactive chakra system display  
**File**: `client/src/components/chakra-visualization.tsx`

```tsx
<ChakraVisualization
  activeChakra="heart"
  onChakraClick={(chakra) => console.log(chakra)}
/>
```

**Features**:
- Interactive chakra points
- Energy level indicators
- Color-coded by chakra
- Hover states with tooltips
- Click to view details

### Meditation Timer

**Usage**: Meditation session timer  
**File**: `client/src/components/meditation-timer.tsx`

```tsx
<MeditationTimer
  duration={600} // 10 minutes in seconds
  onComplete={() => console.log('Session complete')}
/>
```

**Features**:
- Visual countdown
- Play/pause controls
- Session progress ring
- Completion notification
- Background audio support

### Progress Dashboard

**Usage**: Spiritual development tracking  
**File**: `client/src/components/progress-dashboard.tsx`

```tsx
<ProgressDashboard
  meditationStreak={7}
  totalSessions={42}
  achievements={achievements}
/>
```

**Features**:
- Meditation streak counter
- Total sessions display
- Achievement badges
- Progress charts
- Goal tracking

### Sacred Geometry Patterns

**Usage**: Background patterns, decorative elements  
**File**: `client/src/components/sacred-geometry.tsx`

```tsx
<SacredGeometry
  pattern="flower-of-life"
  size="large"
  opacity={0.1}
  className="absolute inset-0"
/>
```

**Patterns**:
- Flower of Life
- Metatron's Cube
- Sri Yantra
- Merkaba
- Seed of Life

## Emphasis Patterns

### Shadows

```tsx
// Subtle elevation
<div className="shadow-sm">Content</div>

// Medium elevation
<div className="shadow-md">Content</div>

// High elevation
<div className="shadow-xl">Content</div>

// Spiritual glow
<div className="shadow-glow">Active element</div>
```

### Gradients

```tsx
// Cosmic gradient background
<div className="bg-gradient-to-br from-cosmic-900 via-cosmic-800 to-cosmic-900">
  Content
</div>

// Gradient text
<h1 className="bg-gradient-to-r from-cosmic-500 to-purple-600 bg-clip-text text-transparent">
  Gradient Text
</h1>

// Sacred gold gradient
<div className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600">
  Premium content
</div>
```

### Hover & Focus States

```tsx
// Hover scale
<div className="transform hover:scale-105 transition-transform">
  Hover to scale
</div>

// Hover shadow
<div className="shadow hover:shadow-lg transition-shadow">
  Hover for shadow
</div>

// Hover glow
<div className="hover:shadow-glow transition-shadow">
  Hover for glow
</div>

// Focus ring
<button className="focus-visible:ring-2 focus-visible:ring-cosmic-500 focus-visible:ring-offset-2">
  Focus me
</button>
```

### Glassmorphism

```tsx
<div className="
  bg-white/10 dark:bg-black/10
  backdrop-blur-lg
  border border-white/20
  rounded-xl
  shadow-xl
">
  Glassmorphism content
</div>
```

## Accessibility Features

### Focus Indicators

```tsx
// Visible focus ring
<button className="
  focus-visible:outline-none
  focus-visible:ring-2
  focus-visible:ring-cosmic-500
  focus-visible:ring-offset-2
">
  Accessible button
</button>
```

### ARIA Labels

```tsx
// Icon button with label
<Button variant="ghost" size="icon" aria-label="Close menu">
  <X className="h-4 w-4" />
</Button>

// Link with description
<a href="/meditation" aria-describedby="meditation-desc">
  Meditation Center
</a>
<span id="meditation-desc" className="sr-only">
  Access guided meditations and spiritual practices
</span>
```

### Keyboard Interactions

```tsx
// Keyboard navigable list
<div role="list">
  {items.map((item, index) => (
    <div
      key={item.id}
      role="listitem"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleSelect(item)
        }
      }}
    >
      {item.name}
    </div>
  ))}
</div>
```

### Screen Reader Support

```tsx
// Screen reader only text
<span className="sr-only">
  This text is only visible to screen readers
</span>

// Live region for dynamic updates
<div role="status" aria-live="polite" aria-atomic="true">
  {statusMessage}
</div>

// Skip link
<a
  href="#main-content"
  className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50"
>
  Skip to main content
</a>
```

## Component Composition Patterns

### Card with Actions

```tsx
<Card>
  <CardHeader>
    <div className="flex items-center justify-between">
      <CardTitle>Meditation Session</CardTitle>
      <Button variant="ghost" size="icon">
        <MoreVertical className="h-4 w-4" />
      </Button>
    </div>
  </CardHeader>
  <CardContent>
    <p>10 minutes of guided meditation</p>
  </CardContent>
  <CardFooter className="flex justify-between">
    <Button variant="outline">Skip</Button>
    <Button>Start</Button>
  </CardFooter>
</Card>
```

### Form with Validation

```tsx
<form onSubmit={handleSubmit} className="space-y-4">
  <div className="space-y-2">
    <Label htmlFor="name">Name</Label>
    <Input
      id="name"
      {...register('name')}
      className={errors.name ? 'border-red-500' : ''}
    />
    {errors.name && (
      <p className="text-sm text-red-500">{errors.name.message}</p>
    )}
  </div>
  
  <Button type="submit" disabled={isSubmitting}>
    {isSubmitting ? (
      <>
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        Submitting...
      </>
    ) : (
      'Submit'
    )}
  </Button>
</form>
```

### Search with Results

```tsx
<div className="relative">
  <div className="relative">
    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4" />
    <Input
      type="search"
      placeholder="Search..."
      className="pl-10"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  </div>
  
  {query && (
    <Card className="absolute top-full mt-2 w-full z-50">
      <CardContent className="p-0">
        {results.length > 0 ? (
          <div className="divide-y">
            {results.map((result) => (
              <Link
                key={result.id}
                href={result.url}
                className="block p-3 hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                {result.title}
              </Link>
            ))}
          </div>
        ) : (
          <p className="p-4 text-center text-gray-500">
            No results found
          </p>
        )}
      </CardContent>
    </Card>
  )}
</div>
```

---

**Component Library Status**: ✅ Active  
**Last Updated**: 2025-10-01  
**Next Review**: Monthly  
**Maintained By**: Cascade AI Design System
