import { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useAppDispatch, useAppSelector } from "../state/hooks";
import { RootState } from "../state/store";
import { MainTitle, SubTitle, Typography, Text } from "../components/ui/Text";
import ExplosionEffect from "../components/ui/ExplosionEffect";
import { Select } from "../components/ui/Select";
import ToggleSwitch from "../components/ui/ToggleSwitch";
import { getAllProductsAction } from "../state/product/actions";
import SpinLoader from "../components/ui/SpinLoader";
import {
  ProductTypes,
  SortByTypes,
  CategoryTypes,
  FrequencyStyleTypes,
  VarientType,
} from "../state/product/types";

interface CategoryCardProps {
  id: string;
  src: string;
  title: string;
  summary?: string;
  description?: string;
  rating?: number;
  price?: number;
  className?: string;
  isEnabledSubHeading: boolean;
  isEnabledIntroBlock: boolean;
  product: ProductTypes;
}

// ✅ Add a lookup table for category descriptions
const categoryDescriptions: Record<CategoryTypes, string> = {
  "abundance-field":
    "Energetic openings for wealth, joy, and aligned receptivity. Designed to recalibrate your inner magnetism.",
  "books-journals":
    "Wisdom, remembrance, and reflection in written form. Frequency-infused pages for your inner journey.",
  "digital-codes":
    "Sacred sequences, encoded symbols, and light language activations — downloadable tools to shift your field.",
  "frequency-drops":
    "Vibration-based infusions to soothe, stabilize, or uplift. These are not sounds — they’re signals.",
  "apparel-accessories":
    "Wear your shift. Energy-encoded items that align your outer layer with your inner light.",
  "home-energy-tools":
    "For the gridkeepers and space holders — infuse your home with coherence, calm, and clarity.",
  "journals-accessories":
    "Anchor your expansion. These tools support memory, mapping, and multidimensional reflection.",
  "mugs-drinkware":
    "Daily rituals, encoded. Chakra-aligned, intention-charged vessels for your hydration and flow.",
  "energetic-atmosphere":
    "Curated tools to purify and elevate your space. Because the field around you is part of you.",
  "flow-mapping":
    "Visual guidance systems to track your evolution, collapse loops, and anchor new timelines.",
  "intentional-objects":
    "Crystalline tools, anchors, and symbols of remembrance — infused with aligned presence.",
  "light-tone":
    "Subtle frequency harmonizers for your environment. Think of them as mood fields in material form.",
  "energy-immune-flow":
    "Support your physical vessel with energetic coherence. Designed for gentle daily use.",
  "everyday-ascension-care":
    "Practical tools for living the shift — support your body, mind, and field in everyday life.",
  "gut-mood-harmony":
    "Restore the relationship between inner terrain and emotional state. Because your gut feels first.",
  "nervous-system-reset":
    "Calm your inner wiring. These tools stabilize your baseline so you can feel safe to expand.",
};

const isProductCategoryType = (value: any): value is CategoryTypes => {
  return [
    "abundance-field",
    "books-journals",
    "digital-codes",
    "frequency-drops",
    "apparel-accessories",
    "home-energy-tools",
    "journals-accessories",
    "mugs-drinkware",
    "energetic-atmosphere",
    "flow-mapping",
    "intentional-objects",
    "light-tone",
    "energy-immune-flow",
    "everyday-ascension-care",
    "gut-mood-harmony",
    "nervous-system-reset",
  ].includes(value);
};

