import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom"

export default function UpdateListing() {
    const { currentUser } = useSelector((state) => state.user);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const navigate = useNavigate();
    const params = useParams();
    const [formDatas, setFormDatas] = useState({
        imageUrls: [],
        name: "",
        description: "",
        address: "",
        type: "rent",
        bedrooms: 1,
        bathrooms: 1,
        regularPrice: 50,
        discountPrice: 0,
        offer: false,
        parking: false,
        furnished: false,
    });

    const [uploadStatus, setUploadStatus] = useState("");
    const [isUploadDisabled, setUploadDisabled] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchListing = async () => {
            const listingId = params.listingId;
            const res = await fetch(`/api/listing/get/${listingId}`);
            const data = await res.json();
            console.log("Fetched Listing Data:", data); // Add a log to inspect the data
            if (data.success === false) {
                console.log(data.message);
                return;
            }
            setFormDatas({
                ...data, // Assuming data contains the imageUrls property
                imageUrls: data.imageUrls || [], // Ensure imageUrls is an array
            });
        };
        fetchListing();
    }, [params.listingId]);
    // Ensure listingId is being used properly


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
            imageUrls: formDatas.imageUrls.filter((_, i) => i !== index),
        });
    };

    const handleChange = (e) => {
        if (e.target.id === "sale" || e.target.id === "rent") {
            setFormDatas({
                ...formDatas,
                type: e.target.id,
            });
        }

        if (
            e.target.id === "parking" ||
            e.target.id === "furnished" ||
            e.target.id === "offer"
        ) {
            setFormDatas({
                ...formDatas,
                [e.target.id]: e.target.checked,
            });
        }

        if (
            e.target.type === "number" ||
            e.target.type === "text" ||
            e.target.type === "textarea"
        ) {
            setFormDatas({
                ...formDatas,
                [e.target.id]: e.target.value,
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (formDatas.imageUrls.length < 1)
                return setError("You  must upload at least one image");
            setError(false);
            if (+formDatas.regularPrice < +formDatas.discountPrice)
                return setError("Discount price must be lower than regular price");
            const res = await fetch(`/api/listing/update/${params.listingId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...formDatas,
                    userRef: currentUser._id,
                }),
            });
            const data = await res.json();
            if (data.success === false) {
                setError(data.message);
            }
            // Update the redirect URL to reflect the correct format
            navigate(`/listing/${data._id}`);
        } catch (error) {
            setError(error.message);
        }
    };


    return (
        <main className="p-3 max-w-4xl bg-gray-400 rounded-lg shadow-lg mx-auto mt-20 mb-20">
            <h1 className="text-3xl font-semibold text-center my-7">
                Update a Listing
            </h1>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
                <div className="flex flex-col gap-4 flex-1">
                    <input
                        type="text"
                        placeholder="Name"
                        className="border p-3 rounded-lg"
                        id="name"
                        maxLength="62"
                        minLength="10"
                        required
                        onChange={handleChange}
                        value={formDatas.name}
                    />
                    <input
                        type="text"
                        placeholder="Description"
                        className="border p-3 rounded-lg"
                        id="description"
                        required
                        onChange={handleChange}
                        value={formDatas.description}
                    />
                    <input
                        type="text"
                        placeholder="Address"
                        className="border p-3 rounded-lg"
                        id="address"
                        required
                        onChange={handleChange}
                        value={formDatas.address}
                    />
                    <div className="flex gap-6 flex-wrap">
                        <div className="flex gap-2 items-center">
                            <input
                                type="checkbox"
                                id="sale"
                                className="w-6 h-6"
                                onChange={handleChange}
                                checked={formDatas.type === "sale"}
                            />
                            <span>Sell</span>
                        </div>
                        <div className="flex gap-2 items-center">
                            <input
                                type="checkbox"
                                id="rent"
                                className="w-6 h-6"
                                onChange={handleChange}
                                checked={formDatas.type === "rent"}
                            />
                            <span>Rent</span>
                        </div>
                        <div className="flex gap-2 items-center">
                            <input
                                type="checkbox"
                                id="parking"
                                className="w-6 h-6"
                                onChange={handleChange}
                                checked={formDatas.parking}
                            />
                            <span>Parking spot</span>
                        </div>
                        <div className="flex gap-2 items-center">
                            <input
                                type="checkbox"
                                id="furnished"
                                className="w-6 h-6"
                                onChange={handleChange}
                                checked={formDatas.furnished}
                            />
                            <span>Furnished</span>
                        </div>
                        <div className="flex gap-2 items-center">
                            <input
                                type="checkbox"
                                id="offer"
                                className="w-6 h-6"
                                onChange={handleChange}
                                checked={formDatas.offer}
                            />
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
                                onChange={handleChange}
                                value={formDatas.bedrooms}
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
                                onChange={handleChange}
                                value={formDatas.bathrooms}
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
                                min="50"
                                max="1000000"
                                required
                                className="p-3 border border-gray-300 rounded-lg"
                                onChange={handleChange}
                                value={formDatas.regularPrice}
                            />
                            <div className="flex flex-col items-start">
                                <label htmlFor="regular-price" className="text-sm">
                                    Regular Price
                                </label>
                                <span className="text-xs">($/month)</span>
                            </div>
                        </div>
                        {formDatas.offer && (
                            <div className="flex items-center gap-2">
                                <input
                                    type="number"
                                    id="discount-price"
                                    min="0"
                                    max="1000000"
                                    required
                                    className="p-3 border border-gray-300 rounded-lg"
                                    onChange={handleChange}
                                    value={formDatas.discountPrice}
                                />
                                <div className="flex flex-col items-start">
                                    <label htmlFor="discount-price" className="text-sm">
                                        Discount Price
                                    </label>
                                    <span className="text-xs">($/month)</span>
                                </div>
                            </div>
                        )}
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
                            className={`mt-4 p-3 text-white ${uploadStatus.includes("successfully")
                                ? "bg-green-500"
                                : "bg-red-500"
                                }`}
                        >
                            {uploadStatus}
                        </div>
                    )}

                    {/* Display uploaded images as thumbnails */}
                    {/*in this line showing error*/}
                    {formDatas.imageUrls && formDatas.imageUrls.length > 0 && (
                        <div className="mt-4">
                            <h2 className="text-xl font-semibold">Uploaded Images:</h2>
                            <div className="flex gap-4">
                                {formDatas.imageUrls.map((url, index) => (
                                    <div key={index}>
                                        <img
                                            src={url}
                                            alt={`Uploaded Image ${index + 1}`}
                                            className="w-20 h-20 object-cover rounded"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveImage(index)}
                                            className="p-1 text-blue-700  hover:opacity-90"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    <button className="p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
                        Update Listing
                    </button>
                    {error && <p className="text-red-700 text-sm">{error}</p>}
                </div>
            </form>
        </main>
    );
}
