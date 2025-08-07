import React, { useState, useCallback } from "react";
import { motion } from "framer-motion";
import DashboardHeader from "../components/layouts/DashboardHeader";
import Footer from "../components/layouts/Footer";
import { SubTitle, Text } from "../components/ui/Text";
import ExplosionEffect from "../components/ui/ExplosionEffect";
import { useAppDispatch, useAppSelector } from "../state/hooks";
import { RootState } from "../state/store";
import { createCheckoutSessionAction } from "../state/subscription/actions";

interface MembershipProps {}

type PlanType = "basic" | "premium";

const Membership: React.FC<MembershipProps> = () => {
    const dispatch = useAppDispatch();
    const user = useAppSelector((state: RootState) => state.user);
    const [isStripeLoading, setIsStripeLoading] = useState<boolean>(false);
    const [selectedPlan, setSelectedPlan] = useState<PlanType | null>(
        user.subscription.plan || null
    );

    const handleSubscribe = useCallback(
        (plan: PlanType) => async () => {
            try {
                setIsStripeLoading(true);
                setSelectedPlan(plan);
                const result = await dispatch(
                    createCheckoutSessionAction({ plan })
                ).unwrap();
                window.open(result.url, "_self");
            } catch (e) {
                // eslint-disable-next-line no-console
                console.error(e);
            } finally {
                setIsStripeLoading(false);
            }
        },
        [dispatch]
    );

    return (
        <>
            <DashboardHeader />
            <div className="bg-white">
                <div className="container pt-12 md:pt-24 pb-12 text-center">
                    <div className="mb-12">
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <SubTitle className="mb-12">
                                Unlock the Full ZenAI Experience
                            </SubTitle>
                        </motion.div>
                        <Text>
                            Elevate your spiritual journey with personalized guidance and energy alignment.
                        </Text>
                    </div>
                    <div className="mb-12">
                        <div className="flex flex-wrap justify-around gap-6 md:gap-12">
                            <motion.div
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8 }}
                                className="flex flex-col bg-white rounded-2xl shadow-lg p-8 w-80 border-2 border-[#D9D9D9]"
                            >
                                <div>
                                    <h2 className="text-2xl font-playfair font-semibold text-gray-800 mb-2">
                                        Standard
                                    </h2>
                                    <p className="text-4xl font-lato font-bold text-gray-900 mb-6">
                                        <span>$9.99</span>
                                        <span className="text-lg font-normal text-gray-600">/month</span>
                                    </p>
                                </div>
                                <ul className="flex-grow text-gray-700 space-y-3 mb-8 text-left">
                                    <li className="flex items-center font-lato">
                                        <span className="text-[#FFCD29] mr-2">✓</span> Access to ZenAI personal assistant
                                    </li>
                                    <li className="flex items-center font-lato">
                                        <span className="text-[#FFCD29] mr-2">✓</span> Chakra alignment guidance
                                    </li>
                                    <li className="flex items-center font-lato">
                                        <span className="text-[#FFCD29] mr-2">✓</span> Basic meditation resources
                                    </li>
                                    <li className="flex items-center font-lato">
                                        <span className="text-[#FFCD29] mr-2">✓</span> Monthly energy reading
                                    </li>
                                </ul>
                                <ExplosionEffect className="w-full">
                                    <button
                                        className="w-full font-lato py-3 px-6 border border-[#808080] rounded-md text-gray-700 font-semibold hover:bg-gray-50 transition duration-300"
                                        disabled={isStripeLoading || selectedPlan === "basic"}
                                        onClick={handleSubscribe("basic")}
                                    >
                                        {isStripeLoading ? "Loading..." : "Subscribe Now"}
                                    </button>
                                </ExplosionEffect>
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8 }}
                                className="promembership flex flex-col bg-white rounded-2xl shadow-lg p-8 w-80 border-2 border-[#D9D9D9]"
                            >
                                <div>
                                    <h2 className="text-2xl font-playfair font-semibold text-gray-800 mb-2">
                                        ZenAI Pro
                                    </h2>
                                    <p className="text-4xl font-lato font-bold text-gray-900 mb-6">
                                        $19.99
                                        <span className="text-lg font-normal text-gray-600">/month</span>
                                    </p>
                                </div>
                                <ul className="flex-grow text-gray-700 space-y-3 mb-8 text-left">
                                    <li className="flex items-center font-lato">
                                        <span className="text-[#FFCD29] mr-2">✓</span> Access to ZenAI personal assistant
                                    </li>
                                    <li className="flex items-center font-lato">
                                        <span className="text-[#FFCD29] mr-2">✓</span> Chakra alignment guidance
                                    </li>
                                    <li className="flex items-center font-lato">
                                        <span className="text-[#FFCD29] mr-2">✓</span> Basic meditation resources
                                    </li>
                                    <li className="flex items-center font-lato">
                                        <span className="text-[#FFCD29] mr-2">✓</span> Monthly energy reading
                                    </li>
                                    <li className="flex items-center font-lato">
                                        <span className="text-[#FFCD29] mr-2">✓</span> Priority support access
                                    </li>
                                    <li className="flex items-center font-lato">
                                        <span className="text-[#FFCD29] mr-2">✓</span> Weekly personalized insights
                                    </li>
                                </ul>
                                <ExplosionEffect className="w-full">
                                    <button
                                        className="w-full font-lato py-3 px-6 bg-yellow-400 rounded-md text-white font-semibold hover:bg-yellow-500 transition duration-300"
                                        disabled={isStripeLoading || selectedPlan === "premium"}
                                        onClick={handleSubscribe("premium")}
                                    >
                                        {isStripeLoading ? "Loading..." : "Subscribe Now"}
                                    </button>
                                </ExplosionEffect>
                            </motion.div>
                        </div>
                    </div>
                    <div className="mb-12">
                        <SubTitle className="mb-12">Feature Hightlight</SubTitle>
                        <div className="flex flex-wrap justify-around gap-6 md:gap-12">
                            <motion.div
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                className="bg-white rounded-lg shadow-lg p-8 w-80 text-left border-2 border-[#808080]"
                            >
                                <div className="text-yellow-500 text-5xl mb-4">
                                    <svg
                                        width="50"
                                        height="50"
                                        viewBox="0 0 108 108"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M87.8334 0.833252L81.7434 14.1249L68.5 20.1666L81.7434 26.2566L87.8334 39.4999L93.875 26.2566L107.167 20.1666L93.875 14.1249M39.5 15.3333L27.4167 41.9166L0.833374 53.9999L27.4167 66.0833L39.5 92.6666L51.5834 66.0833L78.1667 53.9999L51.5834 41.9166M87.8334 68.4999L81.7434 81.7433L68.5 87.8333L81.7434 93.8749L87.8334 107.167L93.875 93.8749L107.167 87.8333L93.875 81.7433"
                                            fill="#FFCD29"
                                        />
                                    </svg>
                                </div>
                                <h3 className="text-3xl font-semibold text-gray-800 mb-2">Personal Ai Guide</h3>
                                <p className="text-xl text-gray-900">
                                    Experience personalized spiritual guidance based on your unique energy profile and journey.
                                </p>
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8 }}
                                className="bg-white rounded-lg shadow-lg p-8 w-80 text-left border-2 border-[#808080]"
                            >
                                <div className="text-purple-500 text-5xl mb-4">
                                    <svg
                                        width="35"
                                        height="50"
                                        viewBox="0 0 78 98"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M39 97.3334C27.8028 94.514 18.5582 88.0889 11.2663 78.0581C3.97443 68.0273 0.330093 56.8913 0.333315 44.6501V15.1667L39 0.666748L77.6666 15.1667V44.6501C77.6666 56.8945 74.0223 68.0321 66.7337 78.0629C59.445 88.0937 50.2004 94.5172 39 97.3334ZM39 87.1834C47.3778 84.5251 54.3055 79.2084 59.7833 71.2334C65.2611 63.2584 68 54.3973 68 44.6501V21.8126L39 10.9376L9.99998 21.8126V44.6501C9.99998 54.3973 12.7389 63.2584 18.2166 71.2334C23.6944 79.2084 30.6222 84.5251 39 87.1834Z"
                                            fill="#763AF5"
                                        />
                                    </svg>
                                </div>
                                <h3 className="text-3xl font-semibold text-gray-800 mb-2">Chakra Balancing</h3>
                                <p className="text-xl text-gray-900">
                                    Identify energy blockages and receive tailored practices to align and balance your chakra system.
                                </p>
                            </motion.div>
                        </div>
                    </div>
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <SubTitle className="mb-12">Testimonials</SubTitle>
                        <Text className="mb-8">
                            "ZenAI has completely transformed my spiritual practice. The personalized guidance has helped me unlock energy patterns I wasn't even aware of."
                        </Text>
                        <Text className="mb-12">- Sarah K., ZenAI Member</Text>
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            transition={{ duration: 0.6 }}
                            className="flex justify-center"
                        >
                            <ExplosionEffect>
                                <a
                                    href="/sign-up"
                                    className="py-4 px-32 bg-[#FFCD29] rounded-md text-white font-bold text-lg hover:bg-yellow-500 transition duration-300"
                                >
                                    Sign UP
                                </a>
                            </ExplosionEffect>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Membership; 