const CategoryCard = ({
  id,
  src,
  title,
  summary,
  description,
  rating,
  price,
  className,
  isEnabledSubHeading,
  isEnabledIntroBlock,
  product,
}: CategoryCardProps) => {
  const navigate = useNavigate();
  const [isVariantModalOpen, setIsVariantModalOpen] = useState(false);

  // Format USD prices
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  // Get all enabled variants (only for Printify products)
  const enabledVariants: VarientType[] =
    product?.isPrintify && product?.printifyData?.variants
      ? product.printifyData.variants.filter((v) => v.is_enabled)
      : [];

  const handleGotoCheckout = useCallback(() => {
    // For non-Printify products, go directly to checkout without variant selection
    if (!product?.isPrintify) {
      navigate(`/checkout/${id}?variant=0`);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    // For Printify products, check variants
    if (!enabledVariants.length) {
      // no variants, go straight to checkout
      navigate(`/checkout/${id}`);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    if (enabledVariants.length === 1) {
      // only one variant, go straight to checkout
      navigate(`/checkout/${id}?variant=${enabledVariants[0].id}`);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      // multiple variants, open modal
      setIsVariantModalOpen(true);
    }
  }, [enabledVariants, navigate, id, product?.isPrintify]);

  const handleGotoProduct = useCallback(() => {
    navigate(`/product/${id}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [navigate, id]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.6 }}
      className={`relative bg-[#18051B] rounded-xl overflow-hidden shadow-lg w-full max-w-xs mx-auto hover:shadow-[0_0_20px_rgba(255,230,77,0.4)] group ${className || ""
        }`}
    >
      <ExplosionEffect dotQuantity={60} explosionRadius={500} speed={0.8}>
        <div className="relative p-4">
          <img
            src={src}
            alt={title}
            className="bg-[#e9e9e9] w-full h-48 rounded-lg object-contain"
          />
          {rating && (
            <span className="absolute top-[15px] right-[15px] bg-black text-[#FFE600] text-xs font-bold px-2 py-1 rounded-full rounded-r-none rounded-t-none flex items-center">
              ⭐ {rating}
            </span>
          )}
        </div>
        <div className="p-4 pb-8 text-center">
          {isEnabledSubHeading && (
            <h3 className="text-white text-start text-lg font-bold mb-2">
              {title}
            </h3>
          )}
          <div className="text-start mb-2">
            {price === 0 ? (
              <div className="inline-block bg-[#FFE600] text-black px-3 py-1 rounded-full text-sm font-bold border-2 border-[#FFD700] shadow-lg">
                Freebie
              </div>
            ) : (
              <h4 className="text-[#FFE600] text-xl font-bold">${price}</h4>
            )}
          </div>
          {isEnabledIntroBlock && summary && (
            <p className="text-white text-start mb-3 line-clamp-2 text-sm leading-relaxed">
              {summary.length > 120
                ? `${summary.substring(0, 120)}...`
                : summary}
            </p>
          )}
          <div className="flex flex-col gap-3">
            <button
              onClick={handleGotoProduct}
              className="bg-[#FFE600] text-black py-2 px-6 rounded-full font-bold transition-all duration-300 hover:bg-[#FFD700] hover:shadow-[0_0_10px_rgba(255,230,77,0.5)] w-full"
            >
              View Details
            </button>
            <button
              onClick={handleGotoCheckout}
              className="bg-[#A823F9] text-white py-2 px-6 rounded-full font-bold transition-all duration-300 hover:bg-opacity-90 hover:shadow-[0_0_10px_rgba(255,230,77,0.5)] w-full"
            >
              Add To Cart
            </button>
          </div>
        </div>
      </ExplosionEffect>

      {/* Variant Selection Modal - Only for Printify products */}
      {isVariantModalOpen && product?.isPrintify && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-80 max-w-[90vw]">
            <h2 className="text-lg font-bold mb-4">Select a Variant</h2>
            <div className="flex flex-col gap-3">
              {enabledVariants.map((variant) => (
                <button
                  key={variant.id}
                  onClick={() => {
                    setIsVariantModalOpen(false);
                    navigate(`/checkout/${id}?variant=${variant.id}`);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="py-2 px-4 bg-[#A823F9] text-white rounded hover:bg-[#8A1ACF] transition-colors"
                >
                  {variant.title} - {formatter.format(variant.price / 100)}
                </button>
              ))}
            </div>
            <button
              onClick={() => setIsVariantModalOpen(false)}
              className="mt-4 text-gray-500 underline hover:text-gray-700"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );
};

const AllProducts = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const { curatedCategories } = useAppSelector(
    (state: RootState) => state.product
  );
  const currentCuratedCategory = curatedCategories.find(
    (category) => category.category === id
  );

  const filterByOptions = [
    { value: "", label: "All Types" },
    { value: "Modern", label: "Modern" },
    { value: "Rustic", label: "Rustic" },
    { value: "Minimalist", label: "Minimalist" },
  ];

  const sortByOptions = [
    { value: "newest", label: "Newest" },
    { value: "oldest", label: "Oldest" },
    { value: "alphabetical", label: "Alphabetical" },
    { value: "price", label: "Price: Low to High" },
    { value: "priceDesc", label: "Price: High to Low" },
  ];

  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState<ProductTypes[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedFilterValue, setSelectedFilterValue] = useState("");
  const [selectedSortValue, setSelectedSortValue] = useState("newest");
  const [isEnabledSubHeading, setIsEnabledSubHeading] = useState(true);
  const [isEnabledIntroBlock, setIsEnabledIntroBlock] = useState(true);

  // Client-side sorting function as fallback
  const sortProducts = (products: ProductTypes[], sortBy: string): ProductTypes[] => {
    const sortedProducts = [...products];
    
    switch (sortBy) {
      case 'alphabetical':
        return sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
      case 'price':
        return sortedProducts.sort((a, b) => a.price - b.price);
      case 'priceDesc':
        return sortedProducts.sort((a, b) => b.price - a.price);
      case 'newest':
        return sortedProducts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      case 'oldest':
        return sortedProducts.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
      default:
        return sortedProducts;
    }
  };

  useEffect(() => {
    const fetchAllProducts = async () => {
      setIsLoading(true);
      try {
        if (id) {
          console.log('Fetching products with sortBy:', selectedSortValue);
          const result = await dispatch(
            getAllProductsAction({
              page: currentPage.toString(),
              limit: "18",
              style: selectedFilterValue as FrequencyStyleTypes | undefined,
              category: id as CategoryTypes | undefined,
              sortBy: selectedSortValue as SortByTypes | undefined,
              includePrintify: "false",
            })
          ).unwrap();
          console.log('Products received:', result.products?.length, 'products');
          // Apply client-side sorting as fallback
          const sortedProducts = sortProducts(result.products || [], selectedSortValue);
          setProducts(sortedProducts);
          setTotalPages(result.totalPages || 1);
        }
      } catch (e) {
        console.error('Error fetching products:', e);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAllProducts();
  }, [dispatch, selectedFilterValue, selectedSortValue, currentPage, id]);

  if (!isProductCategoryType(id)) {
    return (
      <div className="container flex flex-grow items-center justify-center py-12 md:py-20">
        <Typography className="text-gray-500">Category not found</Typography>
      </div>
    );
  }

  return (
    <div className="container pt-12 md:pt-24 pb-12 text-center">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mb-8 md:mb-16"
      >
        <MainTitle>{currentCuratedCategory?.title || ""}</MainTitle>
      </motion.div>

      {/* ✅ Dynamic description based on category */}
      <Text className="mb-12">
        {id && isProductCategoryType(id) ? categoryDescriptions[id] : ""}
      </Text>

      <div className="flex flex-wrap gap-4 items-center justify-around bg-white border-[#00000042] shadow-lg rounded-xl p-4 mb-12">
        <Select
          options={sortByOptions}
          value={selectedSortValue}
          onChange={setSelectedSortValue}
          placeholder="Sort By"
          className="w-56 bg-[#A823F9] border-none text-white text-base"
          prefix="Sort By: "
        />
        {/* <Select
          options={filterByOptions}
          value={selectedFilterValue}
          onChange={setSelectedFilterValue}
          placeholder="Filter By"
          isShowArrow={true}
          className="w-56"
        /> */}
        <ToggleSwitch
          isEnabled={isEnabledSubHeading}
          onToggle={setIsEnabledSubHeading}
          size="lg"
          label="Show/hide subheading"
          disabled={false}
        />
        <ToggleSwitch
          isEnabled={isEnabledIntroBlock}
          onToggle={setIsEnabledIntroBlock}
          size="lg"
          label="Show/hide intro block"
          disabled={false}
        />
      </div>

      <SubTitle className="mb-12">Products</SubTitle>
      {isLoading ? (
        <SpinLoader className="flex-grow" size={50} />
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product, index) => (
              <CategoryCard
                key={index}
                id={product._id}
                src={product?.image}
                title={product.name}
                summary={product.summary}
                description={product.description}
                rating={product.rating}
                price={product.price}
                isEnabledSubHeading={isEnabledSubHeading}
                isEnabledIntroBlock={isEnabledIntroBlock}
                product={product}
              />
            ))}
          </div>
          <div className="flex items-center justify-center mt-8">
            <nav
              className="flex items-center space-x-1"
              aria-label="Pagination"
            >
              {currentPage > 1 && (
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-l-md hover:bg-gray-50"
                >
                  Previous
                </button>
              )}
              <div className="px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300">
                Page {currentPage} of {totalPages}
              </div>
              {currentPage < totalPages && (
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-r-md hover:bg-gray-50"
                >
                  Next
                </button>
              )}
            </nav>
          </div>
        </>
      )}
    </div>
  );
};

export default AllProducts;
