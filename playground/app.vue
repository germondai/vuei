<template>
  <div>Nuxt module playground!</div>
  <VIButton icon="mdi:pencil">Click me!</VIButton>
  <VIDialog>
    <VIDialogTrigger>helou</VIDialogTrigger>
    <VIDialogContent class="p-4 rounded-lg">
      <div>Dialog content</div>
    </VIDialogContent>
  </VIDialog>
  <VIPopover>
    <VIPopoverTrigger>helou</VIPopoverTrigger>
    <VIPopoverContent class="p-4 rounded-lg">
      <div>Popover content</div>
    </VIPopoverContent>
  </VIPopover>
  <VIAccordion>
    <VIAccordionTrigger>helou</VIAccordionTrigger>
    <VIAccordionContent class="p-4 rounded-lg">
      <div>Accordion content</div>
      <div>Accordion content</div>
      <div>Accordion content</div>
      <div>Accordion content</div>
      <div>Accordion content</div>
      <div>Accordion content</div>
      <div>Accordion content</div>
    </VIAccordionContent>
  </VIAccordion>
  <VIHoloTilt>
    <div>holo tilt</div>
  </VIHoloTilt>
  <VIFlareItem :before="{ color: '#ff0000', size: 600 }">helou?</VIFlareItem>
  <VIFlareCont class="p-16">
    <VIFlareItem :before="{ color: '#ff0000', size: 600 }">helou?</VIFlareItem>
  </VIFlareCont>
  <VIBreadcrumb>
    <VIBreadcrumbLink :href="`/course`">Courses</VIBreadcrumbLink>
    <VIBreadcrumbSeparator />
    <VIBreadcrumbDropdown>
      <VIBreadcrumbLink> helou </VIBreadcrumbLink>
    </VIBreadcrumbDropdown>
    <VIBreadcrumbSeparator />
    <VIBreadcrumbLink> Lessons </VIBreadcrumbLink>
    <VIBreadcrumbSeparator />
    <VIBreadcrumbLink solid> oh </VIBreadcrumbLink>
  </VIBreadcrumb>
  <VIToast
    :toast="{
      id: '1',
      title: 'Hello',
      message: 'World',
      icon: { name: 'mdi:earth', color: 'blue' },
    }"
  />
  <VICountUp :number="300" />
  <VITypeWriter :type-array="['Is this...', 'working?']" />
  <VIRulerX />
  <VIRulerY />
  <VIContainer>
    <VICard>
      <VICardHeader>
        <VICardTitle>Title</VICardTitle>
        <VICardDescription>Subtitle</VICardDescription>
      </VICardHeader>
      content
      <VICardFooter>
        <VIButton>Click me!</VIButton>
      </VICardFooter>
    </VICard>
  </VIContainer>
  <VIToastList />
</template>

<script lang="ts" setup>
const { addToast } = useToast()

addToast({
  title: 'Hello',
  message: 'World',
  icon: { name: 'mdi:earth', color: 'blue' },
})
</script>
