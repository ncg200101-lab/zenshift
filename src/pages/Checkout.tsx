import {
  useState,
  useEffect,
  useCallback,
  ChangeEvent,
  FormEvent,
} from "react";
import { motion } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useAppDispatch, useAppSelector } from "../state/hooks";
import { getProductByIdAction } from "../state/product/actions";
import { checkExistingPurchaseAction } from "../state/orders/actions";
import { ProductTypes, VarientType } from "../state/product/types";
import { FullWidthButton } from "../components/ui/Buttons";
import ExplosionEffect from "../components/ui/ExplosionEffect";
import { MainTitle, SubTitle, Typography, Text } from "../components/ui/Text";
import SpinLoader from "../components/ui/SpinLoader";
import PurchaseWarningDialog from "../components/ui/PurchaseWarningDialog";
import { downloadPDF, getPDFFilename, getPDFUrl } from "../utils/downloadUtils";
import { BASE_URL } from "../state/global/api";
import { useSearchParams } from "react-router-dom";

const stripePromise = loadStripe(
  `pk_live_51RcVwRF5euFWwT4DZTPKKXwwBJrvwW7jkPwVjpDGXp1XsUFWSLIOVu6KGAHvKX0qmW0N35J9ZFi7DIXLeFQFm7Sc00uxjElzxY`
  // `pk_test_51RcVwfFSC3F3IA9Hl6fwv8gycvpfYRNOOiGept7s78m3SZXli63Q033EbKvtLG6e2GtgUrDRL2RpNhKX21kYFeAf00c3HBE3HM`
);

