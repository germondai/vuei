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
                <VIButton class="shdw">Click me!</VIButton>
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
                      <VIButton type="shadow" class="shdw">Cancel</VIButton>
                    </VIDialogTrigger>
                    <VIDialogTrigger>
                      <VIButton class="bg-red-500 hover:bg-red-600 shdw">
                        Submit
                      </VIButton>
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

addToast({
  title: 'Hello',
  message: 'World',
  icon: { name: 'mdi:earth', color: 'blue' },
})

const options: OptionItem[] = [
  {
    id: '1',
    name: 'coze',
  },
]

const selectedItem = ref<OptionItem | null>(null)

const toggle = ref<boolean>(false)

watchPostEffect(() => {
  const html = window.document.querySelector('html')
  if (!html) return
  html.classList.value = toggle.value ? 'light' : 'dark'
})
</script>

<style>
:root,
html.dark:root {
  --color-primary-50: 252 253 255;
  --color-primary-100: 239 242 245;
  --color-primary-200: 218 223 230;
  --color-primary-300: 186 192 203;
  --color-primary-400: 146 153 166;
  --color-primary-500: 102 112 126;
  --color-primary-600: 72 82 97;
  --color-primary-700: 54 61 73;
  --color-primary-800: 35 39 47;
  --color-primary-900: 20 22 27;
  --color-primary-950: 15 16 20;
}

html.light:root {
  --color-primary-50: 15 16 20;
  --color-primary-100: 20 22 27;
  --color-primary-200: 35 39 47;
  --color-primary-300: 54 61 73;
  --color-primary-400: 72 82 97;
  --color-primary-500: 102 112 126;
  --color-primary-600: 146 153 166;
  --color-primary-700: 186 192 203;
  --color-primary-800: 218 223 230;
  --color-primary-900: 239 242 245;
  --color-primary-950: 252 253 255;
}

html {
  @apply text-primary-50 bg-primary-950;
}
</style>
