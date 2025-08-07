import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useAppDispatch, useAppSelector } from "../state/hooks";
import { RootState } from "../state/store";
import { FullWidthButton, VerticalsButton } from "../components/ui/Buttons";
import InsideCard from "../components/ui/InsideCard";
import CuratedCard from "../components/ui/CuratedCard";
import JournalItem from "../components/ui/JournalItem";
import { SubTitle, Typography, Text } from "../components/ui/Text";
import { getAllJournalsAction } from "../state/journal/actions";
import { JournalTypes } from "../state/journal/types";
import { CuratedCategoryTypes } from "../state/product/types";
import SpinLoader from "../components/ui/SpinLoader";
import ExplosionEffect from "../components/ui/ExplosionEffect";

interface InsideProps {
  title: string;
  subtitle?: string;
}

const insideLists: InsideProps[] = [
  {
    title: "5D Home Starter Pack",
  },
  {
    title: "Emotional Mastery Map",
  },
];

const ShiftInteriors = () => {
  const dispatch = useAppDispatch();
  const { curatedCategories } = useAppSelector(
    (state: RootState) => state.product
  );
  const interiorsCuratedCategories = curatedCategories.filter(
    (category) => category.shift === "Interior"
  );

  const [isJournalLoading, setIsJournalLoading] = useState<boolean>(false);
  const [journals, setJournals] = useState<JournalTypes[]>([]);

  useEffect(() => {
    const fetchJournals = async () => {
      setIsJournalLoading(true);
      try {
        const result = await dispatch(
          getAllJournalsAction({
            limit: "18",
            shift: "Interior",
            sortBy: "newest",
          })
        ).unwrap();
        setJournals(result.journals || []);
      } catch (e) {
        console.error(e);
      } finally {
        setIsJournalLoading(false);
      }
    };
    fetchJournals();
  }, [dispatch]);

  return (
    <>
      <div className="pt-12 md:pt-24 pb-24 md:pb-48 interiors-background-2">
        <div className="container text-center">
          <div className="flex flex-col md:flex-row md:items-center md:space-x-4 rounded-lg">
            <div className="w-full">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="mb-12 md:mb-24"
              >
                <h1
                  className="font-playfair text-[60px] md:text-[100px] font-bold leading-[60px] md:leading-[100px] text-[#be815a]"
                  style={{
                    textShadow: `
                                            -1px -1px 0 #15141e,  
                                            1px -1px 0 #15141e,
                                            -1px 1px 0 #15141e,
                                            1px 1px 0 #15141e,
                                            0px 1px 0 #15141e,
                                            1px 0px 0 #15141e,
                                            0px -1px 0 #15141e,
                                            -1px 0px 0 #15141e
                                        `,
                  }}
                >
                  ZenShift
                </h1>
                <h2
                  className="font-playfair text-[42px] md:text-[70px] uppercase font-bold leading-[70px] text-[#be815a] md:mb-4"
                  style={{
                    textShadow: `
                                            -1px -1px 0 #15141e,  
                                            1px -1px 0 #15141e,
                                            -1px 1px 0 #15141e,
                                            1px 1px 0 #15141e,
                                            0px 1px 0 #15141e,
                                            1px 0px 0 #15141e,
                                            0px -1px 0 #15141e,
                                            -1px 0px 0 #15141e
                                        `,
                  }}
                >
                  Interiors
                </h2>
                <h3
                  className="font-playfair text-2xl md:text-4xl font-semibold text-[#be815a] italic mb-4 md:mb-8"
                  style={{
                    textShadow: `
                                            -1px -1px 0 #15141e,  
                                            1px -1px 0 #15141e,
                                            -1px 1px 0 #15141e,
                                            1px 1px 0 #15141e,
                                            0px 1px 0 #15141e,
                                            1px 0px 0 #15141e,
                                            0px -1px 0 #15141e,
                                            -1px 0px 0 #15141e
                                        `,
                  }}
                >
                  Shift your surroundings,
                  <br /> shift your life.
                </h3>
                <p
                  className="font-playfair text-2xl md:text-4xl text-[#be815a] max-w-[480px] mx-auto"
                  style={{
                    textShadow: `
                                            -1px -1px 0 #15141e,  
                                            1px -1px 0 #15141e,
                                            -1px 1px 0 #15141e,
                                            1px 1px 0 #15141e,
                                            0px 1px 0 #15141e,
                                            1px 0px 0 #15141e,
                                            0px -1px 0 #15141e,
                                            -1px 0px 0 #15141e
                                        `,
                  }}
                >
                  Design with frequency. Align your home, align your energy.
                </p>
              </motion.div>
              <div className="flex flex-wrap items-center justify-center gap-4">
                {/* <ExplosionEffect>
                                    <button
                                        className='py-2 md:py-4 px-4 md:px-8 text-xl md:text-3xl text-[#f0cba2] bg-[#283441] border border-[#f0cba2] rounded-full hover:bg-[#f0cba2] hover:text-[#283441] hover:scale-[1.02] transition-all duration-300'
                                    >
                                        Explore Remedies
                                    </button>
                                </ExplosionEffect>
                                <ExplosionEffect>
                                    <button
                                        className='py-2 md:py-4 px-4 md:px-8 text-xl md:text-3xl text-[#f0cba2] bg-[#283441] border border-[#f0cba2] rounded-full hover:bg-[#f0cba2] hover:text-[#283441] hover:scale-[1.02] transition-all duration-300'
                                    >
                                        Shop Prosperity Tools
                                    </button>
                                </ExplosionEffect>     */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-[3px] bg-[#00f1ff]"></div>
      <div className="container py-6 md:py-12 text-center">
        <SubTitle className="mb-6 md:mb-12">Curated Categories</SubTitle>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {interiorsCuratedCategories.map(
            (category: CuratedCategoryTypes, index: number) => (
              <CuratedCard
                key={index}
                imageSrc={category.imageSrc}
                title={category.title}
                category={category.category}
                tooltip={`Learn more about ${category.title}`}
              />
            )
          )}
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="container py-6 md:py-12 text-center"
      >
        <SubTitle className="mb-6 md:mb-12">What Is Energetic Design?</SubTitle>
        <Text>
          ZenShiftInteriors blends sacred geometry, chakra alignment, and
          spatial harmony with design strategy. This isn't about trends—it's
          about creating space that holds your next level.
        </Text>
      </motion.div>
      <div className="w-full h-[3px] bg-[#00f1ff]"></div>
      <div className="container py-12 md:py-24 text-center">
        <SubTitle className="mb-8 md:mb-16">ZenShift Interiors Journal</SubTitle>
        {isJournalLoading ? (
          <SpinLoader className="flex-grow" size={50} />
        ) : journals.length === 0 ? (
          <div className="container flex flex-grow items-center justify-center py-12 md:py-20">
            <Typography className="text-gray-500">
              No interior journals found
            </Typography>
          </div>
        ) : (
          <div className="flex flex-wrap justify-center gap-10">
            {journals.map((journal: JournalTypes, index: number) => (
              <JournalItem
                key={index}
                id={journal._id}
                src={journal.image}
                title={journal.title}
                vertical={journal.shift}
                summary={journal.summary}
              />
            ))}
          </div>
        )}
        <div className="flex justify-center">
          <VerticalsButton leftColor="#763AF5" rightColor="#9F0CF2" hidden>
            Explore More Insights
          </VerticalsButton>
        </div>
      </div>
      <div className="w-full h-[3px] bg-[#00f1ff]"></div>
      {/* <motion.div 
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className='container text-center py-12 md:py-24'
            >
                <SubTitle className='mb-6 md:mb-12'>
                    Get Started Free
                </SubTitle>
                <div className='flex justify-center'>
                    <VerticalsButton leftColor='#763AF5' rightColor='#9F0CF2'>
                        Get Access Interior Tools
                    </VerticalsButton>
                </div>
            </motion.div>
            <div className='container pb-12 md:pb-24 text-center'>
                <SubTitle className='mb-6 md:mb-12'>
                    What Is Inside<br/>The Library
                </SubTitle>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-8 justify-items-center'>
                    {insideLists.map((item: InsideProps, index: number) => (
                        <InsideCard key={index} title={item.title} buttonText='Preview' subtitle={item.subtitle || ''} />
                    ))}
                </div>
            </div> */}
    </>
  );
};

export default ShiftInteriors;