const Checkout = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const variantId = searchParams.get("variant");
  const options = {
    appearance: {
      theme: "stripe",
    },
  };

  // Redux state
  const { existingPurchase, isCheckingPurchase } = useAppSelector((state: any) => state.orders);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const [showPurchaseWarning, setShowPurchaseWarning] = useState<boolean>(false);
  const [currectProduct, setCurrentProduct] = useState<
    ProductTypes | undefined
  >();
  const [selectedVariant, setSelectedVariant] = useState<VarientType | null>(
    null
  );
  const [count, setCount] = useState<number>(1);
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    saveForFuture: false,
    saveForFuturePayment: false,
    message: "",
    country: "",
    creditCard: "credit-card",
  });

  // Check if payment was canceled
  const paymentCanceled = searchParams.get("canceled") === "1";

  const handleCountChange = useCallback(
    (num: number) => () => {
      setCount((prev) => {
        const newCount = prev + num;
        return newCount < 1 ? prev : newCount;
      });
    },
    []
  );

  const handleResetCount = useCallback(() => {
    setCount(0);
  }, []);

  const handleChange = useCallback(
    (
      event: ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) => {
      const { name, value, type } = event.target;
      setFormData((prev) => ({
        ...prev,
        [name]:
          type === "checkbox"
            ? (event.target as HTMLInputElement).checked
            : value,
      }));
    },
    []
  );

  const handleDownload = async () => {
    if (!currectProduct?.bookPath) {
      alert("No digital product available for download.");
      return;
    }

    try {
      setIsDownloading(true);

      const response = await fetch(`${currectProduct.bookPath}`, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("Failed to download file.");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;

      // Get filename from path or product name
      const fileName =
        currectProduct.bookPath.split("/").pop() ||
        `${currectProduct.name}.pdf`;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
      link.remove();

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);
      alert("There was an error downloading your file. Please try again.");
    } finally {
      setIsDownloading(false);
    }
  };

  const checkExistingPurchase = useCallback(async () => {
    if (!formData.email.trim() || !currectProduct?._id) {
      return;
    }

    try {
      await dispatch(checkExistingPurchaseAction({
        email: formData.email.trim(),
        productId: currectProduct._id
      })).unwrap();
    } catch (error) {
      console.error('Error checking existing purchase:', error);
    }
  }, [dispatch, formData.email, currectProduct?._id]);

  const handleDownloadFromDialog = async () => {
    if (existingPurchase?.order?.product?.bookPath) {
      try {
        setIsDownloading(true);

        const response = await fetch(`${existingPurchase.order.product.bookPath}`, {
          method: "GET",
        });

        if (!response.ok) {
          throw new Error("Failed to download file.");
        }

        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;

        // Get filename from path or product name
        const fileName =
          existingPurchase.order.product.bookPath.split("/").pop() ||
          `${existingPurchase.order.productName}.pdf`;
        link.setAttribute("download", fileName);
        document.body.appendChild(link);
        link.click();
        link.remove();

        window.URL.revokeObjectURL(url);
        setShowPurchaseWarning(false);
      } catch (error) {
        console.error(error);
        alert("There was an error downloading your file. Please try again.");
      } finally {
        setIsDownloading(false);
      }
    }
  };

  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (isLoading) return;

      // Validate required fields for digital products
      if (
        currectProduct?.additionalDetails?.shippingFormat === "Digital Product"
      ) {
        if (!formData.email.trim()) {
          alert(
            "Please enter your email address to receive your digital product."
          );
          return;
        }
      } else {
        // Validate required fields for physical products
        if (
          !formData.email.trim() ||
          !formData.firstName.trim() ||
          !formData.lastName.trim() ||
          !formData.address.trim() ||
          !formData.city.trim() ||
          !formData.zipCode.trim() ||
          !formData.country ||
          !formData.state
        ) {
          alert("Please fill in all required fields for shipping.");
          return;
        }
      }

      // Check for existing purchase for digital products
      if (currectProduct?.additionalDetails?.shippingFormat === "Digital Product") {
        try {
          await dispatch(checkExistingPurchaseAction({
            email: formData.email.trim(),
            productId: currectProduct._id
          })).unwrap();

          // If user has already purchased, show warning dialog
          if (existingPurchase?.hasPurchased) {
            setShowPurchaseWarning(true);
            return;
          }
        } catch (error) {
          console.error('Error checking existing purchase:', error);
          // Continue with purchase if check fails
        }
      }

      try {
        setIsLoading(true);

        const response = await fetch(
          `${BASE_URL}/api/subscription/create-checkout-product-session`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              productId: currectProduct?._id,
              productName: currectProduct?.name,
              price: currectProduct?.price,
              quantity: count,
              email: formData.email || "",
              firstName: formData.firstName || "",
              lastName: formData.lastName || "",
              address: formData.address || "",
              city: formData.city || "",
              state: formData.state || "",
              zipCode: formData.zipCode || "",
              country: formData.country || "",
              variantId: currectProduct?.isPrintify ? (selectedVariant?.id || 0) : 0,
            }),
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(
            errorData.error || "Failed to create checkout session"
          );
        }

        const { url } = await response.json();

        // Redirect to Stripe checkout
        if (url) {
          window.location.href = url;
          return;
        } else {
          throw new Error("No checkout URL received");
        }
      } catch (e) {
        console.error(e);
        alert(
          `There was an error processing your payment: ${e instanceof Error ? e.message : "Please try again."
          }`
        );
      } finally {
        setIsLoading(false);
      }
    },
    [isLoading, id, navigate, currectProduct, count, formData, selectedVariant, dispatch, existingPurchase]
  );

  useEffect(() => {
    const fetchProduct = async () => {
      if (id) {
        setIsLoading(true);
        try {
          const product = await dispatch(getProductByIdAction(id)).unwrap();
          setCurrentProduct(product);
        } catch (e) {
          console.error(e);
        } finally {
          setIsLoading(false);
        }
      }
    };
    fetchProduct();

    // Request notification permission for digital product downloads
    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission();
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (currectProduct && variantId) {
      // Only process variants for Printify products
      if (currectProduct.isPrintify && currectProduct.printifyData?.variants) {
        const allVariants = currectProduct.printifyData.variants;
        const variant = allVariants.find((v) => v.id === parseInt(variantId));
        setSelectedVariant(variant || null);
      } else {
        // For non-Printify products, set variant to null
        setSelectedVariant(null);
      }
    }
  }, [currectProduct, variantId]);

  // Check for existing purchase when email changes for digital products
  useEffect(() => {
    if (
      formData.email.trim() &&
      currectProduct?.additionalDetails?.shippingFormat === "Digital Product" &&
      currectProduct?._id
    ) {
      const timeoutId = setTimeout(() => {
        checkExistingPurchase();
      }, 1000); // Debounce the check

      return () => clearTimeout(timeoutId);
    }
  }, [formData.email, currectProduct, checkExistingPurchase]);

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
    <Elements options={options as any} stripe={stripePromise}>
      <div className="container pt-12 md:pt-24 pb-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-6 md:mb-12"
        >
          <MainTitle>Complete Your Shift</MainTitle>
        </motion.div>
        <Text className="mb-12">
          Everything in your cart is energetically attuned. Let's bring it into
          your field.
        </Text>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative bg-[#E8E0CB] rounded-xl shadow-md p-6 w-full max-w-2xl mx-auto mb-8"
        >
          <div className="flex flex-col md:flex-row items-center md:space-x-6 space-y-6 mb-4 mt-8">
            <img
              src={currectProduct?.image}
              alt={currectProduct?.name || ""}
              className="w-2/3 md:w-1/3 object-contain rounded-lg p-2"
            />
            <div className="flex-grow">
              <h2 className="text-2xl text-left font-bold text-[#362925] font-inter mb-1">
                {currectProduct?.name || ""}
                {currectProduct?.isPrintify && selectedVariant && ` (${selectedVariant.title})`}
              </h2>
              <p className="text-xl text-left font-inter text-[#362925]">
                ${currectProduct?.price?.toFixed(2) || 0}
              </p>
              {currectProduct?.isFreebie === true && (
                <div className="flex items-center space-x-2 mb-2">
                  <svg
                    className="w-5 h-5 text-green-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-sm text-green-600 font-medium">
                    Digital Product - Instant Download
                  </span>
                </div>
              )}
              <div className="flex items-center m-2">
                <button
                  className="border border-black px-3 py-1 rounded-l-md text-[#362925] hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-[#763AF5]"
                  onClick={handleCountChange(-1)}
                >
                  -
                </button>
                <div className="w-12 text-center border-y border-black py-1 mx-0">
                  {count}
                </div>
                <button
                  className="border border-black px-3 py-1 rounded-r-md text-[#362925] hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-[#763AF5]"
                  onClick={handleCountChange(1)}
                >
                  +
                </button>
                <button
                  className="text-black text-sm ml-auto"
                  onClick={handleResetCount}
                >
                  Remove
                </button>
              </div>
              <div className="border-t border-gray-300 pt-4 flex justify-between font-inter items-center">
                <span className="text-black text-lg">SubTotal</span>
                <span className="font-bold text-lg text-[#362925]">
                  ${currectProduct?.price?.toFixed(2) || 0}
                </span>
              </div>
              <p className="text-sm font-lato text-left text-gray-500 mt-1">
                You're not just buying. You're shifting.
              </p>
              <div></div>
              <div className="flex flex-col md:flex-row justify-between mt-6 space-y-4 md:space-y-0 md:space-x-4">
                {currectProduct?.isFreebie !== true && (
                  <>
                    <ExplosionEffect className="flex-1 w-full">
                      <button
                        onClick={() => navigate('/store')}
                        className="w-full cursor-pointer border-2 border-[#FF752B] text-[#FF752B] py-3 rounded-xl font-semibold hover:bg-[#FF752B] hover:text-white transition-colors"
                      >
                        Keep Exploring
                      </button>
                    </ExplosionEffect>
                    <ExplosionEffect className="flex-1 w-full">
                      <button className="w-full cursor-pointer bg-[#FF752B] text-white py-3 rounded-xl font-semibold hover:bg-[#D4713E] transition-colors">
                        I'm Ready to Receive
                      </button>
                    </ExplosionEffect>
                  </>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        <form className="w-full max-w-2xl mx-auto" onSubmit={handleSubmit}>
          {/* Payment Canceled Notice */}
          {paymentCanceled && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6"
            >
              <div className="flex items-center space-x-2">
                <svg
                  className="w-5 h-5 text-red-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-red-800 font-medium">
                  Payment Canceled
                </span>
              </div>
              <p className="text-red-700 text-sm mt-2">
                Your payment was not completed. You can try again below or
                contact support if you need assistance.
              </p>
            </motion.div>
          )}

          <SubTitle className="text-left">Where Should We Send This?</SubTitle>
          <p className="text-sm font-lato text-gray-500 my-4 text-start">
            We'll never spam - only updates that support your shift.
          </p>
          <div className="w-full max-w-2xl mb-6 md:mb-8">
            <label htmlFor="email" className="sr-only">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email Address"
              className="w-full bg-white px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 hover:shadow-md focus:shadow-lg focus:border-transparent"
              required
            />
            {currectProduct?.isFreebie === true && (
              <p className="text-sm text-blue-600 mt-2 text-left">
                📧 Your email is required to deliver your digital product after
                purchase
              </p>
            )}
          </div>
          <div className="h-[3px] bg-gradient-to-r from-[#F15D0D24] to-[#FF752B]"></div>

          <SubTitle className="text-left mt-6">Delivery</SubTitle>
          {currectProduct?.isFreebie === true ? (
            <div className="w-full max-w-2xl my-6 md:my-8">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                <div className="flex items-center space-x-2">
                  <svg
                    className="w-5 h-5 text-blue-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-blue-800 font-medium">
                    Digital Product Notice
                  </span>
                </div>
                <p className="text-blue-700 text-sm mt-2">
                  This is a digital product that will be available for immediate
                  download after your payment is successfully processed. Only
                  your email address is required.
                </p>
                <p className="text-blue-600 text-xs mt-2 italic">
                  💡 Tip: Complete your purchase to access your digital product
                  download.
                </p>
              </div>
            </div>
          ) : (
            <div className="w-full max-w-2xl my-6 md:my-8">
              <div className="space-y-4">
                <div>
                  <label htmlFor="country" className="sr-only">
                    Country / Region
                  </label>
                  <select
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="w-full bg-white px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 hover:shadow-md focus:shadow-lg focus:border-transparent"
                    required={currectProduct?.isFreebie == false}
                  >
                    <option value="">Country / Region</option>
                    <option value="US">United States</option>
                    <option value="CA">Canada</option>
                    <option value="GB">United Kingdom</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="sr-only">
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="First Name"
                      className="w-full bg-white px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 hover:shadow-md focus:shadow-lg focus:border-transparent"
                      required={currectProduct?.isFreebie == false}
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="sr-only">
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Last Name"
                      className="w-full bg-white px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 hover:shadow-md focus:shadow-lg focus:border-transparent"
                      required={currectProduct?.isFreebie == false}
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="state" className="sr-only">
                    State
                  </label>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    placeholder="State"
                    className="w-full bg-white px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 hover:shadow-md focus:shadow-lg focus:border-transparent"
                    required={currectProduct?.isFreebie == false}
                  />
                </div>
                <div>
                  <label htmlFor="address" className="sr-only">
                    Address
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Address"
                    className="w-full bg-white px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 hover:shadow-md focus:shadow-lg focus:border-transparent"
                    required={currectProduct?.isFreebie == false}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="city" className="sr-only">
                      City
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="City"
                      className="w-full bg-white px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 hover:shadow-md focus:shadow-lg focus:border-transparent"
                      required={currectProduct?.isFreebie == false}
                    />
                  </div>
                  <div>
                    <label htmlFor="zipCode" className="sr-only">
                      Postal Code
                    </label>
                    <input
                      type="text"
                      id="zipCode"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleChange}
                      placeholder="Postal Code"
                      className="w-full bg-white px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 hover:shadow-md focus:shadow-lg focus:border-transparent"
                      required={currectProduct?.isFreebie == false}
                    />
                  </div>
                </div>
                <div className="flex items-center mt-4">
                  <input
                    type="checkbox"
                    id="saveForFuture"
                    name="saveForFuture"
                    checked={formData.saveForFuture}
                    onChange={handleChange}
                    className="bg-white h-4 w-4 text-[#763AF5] focus:ring-[#763AF5] border-gray-300 rounded"
                  />
                  <label
                    htmlFor="saveForFuture"
                    className="ml-2 block text-sm text-gray-900"
                  >
                    Save For Future Shifts?
                  </label>
                </div>
              </div>
            </div>
          )}
          <Typography className="text-left mb-6">
            Want to Share anything with the ZenShift team?
          </Typography>
          <div className="w-full max-w-2xl">
            <div>
              <label htmlFor="message" className="sr-only">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                placeholder="I trust what's arriving is exactly what I need."
                className="w-full bg-white px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 hover:shadow-md focus:shadow-lg focus:border-transparent"
              ></textarea>
            </div>
          </div>
          {currectProduct?.isFreebie && (
            <>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.6 }}
              >
                <FullWidthButton
                  color="#fff"
                  type="button" // change from 'submit' to 'button' to avoid form submission
                  onClick={handleDownload}
                  disabled={isLoading || isDownloading}
                >
                  {isDownloading
                    ? "Downloading..."
                    : "Download Digital Product"}
                </FullWidthButton>
              </motion.div>
            </>
          )}
          {!currectProduct?.isFreebie && (
            <>
              <SubTitle className="text-left my-6">Payment</SubTitle>
              <div className="w-full max-w-2xl">
                <div className="space-y-4">
                  {/* <div>
                    <label htmlFor="creditCard" className="sr-only">
                      Credit Card
                    </label>
                    <select
                      id="creditCard"
                      name="creditCard"
                      value={formData.creditCard}
                      onChange={handleChange}
                      className="w-full bg-white px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 hover:shadow-md focus:shadow-lg focus:border-transparent"
                      required
                    >
                      <option value="credit-card">Credit Card</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="cardNumber" className="sr-only">
                      Card Number
                    </label>
                    <input
                      type="text"
                      id="cardNumber"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleChange}
                      placeholder="Card Number"
                      className="w-full bg-white px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 hover:shadow-md focus:shadow-lg focus:border-transparent"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="expiryDate" className="sr-only">
                        Expiration Date
                      </label>
                      <input
                        type="date"
                        id="expiryDate"
                        name="expiryDate"
                        value={formData.expiryDate}
                        onChange={handleChange}
                        placeholder="Expiration Date"
                        className="w-full bg-white px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 hover:shadow-md focus:shadow-lg focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="cvv" className="sr-only">
                        Security Code
                      </label>
                      <input
                        type="text"
                        id="cvv"
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleChange}
                        placeholder="Security Code"
                        className="w-full bg-white px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 hover:shadow-md focus:shadow-lg focus:border-transparent"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="nameOnCard" className="sr-only">
                      Name on Energy Exchange
                    </label>
                    <input
                      type="text"
                      id="nameOnCard"
                      name="nameOnCard"
                      placeholder="Name on Energy Exchange"
                      className="w-full bg-white px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 hover:shadow-md focus:shadow-lg focus:border-transparent"
                      required
                    />
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="saveForFuturePayment"
                      name="saveForFuturePayment"
                      checked={formData.saveForFuturePayment}
                      onChange={handleChange}
                      className="bg-white h-4 w-4 text-[#763AF5] focus:ring-[#763AF5] border-gray-300 rounded"
                    />
                    <label
                      htmlFor="saveForFuturePayment"
                      className="ml-2 block text-sm text-gray-900"
                    >
                      Save For Future Shifts?
                    </label>
                  </div>
                  <p className="text-sm font-lato text-gray-600 my-4 text-left">
                    This is a secure checkout using aligned systems of trust.
                  </p> */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.6 }}
                  >
                    <FullWidthButton
                      color="#fff"
                      type="submit"
                      disabled={isLoading || isDownloading}
                    >
                      {isLoading
                        ? "Processing..."
                        : currectProduct?.additionalDetails?.shippingFormat ===
                          "Digital Product"
                          ? "Purchase Digital Product"
                          : "Complete My Shift"}
                    </FullWidthButton>
                  </motion.div>
                </div>
              </div>
            </>
          )}
        </form>

        {/* Purchase Warning Dialog */}
        <PurchaseWarningDialog
          isOpen={showPurchaseWarning}
          onClose={() => setShowPurchaseWarning(false)}
          productName={existingPurchase?.order?.productName || currectProduct?.name || ""}
          purchaseDate={existingPurchase?.order?.createdAt || ""}
          onDownload={handleDownloadFromDialog}
          isDownloading={isDownloading}
        />
      </div>
    </Elements>
  );
};

export default Checkout;
