<template>
  <VIButton icon="mdi:pencil">Click me!</VIButton>
  <VIDialog nest>
    <VIDialogTrigger>helou dialog zaklad</VIDialogTrigger>
    <VIDialogContent backgroundClass="bg-red-200/20" asChild>
      <VIContainer size="xs" class="p-4 rounded-lg">
        <VICardTitle>Dialog content zaklad</VICardTitle>
        <VIPopover>
          <VIPopoverTrigger>helou popover inside dialog1</VIPopoverTrigger>
          <VIPopoverContent class="p-4 rounded-lg">
            <VIPopover>
              <VIPopoverTrigger>helou popover inside dialog2</VIPopoverTrigger>
              <VIPopoverContent class="p-4 rounded-lg">
                <VIPopover>
                  <VIPopoverTrigger>
                    helou popover inside dialog3
                  </VIPopoverTrigger>
                  <VIPopoverContent class="p-4 rounded-lg">
                    <VIPopover>
                      <VIPopoverTrigger>
                        helou popover inside dialog4
                      </VIPopoverTrigger>
                      <VIPopoverContent class="p-4 rounded-lg">
                        <div>Popover content</div>
                      </VIPopoverContent>
                    </VIPopover>
                  </VIPopoverContent>
                </VIPopover>
              </VIPopoverContent>
            </VIPopover>
          </VIPopoverContent>
        </VIPopover>
        <VIDialog>
          <VIDialogTrigger>helou dialog 11111</VIDialogTrigger>
          <VIDialogContent backgroundClass="bg-green-200/20" asChild>
            <VIContainer size="xs" class="pt-64 p-4 rounded-lg">
              <VICardTitle>Dialog content 11111</VICardTitle>
              <VIPopover>
                <VIPopoverTrigger>helou popover inside dialog</VIPopoverTrigger>
                <VIPopoverContent class="p-4 rounded-lg">
                  <div>Popover content</div>
                </VIPopoverContent>
              </VIPopover>
              <VIDialog>
                <VIDialogTrigger>helou dialog 333333</VIDialogTrigger>
                <VIDialogContent backgroundClass="bg-green-200/20" asChild>
                  <VIContainer size="xs" class="pt-64 p-4 rounded-lg">
                    <VICardTitle>Dialog content 333333</VICardTitle>
                    <VIPopover>
                      <VIPopoverTrigger
                        >helou popover inside dialog</VIPopoverTrigger
                      >
                      <VIPopoverContent class="p-4 rounded-lg">
                        <div>Popover content</div>
                      </VIPopoverContent>
                    </VIPopover>
                  </VIContainer>
                </VIDialogContent>
              </VIDialog>
              <VIDialog></VIDialog>
            </VIContainer>
          </VIDialogContent>
        </VIDialog>
        <VIDialog>
          <VIDialogTrigger>helou dialog 222222</VIDialogTrigger>
          <VIDialogContent backgroundClass="bg-green-200/20" asChild>
            <VIContainer size="xs" class="pt-64 p-4 rounded-lg">
              <VICardTitle>Dialog content 222222</VICardTitle>
              <VIPopover>
                <VIPopoverTrigger>helou popover inside dialog</VIPopoverTrigger>
                <VIPopoverContent class="p-4 rounded-lg">
                  <div>Popover content</div>
                </VIPopoverContent>
              </VIPopover>
            </VIContainer>
          </VIDialogContent>
        </VIDialog>
      </VIContainer>
    </VIDialogContent>
  </VIDialog>
  <VIPopover>
    <VIPopoverTrigger>helou</VIPopoverTrigger>
    <VIPopoverContent class="p-4 rounded-lg">
      <div>Popover content</div>
    </VIPopoverContent>
  </VIPopover>
  <VIPopover>
    <VIPopoverTrigger asChild>
      <VIButton>asChildPopover</VIButton>
    </VIPopoverTrigger>
    <VIPopoverContent asChild class="p-4 rounded-lg">
      <VICard> asChildPopoverContent </VICard>
    </VIPopoverContent>
  </VIPopover>
  <VIAccordion>
    <VIAccordionTrigger asChild>
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
  <VISwitch v-model:checked="tgl" />
  <VISwitch />
  <VISwitch checked />
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
      <VIBreadcrumbLink :href="`/hello`"> helou </VIBreadcrumbLink>
    </VIBreadcrumbDropdown>
    <VIBreadcrumbSeparator />
    <VIBreadcrumbLink :href="`/lesson`"> Lessons </VIBreadcrumbLink>
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
  <VIContainer class="flex flex-col gap-2">
    <VIButton variant="primary">Coze</VIButton>
    <VIButton variant="secondary">Coze</VIButton>
    <VIButton variant="destructive">Coze</VIButton>
    <VIButton variant="outline">Coze</VIButton>
    <VIButton variant="ghost">Coze</VIButton>
    <VIButton variant="link">Coze</VIButton>
    <VIButton disabled @click="console.log('disabled')"> Disabled </VIButton>
    <VIButton size="xs" icon="mdi:account">Coze</VIButton>
    <VIButton size="xs">Coze</VIButton>
    <VIButton size="sm" icon="mdi:account">Coze</VIButton>
    <VIButton size="sm">Coze</VIButton>
    <VIButton size="md" icon="mdi:account">Coze</VIButton>
    <VIButton size="md">Coze</VIButton>
    <VIButton size="lg" icon="mdi:account">Coze</VIButton>
    <VIButton size="lg">Coze</VIButton>
    <VIButton size="xl" icon="mdi:account">Coze</VIButton>
    <VIButton size="xl">Coze</VIButton>
    <VIButton size="2xl" icon="mdi:account">Coze</VIButton>
    <VIButton size="2xl">Coze</VIButton>
    <VIButton variant="outline" size="icon" icon="mdi:account" />
    <VIButton variant="outline" size="xl" icon="mdi:account" />
  </VIContainer>
  <VIContainer class="flex flex-col gap-2">
    <VIProgress :progress="50" />
    <VISeparator />
    <VIProgress :progress="50" keep />
  </VIContainer>
  <VIContainer class="flex items-center gap-2">
    <VIAvatar>
      <VIAvatarImage src="https://skillicons.dev/icons?i=ts" />
      <VIAvatarFallback>COZE</VIAvatarFallback>
    </VIAvatar>
    <VIAvatar>
      <VIAvatarImage src="/abc.png" />
      <VIAvatarFallback>COZE</VIAvatarFallback>
    </VIAvatar>
    <VIAvatar>
      <VIAvatarImage />
      <VIAvatarFallback>COZECOZE</VIAvatarFallback>
    </VIAvatar>
  </VIContainer>
  <VICountUp :number="300" />
  <VITypeWriter :typeArray="['Is this...', 'working?']" />
  <VIRulerX />
  <VIRulerY />
  <VIContainer>
    <VIRulerX flare />
    <VIRulerY flare />
    <VIHoloTilt>
      <VIFlareItem class="m-4 p-0.5 rounded-lg">
        <VIEditable
          v-slot="{ edit }"
          :as="VICard"
          class="bg-primary-950/90"
          allowed
        >
          <VICardHeader>
            <VICardTitle>Title</VICardTitle>
            <VICardDescription>Subtitle</VICardDescription>
          </VICardHeader>
          <p>Editing: {{ edit }}</p>
          <VIFormDropdown
            v-model:selectedItem="selectedItem"
            :items
            searchable
            collapsible
          />
          <VIFormDropdown
            v-model:selectedItem="selectedItem"
            :items
            searchable
            required
          />
          <VIFormFilter v-model:selectedItem="selectedItem" :items />
          <VIFormFilter v-model:selectedItem="selectedItem" :items required />
          <div class="flex items-center gap-2">
            <VISwitch v-model:checked="toggle" />
            <VIButton @click="toggle = true">true</VIButton>
            <VIButton @click="toggle = false">false</VIButton>
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
        </VIEditable>
      </VIFlareItem>
    </VIHoloTilt>
    <VITagList edit />
    <VIButton @click="addT">add toast</VIButton>
    <form class="form" @submit.prevent="onSubmit(text)">
      <VIFormField
        v-model="text"
        type="text"
        class="bg-primary-950"
        :schema="schemaObj.shape.field"
      >
        Hello from <b>label</b>
        <template #wrapper>Hello from <b>wrapper</b></template>
        <template #field>Hello from <b>field</b></template>
      </VIFormField>
    </form>
  </VIContainer>
  <VIToastList />
</template>

<script lang="ts" setup>
import { z } from 'zod'
import type { OptionItem } from '../src/module'
import { VICard } from '#components'

const { addToast } = VIuseToast()

const addT = () =>
  addToast({
    title: 'Hello',
    message: 'World',
    icon: { name: 'mdi:earth', color: 'blue' },
  })

const schema = z.string().min(4, 'min 4').max(10, 'max 10')
const schemaObj = z.object({
  field: z
    .string()
    .min(4, 'min 4')
    .max(10, 'max 10')
    .email('not email')
    .optional(),
})

const text = ref<string>('')

const onSubmit = (val: string) => {
  const parsed = schema.safeParse(val)

  const field = schemaObj.shape.field

  if (field instanceof z.ZodType) console.log('jsem zod')
  console.log(field)

  parsed.error?.issues.forEach((issue) => {
    addToast({
      title: 'Error',
      message: issue.message,
      icon: { name: 'mdi:alert', color: 'red' },
    })
  })
}

const items: OptionItem[] = [
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

const tgl = ref<boolean>(false)
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
