import { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useAppDispatch } from "../state/hooks";
import { ReviewTypes, ProductTypes, VarientType } from "../state/product/types";
import {
  getProductByIdAction,
  getReviewsByProductAction,
} from "../state/product/actions";
import { LargeFilledButton } from "../components/ui/Buttons";
import BuyerReviewCard from "../components/ui/BuyerReviewCard";
import { SubTitle, Text, Typography } from "../components/ui/Text";
import SpinLoader from "../components/ui/SpinLoader";

const ProductDetailPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const [currectProduct, setCurrentProduct] = useState<
    ProductTypes | undefined
  >();
  const [currentReviews, setCurrentReviews] = useState<ReviewTypes[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [isVariantModalOpen, setIsVariantModalOpen] = useState(false);
  const [selectedVariantId, setSelectedVariantId] = useState<number | null>(
    null
  );

  // Format USD prices
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  // Get all enabled variants (only for Printify products)
  const enabledVariants: VarientType[] =
    currectProduct?.isPrintify && currectProduct?.printifyData?.variants
      ? currectProduct.printifyData.variants.filter((v) => v.is_enabled)
      : [];

  const handleAddToCart = useCallback(() => {
    // For non-Printify products, go directly to checkout without variant selection
    if (!currectProduct?.isPrintify) {
      navigate(`/checkout/${id}?variant=0`);
      return;
    }

    // For Printify products, check variants
    if (!enabledVariants.length) return; // no enabled variants

    if (enabledVariants.length === 1) {
      // only one variant, go straight to checkout
      navigate(`/checkout/${id}?variant=${enabledVariants[0].id}`);
    } else {
      // multiple variants, open modal
      setIsVariantModalOpen(true);
    }
  }, [enabledVariants, navigate, id, currectProduct?.isPrintify]);

  useEffect(() => {
    const fetchProductAndReviews = async () => {
      if (id) {
        setIsLoading(true);
        try {
          const [product, reviews] = await Promise.all([
            dispatch(getProductByIdAction(id)).unwrap(),
            dispatch(getReviewsByProductAction(id)).unwrap(),
          ]);

          setCurrentProduct(product);
          setCurrentReviews(reviews.reviews);
        } catch (e) {
          console.error(e);
        } finally {
          setIsLoading(false);
        }
      }
    };
    fetchProductAndReviews();
  }, [dispatch, id]);

  if (isLoading) {
    return <SpinLoader className="flex-grow" size={50} />;
  }

  if (!currectProduct) {
    return (
      <div className="container flex flex-grow items-center justify-center py-12 md:py-20">
        <Typography className="text-gray-500">Product not found</Typography>
      </div>
    );
  }

  return (
    <>
      {/* Product Header */}
      <div className="bg-[#F9F4EE] py-12 relative">
        <div className="container text-center w-full">
          <div className="relative flex justify-center w-80 sm:w-96 md:w-150 mx-auto">
            <img
              src={currectProduct?.image}
              alt={currectProduct?.name || ""}
              className="w-full rounded-lg"
            />
          </div>
          <p className="text-2xl font-medium">
            Everything holds frequency. This one is tuned to yours.
          </p>

          {/* Display product price */}
          <h1 className="text-2xl">{formatter.format(currectProduct.price)}</h1>

          {/* Add To Cart Button */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
            <LargeFilledButton onClick={handleAddToCart}>
              Add To Cart
            </LargeFilledButton>
          </div>
        </div>
      </div>

      {/* Variant Selection Modal - Only for Printify products */}
      {isVariantModalOpen && currectProduct?.isPrintify && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-80">
            <h2 className="text-lg font-bold mb-4">Select a Variant</h2>
            <div className="flex flex-col gap-3">
              {enabledVariants.map((variant) => (
                <button
                  key={variant.id}
                  onClick={() => {
                    setSelectedVariantId(variant.id);
                    setIsVariantModalOpen(false);
                    navigate(`/checkout/${id}?variant=${variant.id}`);
                  }}
                  className="py-2 px-4 bg-[#A823F9] text-white rounded hover:bg-[#8A1ACF]"
                >
                  {variant.title} - {formatter.format(variant.price / 100)}
                </button>
              ))}
            </div>
            <button
              onClick={() => setIsVariantModalOpen(false)}
              className="mt-4 text-gray-500 underline"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Product Description */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="container pt-12 md:pt-24 pb-6 md:pb-12 text-center"
      >
        <SubTitle className="mb-6 md:mb-12">{currectProduct?.name}</SubTitle>
        <div
          className="text-left"
          dangerouslySetInnerHTML={{
            __html: currectProduct?.description || "",
          }}
        />
      </motion.div>

      {/* Reviews */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="container py-6 md:py-12 text-center"
        hidden
      >
        <SubTitle className="mb-6">What are other People Saying</SubTitle>
        <Text className="mb-12">See how this shifted their space.</Text>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-4 justify-items-center">
            {!currentReviews || currentReviews.length === 0 ? (
              <div className="col-span-full flex items-center justify-center py-8">
                <Typography className="text-gray-500">
                  No reviews yet. Be the first to share your experience!
                </Typography>
              </div>
            ) : (
              currentReviews.map((review: ReviewTypes, index: number) => (
                <BuyerReviewCard
                  key={index}
                  buyerName={review.buyerName}
                  feedbackMark={review.feedbackMark}
                  reviewText={review.reviewText}
                  isVerifiedBuyer={review.isVerifiedBuyer}
                  isFeatured={review.isFeatured}
                />
              ))
            )}
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default ProductDetailPage;
