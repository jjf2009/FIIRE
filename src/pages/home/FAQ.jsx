import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqItems = [
  {
    question: "How do I apply for a funding scheme?",
    answer:
      "To apply for a funding scheme, you need to create an account, find the relevant scheme, and follow the application process outlined on the scheme's page. Make sure to prepare all required documents before starting your application.",
  },
  {
    question: "What are eligibility criteria?",
    answer:
      "Eligibility criteria are the requirements you must meet to qualify for a funding scheme. These may include your location, business size, industry sector, project type, and other specific conditions set by the funding provider.",
  },
  {
    question: "How can I check the status of my application?",
    answer:
      "You can check the status of your application by logging into your account and navigating to the 'My Applications' section. There you'll find real-time updates on all your submitted applications.",
  },
]

const FAQ = () => {
  return (
    <section>
      <h2 className="text-3xl font-bold mb-8">Frequently Asked Questions</h2>
      <Accordion type="single" collapsible className="space-y-4">
        {faqItems.map((item, index) => (
          <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg px-4">
            <AccordionTrigger className="text-left py-4">{item.question}</AccordionTrigger>
            <AccordionContent className="pb-4">{item.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  )
}

export default FAQ
