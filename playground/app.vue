<template>
  <VIButton icon="mdi:pencil">Click me!</VIButton>
  <VIDialog>
    <VIDialogTrigger>helou</VIDialogTrigger>
    <VIDialogContent background-class="bg-red-200/80" class="p-4 rounded-lg">
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
    <VIAccordionTrigger as-child>
      <VIButton>helou</VIButton>
    </VIAccordionTrigger>
    <VIAccordionContent as="ul" class="p-4 rounded-lg">
      <li v-for="key in 5" :key>Accordion content</li>
    </VIAccordionContent>
  </VIAccordion>
  <VIHoloTilt>
    <div>holo tilt</div>
  </VIHoloTilt>
  <VIFlareItem>helou?</VIFlareItem>

  <VIFlareCont class="p-16">
    <VIHoloTilt>
      <VIFlareItem :before="{ color: '#ff0000', size: 600 }">
        helou?
      </VIFlareItem>
    </VIHoloTilt>
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
  <VIContainer>
    <VIButton variant="primary">Coze</VIButton>
    <VIButton variant="secondary">Coze</VIButton>
    <VIButton variant="destructive">Coze</VIButton>
    <VIButton variant="outline">Coze</VIButton>
    <VIButton variant="ghost">Coze</VIButton>
    <VIButton variant="link">Coze</VIButton>
  </VIContainer>
  <VICountUp :number="300" />
  <VITypeWriter :type-array="['Is this...', 'working?']" />
  <VIRulerX />
  <VIRulerY />
  <VIContainer>
    <VIHoloTilt>
      <VIFlareItem class="m-4 p-0.5 rounded-lg">
        <VICard class="bg-primary-950/90">
          <VICardHeader>
            <VICardTitle>Title</VICardTitle>
            <VICardDescription>Subtitle</VICardDescription>
          </VICardHeader>
          <VIFormDropdown
            v-model:selected-item="selectedItem"
            :options
            searchable
          />
          <div class="flex items-center gap-2">
            <VIButtonToggle v-model:model-value="toggle" />
            <p>Switch theme</p>
          </div>
          <VICardFooter class="justify-end">
            <VIDialog>
              <VIDialogTrigger>
                <VIButton>Click me!</VIButton>
              </VIDialogTrigger>
              <VIDialogContent>
                <VICard class="bg-primary-950/90">
                  <VICardHeader>
                    <VICardTitle>Are you sure?</VICardTitle>
                    <VICardDescription>
                      This action can not be undone
                    </VICardDescription>
                  </VICardHeader>
                  <VICardFooter class="justify-between">
                    <VIDialogTrigger>
                      <VIButton variant="outline">Cancel</VIButton>
                    </VIDialogTrigger>
                    <VIDialogTrigger>
                      <VIButton> Submit </VIButton>
                    </VIDialogTrigger>
                  </VICardFooter>
                </VICard>
              </VIDialogContent>
            </VIDialog>
          </VICardFooter>
        </VICard>
      </VIFlareItem>
    </VIHoloTilt>
  </VIContainer>
  <VIToastList />
</template>

<script lang="ts" setup>
import type { OptionItem } from '../src/module'

const { addToast } = useToast()

const options: OptionItem[] = [
  {
    id: '1',
    name: 'coze',
  },
  {
    id: '2',
    name: 'aha',
  },
]

const selectedItem = ref<OptionItem | null>(null)

const toggle = ref<boolean>(false)

onMounted(() =>
  addToast({
    title: 'Hello',
    message: 'World',
    icon: { name: 'mdi:earth', color: 'blue' },
  }),
)

watchPostEffect(() => {
  const html = window.document.querySelector('html')
  if (!html) return
  html.classList.value = toggle.value ? 'light' : 'dark'
})
</script>
