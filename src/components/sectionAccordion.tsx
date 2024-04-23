import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"


type Props = {
  defaultOpen?: boolean
  children: React.ReactNode
  title: React.ReactNode
}


const SectionAccordion: React.FC<Props> = ({ defaultOpen = true, children, title }) => {
  const defaultOpenValue = defaultOpen ? "item-1" : undefined

  return (<Accordion type="single" collapsible className=" w-full" defaultValue={defaultOpenValue}>
    <AccordionItem value="item-1">
      <AccordionTrigger className=" pl-4 text-2xl font-bold">{title}</AccordionTrigger>
      <AccordionContent>
        {children}
      </AccordionContent>
    </AccordionItem>
  </Accordion>)
}

export default SectionAccordion;