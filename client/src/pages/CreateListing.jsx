import React, { useState } from "react";
import axios from "axios";

export default function CreateListing() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [formDatas, setFormDatas] = useState({
    imageUrls: [],
  });
  const [uploadStatus, setUploadStatus] = useState("");
  const [isUploadDisabled, setUploadDisabled] = useState(false);

  const MAX_FILES = 6;
  const handleFileChange = (e) => {
    const files = e.target.files;
    const totalFiles = formDatas.imageUrls.length + files.length;

    if (totalFiles > MAX_FILES) {
      setUploadStatus(`You can only upload up to ${MAX_FILES} files in total.`);
      setUploadDisabled(true);
      return;
    }

    setSelectedFiles(files);
    setUploadStatus("");
    setUploadDisabled(false);
  };

  const handleImageSubmit = async () => {
    try {
      const formData = new FormData();
      Array.from(selectedFiles).forEach((file) => {
        formData.append("files", file);
      });

      const res = await axios.post(
        "http://localhost:3000/uploadfiles",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const uploadedImagesUrl = res.data.fileUrls;
      setFormDatas({
        ...formDatas,
        imageUrls: [...formDatas.imageUrls, ...uploadedImagesUrl],
      });
      setUploadStatus("Images uploaded successfully!");
    } catch (error) {
      setUploadStatus("Failed to upload images.");
    }
  };

  const handleRemoveImage = (index) => {
    setFormDatas({
      ...formDatas,
      imageUrls: formDatas.imageUrls.filter((_,i)=>i!==index),
    });
  };

  return (
    <main className="p-3 max-w-4xl bg-gray-400 rounded-lg shadow-lg mx-auto mt-20 mb-20">
      <h1 className="text-3xl font-semibold text-center my-7">
        Create a Listing
      </h1>
      <form className="flex flex-col sm:flex-row gap-4">
        <div className="flex flex-col gap-4 flex-1">
          <input
            type="text"
            placeholder="Name"
            className="border p-3 rounded-lg"
            id="name"
            maxLength="62"
            minLength="10"
          />
          <input
            type="text"
            placeholder="Description"
            className="border p-3 rounded-lg"
            id="Description"
            required
          />
          <input
            type="text"
            placeholder="Address"
            className="border p-3 rounded-lg"
            id="Address"
            required
          />
          <div className="flex gap-6 flex-wrap">
            <div className="flex gap-2 items-center">
              <input type="checkbox" id="sale" className="w-6 h-6" />
              <span>Sell</span>
            </div>
            <div className="flex gap-2 items-center">
              <input type="checkbox" id="rent" className="w-6 h-6" />
              <span>Rent</span>
            </div>
            <div className="flex gap-2 items-center">
              <input type="checkbox" id="parking" className="w-6 h-6" />
              <span>Parking spot</span>
            </div>
            <div className="flex gap-2 items-center">
              <input type="checkbox" id="furnished" className="w-6 h-6" />
              <span>Furnished</span>
            </div>
            <div className="flex gap-2 items-center">
              <input type="checkbox" id="offer" className="w-6 h-6" />
              <span>Offer</span>
            </div>
          </div>

          {/* Adjusted Flexbox Layout for Alignment */}
          <div className="grid grid-cols-2 gap-6">
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="bedrooms"
                min="1"
                max="10"
                required
                className="p-3 border border-gray-300 rounded-lg"
              />
              <div className="flex flex-col items-start">
                <label htmlFor="bedrooms" className="text-sm">
                  Beds
                </label>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="bathrooms"
                min="1"
                max="10"
                required
                className="p-3 border border-gray-300 rounded-lg"
              />
              <div className="flex flex-col items-start">
                <label htmlFor="bathrooms" className="text-sm">
                  Baths
                </label>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="regular-price"
                min="1"
                max="10"
                required
                className="p-3 border border-gray-300 rounded-lg"
              />
              <div className="flex flex-col items-start">
                <label htmlFor="regular-price" className="text-sm">
                  Regular Price
                </label>
                <span className="text-xs">($/month)</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="discount-price"
                min="1"
                max="10"
                required
                className="p-3 border border-gray-300 rounded-lg"
              />
              <div className="flex flex-col items-start">
                <label htmlFor="discount-price" className="text-sm">
                  Discount Price
                </label>
                <span className="text-xs">($/month)</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col flex-1 gap-4">
          <p className="font-semibold">
            Images:
            <span className="font-normal text-gray-600 ml-2">
              The first image will be the cover (max-6)
            </span>
          </p>
          <div className="flex gap-4">
            <input
              onChange={handleFileChange}
              className="p-3 border border-gray-300 rounded w-full"
              type="file"
              id="images"
              accept="image/*"
              multiple
            />
            <button
              type="button"
              onClick={handleImageSubmit}
              disabled={isUploadDisabled}
              className="p-3 text-purple-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80"
            >
              Upload
            </button>
          </div>
          {/* Display success/error message */}
          {uploadStatus && (
            <div
              className={`mt-4 p-3 text-white ${
                uploadStatus.includes("successfully")
                  ? "bg-green-500"
                  : "bg-red-500"
              }`}
            >
              {uploadStatus}
            </div>
          )}

          {/* Display uploaded images as thumbnails */}
          {formDatas.imageUrls.length > 0 && (
            <div className="mt-4">
              <h2 className="text-xl font-semibold">Uploaded Images:</h2>
              <div className="flex gap-4">
                {formDatas.imageUrls.map((url, index) => (
                  <div>
                    <img
                      key={index}
                      src={url}
                      alt={`Uploaded Image ${index + 1}`}
                      className="w-20 h-20 object-cover rounded"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(index)}
                      className="p-1 text-red-400  hover:opacity-90"
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <button className="p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
            Create Listing
          </button>
        </div>
      </form>
    </main>
  );
}
