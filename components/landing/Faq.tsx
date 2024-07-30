import {
	Accordion,
	AccordionItem,
	AccordionTrigger,
	AccordionContent,
} from "@/components/ui/accordion";

export default function Component() {
	return (
		<section className="w-full py-12 md:py-24 lg:py-32">
			<div className="container mx-auto  px-4 md:px-6">
				<div className="mx-auto max-w-3xl space-y-4 text-center">
					<h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
						Frequently Asked Questions
					</h2>
				</div>
				<div className="mx-auto mt-12 max-w-3xl space-y-4">
					<Accordion type="single" collapsible>
						<AccordionItem value="limit">
							<AccordionTrigger className="text-lg font-medium">
								Are there any limits on the free plan?
							</AccordionTrigger>
							<AccordionContent>
								<div className="space-y-2 py-4 text-muted-foreground">
									<p>yes there are some</p>
									<ul>
										<li>exporting generations to csv format</li>
										<li>1,000 rows per generation</li>
										<li>10 columns per generation</li>
										<li>5 generations at once</li>
									</ul>
								</div>
							</AccordionContent>
						</AccordionItem>
						<AccordionItem value="delete">
							<AccordionTrigger className="text-lg font-medium">
								will my data be saved?
							</AccordionTrigger>
							<AccordionContent>
								<div className="space-y-2 py-4 text-muted-foreground">
									<p>your data is saved until you delete it then its gone</p>
								</div>
							</AccordionContent>
						</AccordionItem>
						<AccordionItem value="open">
							<AccordionTrigger className="text-lg font-medium">
								is there a user limit?
							</AccordionTrigger>
							<AccordionContent>
								<div className="space-y-2 py-4 text-muted-foreground">
									<p>
										yes there is because until the backend systems are ready to
										serve more users
									</p>
								</div>
							</AccordionContent>
						</AccordionItem>
						<AccordionItem value="open">
							<AccordionTrigger className="text-lg font-medium">
								what about the backend code?
							</AccordionTrigger>
							<AccordionContent>
								<div className="space-y-2 py-4 text-muted-foreground">
									<p>
										our backend is created in golang and it is under active
										development currently it is not ready to be opensource
									</p>
								</div>
							</AccordionContent>
						</AccordionItem>
					</Accordion>
				</div>
			</div>
		</section>
	);
}
