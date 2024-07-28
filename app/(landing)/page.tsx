import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import Ability from "@/components/landing/Ability";
import Faq from "@/components/landing/Faq";
import Pricing from "@/components/landing/Pricing";
import Change from "@/components/landing/Change";
import Users from "@/components/landing/Users";

export default function Component() {
	return (
		<>
			<Hero />
			<Ability />
			<Features />
			<Pricing />
			{/* <Change /> */}
			{/* <Users /> */}
			<Faq />
		</>
	);
}
