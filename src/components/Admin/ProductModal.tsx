import React, { useRef } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { ColorSelect } from "../ui/Select/ColorSelect";
import { SizeSelect } from "../ui/Select/SizeSelect";
import { ProductStyleSelect } from "../ui/Select/ProductStyleSelect";
import { FitSelect } from "../ui/Select/FitSelect";
import { ShiftSelect } from "../ui/Select/ShiftSelect";
import { CategorySelect } from "../ui/Select/CategorySelect";

interface ProductModalProps {
  open: boolean;
  form: any;
  isLoading: boolean;
  onClose: () => void;
  handleChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => void;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleFreebieFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // NEW
  freebieFile?: File | null; // NEW
  handleSubmit: (e: React.FormEvent) => void;
  modalTitle: string;
  submitLabel: string;
  imageSrc?: string;
  imageError?: string | null;
  handleSelectChange: (section: string, value: string) => void;
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxHeight: "calc(100vh - 40px)",
  overflow: "auto",
  width: "100%",
  maxWidth: "min(630px, calc(100vw - 32px))",
  borderRadius: "16px",
};

const ProductModal: React.FC<ProductModalProps> = ({
  open,
  form,
  isLoading,
  onClose,
  handleChange,
  handleFileChange,
  handleFreebieFileChange,
  freebieFile,
  handleSubmit,
  modalTitle,
  submitLabel,
  imageSrc,
  imageError,
  handleSelectChange,
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="child-modal-title"
      aria-describedby="child-modal-description"
      sx={{ zIndex: 10000 }}
    >
      <Box sx={{ ...style }}>
        <div className="bg-white rounded-2xl shadow-2xl p-8 w-full relative animate-slide-up ">
          <h2 className="text-2xl font-bold mb-4 text-green-700">
            {modalTitle}
          </h2>
          <form
            onSubmit={handleSubmit}
            className="space-y-4 grid grid-cols-2 gap-4"
          >
            <div className="col-span-2">
              <label className="block mb-1 font-medium">Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-green-300"
                required
              />
            </div>
            <div className="col-span-2">
              <label className="block mb-1 font-medium">Summary</label>
              <input
                type="text"
                name="summary"
                value={form.summary}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-green-300"
                required
              />
            </div>
            <div className="col-span-2">
              <label className="block mb-1 font-medium">Description</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-green-300"
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Shift</label>
              <ShiftSelect
                selectedValue={form.shift}
                onChange={(shift) => handleSelectChange("shift", shift)}
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Category</label>
              <CategorySelect
                selectedShift={form.shift}
                selectedValue={form.category}
                onChange={(category) =>
                  handleSelectChange("category", category)
                }
              />
            </div>
            <div className="col-span-2">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="isFreebie"
                  checked={form.isFreebie || false}
                  onChange={(e) => {
                    // Update isFreebie field
                    const syntheticEvent = {
                      target: { name: "isFreebie", value: e.target.checked },
                    } as any;
                    handleChange(syntheticEvent);

                    // If marking as free, also set price to 0
                    if (e.target.checked) {
                      const priceEvent = {
                        target: { name: "price", value: "0" },
                      } as any;
                      handleChange(priceEvent);
                    }
                  }}
                  className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 focus:ring-2"
                />
                <span className="font-medium">Free Product</span>
              </label>
            </div>
            {!form.isFreebie && (
              <div>
                <label className="block mb-1 font-medium">Price</label>
                <input
                  type="number"
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                  step="0.01"
                  min="0"
                  className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-green-300"
                  required={!form.isFreebie}
                />
              </div>
            )}
            {form.isFreebie && (
              <div>
                <label className="block mb-1 font-medium">Price</label>
                <div className="w-full border px-3 py-2 rounded bg-gray-100 text-gray-600 font-semibold">
                  FREE
                </div>
              </div>
            )}
            <div className="col-span-2">
              <label className="block mb-1 font-medium text-center">
                Product Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                ref={fileInputRef}
                style={{ display: "none" }}
              />
              <div
                onClick={handleImageClick}
                className="cursor-pointer flex justify-center"
              >
                {imageSrc ? (
                  <img
                    src={imageSrc}
                    alt="Preview"
                    className="w-24 h-24 object-cover rounded mt-2 border-2 border-green-300"
                  />
                ) : (
                  <div className="w-24 h-24 flex items-center justify-center bg-gray-100 rounded mt-2 border-2 border-dashed border-green-300 text-gray-400">
                    +
                  </div>
                )}
              </div>
              {imageError && (
                <div className="text-red-500 text-sm text-center mt-1">
                  {imageError}
                </div>
              )}
            </div>
            {form.additionalDetails.shippingFormat === "Digital Product" && (
              <div className="col-span-2">
                <label className="block mb-1 font-medium">
                  Attach PDF for Freebie
                </label>
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={handleFreebieFileChange}
                  className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-green-300"
                />
                {freebieFile && (
                  <p className="text-sm text-gray-600 mt-1">
                    Selected: {freebieFile.name}
                  </p>
                )}
              </div>
            )}
            <div>
              <label className="block mb-1 font-medium">Color</label>
              <ColorSelect
                selectedValue={form.frequencyInfo.color}
                onChange={(color) =>
                  handleSelectChange("frequencyInfo.color", color)
                }
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Size</label>
              <SizeSelect
                selectedValue={form.frequencyInfo.size}
                onChange={(size) =>
                  handleSelectChange("frequencyInfo.size", size)
                }
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Style</label>
              <ProductStyleSelect
                selectedValue={form.frequencyInfo.style}
                onChange={(style) =>
                  handleSelectChange("frequencyInfo.style", style)
                }
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Fit</label>
              <FitSelect
                selectedValue={form.frequencyInfo.fit}
                onChange={(fit) => handleSelectChange("frequencyInfo.fit", fit)}
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Material</label>
              <input
                type="text"
                name="additionalDetails.material"
                value={form.additionalDetails.material}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-green-300"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Care</label>
              <input
                type="text"
                name="additionalDetails.care"
                value={form.additionalDetails.care}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-green-300"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Shipping Format</label>
              <select
                name="additionalDetails.shippingFormat"
                value={form.additionalDetails.shippingFormat}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-green-300"
              >
                <option value="">Select shipping format</option>
                <option value="Physical Product">Physical Product</option>
                <option value="Digital Product">Digital Product</option>
              </select>
            </div>
            <div>
              <label className="block mb-1 font-medium">Returns</label>
              <input
                type="text"
                name="additionalDetails.returns"
                value={form.additionalDetails.returns}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-green-300"
              />
            </div>
            <div className="col-span-2 flex justify-end space-x-2 mt-4">
              <button
                type="button"
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 font-semibold"
                onClick={onClose}
                disabled={isLoading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded font-semibold hover:from-green-600 hover:to-blue-600"
                disabled={isLoading}
              >
                {isLoading ? "Saving..." : submitLabel}
              </button>
            </div>
          </form>
        </div>
      </Box>
    </Modal>
  );
};

export default ProductModal;
