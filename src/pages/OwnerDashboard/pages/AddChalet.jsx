import axios from "axios";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import imageCompression from 'browser-image-compression';
import { TiDelete } from "react-icons/ti";

export default function AddChalet() {
    const location = useLocation();
    const { packageId } = location.state || {};
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState(null);
    const [loadingImg, setLoadingImg] = useState(false);
    const [galleryUrls, setGalleryUrls] = useState([]);
    const [loadingGallery, setLoadingGallery] = useState(false);

    const [formData, setFormData] = useState({
        subscriptionID: packageId,
        name: "",
        title: "",
        description: "",
        location: {
            city: "",
            street: ""
        },
        rooms: "",
        price: "",
        facilities: [],
        reservationPolicy: [],
        img: null,
        gallery: [],
        phoneOfChalet: "",
        instagram: "",
        facebook: "",
        whatsapp: "",
        tiktok: ''
    });



    const token = localStorage.getItem('token');

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "city" || name === "street") {
            setFormData((prevData) => ({
                ...prevData,
                location: {
                    ...prevData.location,
                    [name]: value,
                },
            }));
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };

    // const handleimgChange = (e) => {
    //     const file = e.target.files[0];
    //     setFormData((prevData) => ({
    //         ...prevData,
    //         img: file,
    //     }));
    // };
    const handleImageUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        setLoadingImg(true);
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "test cloudinary");
        formData.append("cloud_name", "dhta28b63");

        try {
            const response = await axios.post(
                "https://api.cloudinary.com/v1_1/dhta28b63/image/upload",
                formData
            );
            setImageUrl(response.data.secure_url);
            console.log(response.data)
        } catch (error) {
            console.error("Error uploading image:", error);
        } finally {
            setLoadingImg(false);
        }
    };


    const handleGalleryUpload = async (event) => {
        const files = Array.from(event.target.files);
        if (files.length === 0) return;

        setLoadingGallery(true);

        const uploadPromises = files.map(async (file) => {
            const compressedFile = await imageCompression(file, {
                maxSizeMB: 1,  // تحديد الحجم الأقصى للملف (1MB في هذا المثال)
                maxWidthOrHeight: 800,  // تحديد أقصى أبعاد للصورة
            });

            const formData = new FormData();
            formData.append("file", compressedFile);
            formData.append("upload_preset", "test cloudinary");

            try {
                const response = await axios.post(
                    "https://api.cloudinary.com/v1_1/dhta28b63/image/upload",
                    formData
                );
                return response.data.secure_url;
            } catch (error) {
                console.error("Error uploading image:", error);
                return null;
            }
        });

        const uploadedImages = await Promise.all(uploadPromises);
        setGalleryUrls((prevImages) => [...prevImages, ...uploadedImages.filter(Boolean)]);
        setLoadingGallery(false);
    };





    // const handlegalleryChange = (e) => {
    //     const files = Array.from(e.target.files);
    //     setFormData((prevData) => ({
    //         ...prevData,
    //         gallery: files,
    //     }));
    // };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError(null);
        setSuccess(null);
        setLoading(true)
        try {
            let uploadedImgUrl = null;
            let uploadedGalleryUrls = [];

            // Upload main image to Cloudinary
            if (formData.img) {
                const imgFormData = new FormData();
                imgFormData.append("file", formData.img);
                imgFormData.append("upload_preset", "test cloudinary");
                imgFormData.append("cloud_name", "dhta28b63");

                const responseImg = await axios.post("https://api.cloudinary.com/v1_1/dhta28b63/image/upload", imgFormData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });


                if (responseImg.status === 200) {
                    uploadedImgUrl = responseImg.data.secure_url;
                    console.log("Uploaded main image URL:", uploadedImgUrl);
                } else {

                    throw new Error("Error uploading main image");
                }
            }

            // Upload gallery images to Cloudinary
            if (formData.gallery.length > 0) {
                const galleryUploadPromises = formData.gallery.map((image) => {
                    const galleryImageFormData = new FormData();
                    galleryImageFormData.append("file", image);
                    galleryImageFormData.append("upload_preset", "test cloudinary");
                    galleryImageFormData.append("cloud_name", "dhta28b63");

                    return axios.post("https://api.cloudinary.com/v1_1/dhta28b63/image/upload", galleryImageFormData, {
                        headers: { "Content-Type": "multipart/form-data" },
                    });
                });

                const galleryResponses = await Promise.all(galleryUploadPromises);

                uploadedGalleryUrls = galleryResponses.map((res) => {
                    if (res.status === 200) {
                        console.log("Uploaded gallery image URL:", res.data.secure_url);
                        return res.data.secure_url;
                    }
                    throw new Error("Error uploading gallery images");
                });
            }

            // Update formData with the uploaded URLs
            const updatedFormData = {
                ...formData,
                img: uploadedImgUrl,
                gallery: uploadedGalleryUrls,
            };

            console.log(updatedFormData)
            // Send the updated formData to the backend
            const response = await axios.post(`${import.meta.env.VITE_URL_BACKEND}chalet/addChalet`, updatedFormData, {
                headers: {
                    Authorization: token,
                },
            });
            console.log(response)

            if (response.data.status === "success") {
                Swal.fire({
                    title: `${response.data.message}`,
                    icon: 'success',
                    confirmButtonText: 'موافق',
                });
            } else {
                Swal.fire({
                    title: 'حدث خطأ أثناء إضافة الشاليه.',
                    text: 'يرجى المحاولة لاحقًا.',
                    icon: 'error',
                    confirmButtonText: 'موافق',
                });
            }
        } catch (error) {
            console.log(error)
            Swal.fire({
                title: `${error.response.data.message}`,
                icon: 'error',
                confirmButtonText: 'موافق',
            });
        } finally {
            setLoading(false)
        }
    };

    const handleRemoveImage = (url) => {
        setGalleryUrls((prevImages) => prevImages.filter((imageUrl) => imageUrl !== url));
    };


    return (
        <>
            {packageId != null ?
                <div className="flex flex-col md:flex-row justify-between mb-10 py-10  items-center rounded-lg shadow-lg overflow-hidden w-full">

                    <div className="w-full md:w-1/3 ps-10">

                        <h1 className="text-4xl font-bold text-[#1E293B] mb-4">أضف شاليهك الجديد</h1>
                        <p className="text-2xl text-[#718096] mb-6">
                            قم بإضافة شاليهك وابدأ في استقبال الحجوزات الآن.
                        </p>
                        {error && <p className="text-red-500 mb-4">{error}</p>}
                        {success && <p className="text-green-500 mb-4">{success}</p>}
                        <form className="space-y-4" onSubmit={handleSubmit}>
                            <div className="text-right">
                                <label htmlFor="name" className="block text-black text-xl mb-2">
                                    اسم الشاليه
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full p-2 bg-transparent border border-black rounded-lg focus:outline-[#124FB3]"
                                />
                            </div>
                            <div className="text-right">
                                <label htmlFor="title" className="block text-black text-xl mb-2">
                                    وصف مختصر
                                </label>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    className="w-full p-2 bg-transparent border border-black rounded-lg focus:outline-[#124FB3]"
                                />
                            </div>
                            <div className="text-right">
                                <label htmlFor="description" className="block text-black text-xl mb-2">
                                    الوصف
                                </label>
                                <textarea
                                    id="description"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    className="w-full p-2 bg-transparent border border-black rounded-lg focus:outline-[#124FB3]"
                                />
                            </div>
                            <div className="text-right">
                                <label htmlFor="city" className="block text-black text-xl mb-2">
                                    المدينة
                                </label>
                                <input
                                    type="text"
                                    id="city"
                                    name="city"
                                    value={formData.location.city}
                                    onChange={handleChange}
                                    className="w-full p-2 bg-transparent border border-black rounded-lg focus:outline-[#124FB3]"
                                />
                            </div>
                            <div className="text-right">
                                <label htmlFor="street" className="block text-black text-xl mb-2">
                                    الشارع
                                </label>
                                <input
                                    type="text"
                                    id="street"
                                    name="street"
                                    value={formData.location.street}
                                    onChange={handleChange}
                                    className="w-full p-2 bg-transparent border border-black rounded-lg focus:outline-[#124FB3]"
                                />
                            </div>
                            <div className="text-right">
                                <label htmlFor="rooms" className="block text-black text-xl mb-2">
                                    عدد الغرف
                                </label>
                                <input
                                    type="number"
                                    id="rooms"
                                    name="rooms"
                                    value={formData.rooms}
                                    onChange={handleChange}
                                    className="w-full p-2 bg-transparent border border-black rounded-lg focus:outline-[#124FB3]"
                                />
                            </div>
                            <div className="text-right">
                                <label htmlFor="price" className="block text-black text-xl mb-2">
                                    السعر
                                </label>
                                <input
                                    type="number"
                                    id="price"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleChange}
                                    className="w-full p-2 bg-transparent border border-black rounded-lg focus:outline-[#124FB3]"
                                />
                            </div>
                            <div className="text-right">
                                <label htmlFor="phoneOfChalet" className="block text-black text-xl mb-2">
                                    رقم الهاتف الخاص بالشاليه
                                </label>
                                <input
                                    type="number"
                                    id="phoneOfChalet"
                                    name="phoneOfChalet"
                                    value={formData.phoneOfChalet}
                                    onChange={handleChange}
                                    className="w-full p-2 bg-transparent border border-black rounded-lg focus:outline-[#124FB3]"
                                />
                            </div>
                            <div className="text-right">
                                <label htmlFor="whatsapp" className="block text-black text-xl mb-2">
                                    رقم الواتساب الخاص بالشاليه
                                </label>
                                <input
                                    type="number"
                                    id="whatsapp"
                                    name="whatsapp"
                                    value={formData.whatsapp}
                                    onChange={handleChange}
                                    className="w-full p-2 bg-transparent border border-black rounded-lg focus:outline-[#124FB3]"
                                />
                            </div>
                            <div className="text-right">
                                <label htmlFor="facebook" className="block text-black text-xl mb-2">
                                    رابط صفحة الفيس بوك
                                </label>
                                <input
                                    type="text"
                                    id="facebook"
                                    name="facebook"
                                    value={formData.location.facebook}
                                    onChange={handleChange}
                                    className="w-full p-2 bg-transparent border border-black rounded-lg focus:outline-[#124FB3]"
                                />
                            </div>
                            <div className="text-right">
                                <label htmlFor="instagram" className="block text-black text-xl mb-2">
                                    رابط صفحة الانستجرام
                                </label>
                                <input
                                    type="text"
                                    id="instagram"
                                    name="instagram"
                                    value={formData.location.instagram}
                                    onChange={handleChange}
                                    className="w-full p-2 bg-transparent border border-black rounded-lg focus:outline-[#124FB3]"
                                />
                            </div>
                            <div className="text-right">
                                <label htmlFor="tiktok" className="block text-black text-xl mb-2">
                                    رابط صفحة التيك توك
                                </label>
                                <input
                                    type="text"
                                    id="tiktok"
                                    name="tiktok"
                                    value={formData.location.tiktok}
                                    onChange={handleChange}
                                    className="w-full p-2 bg-transparent border border-black rounded-lg focus:outline-[#124FB3]"
                                />
                            </div>
                            <div className="text-right">
                                <label htmlFor="img" className="block text-black text-xl mb-2">
                                    صورة الشاليه الرئيسية
                                </label>
                                <input
                                    type="file"
                                    id="img"
                                    name="img"
                                    onChange={handleImageUpload}
                                    className="w-full p-2 bg-transparent border border-black rounded-lg focus:outline-[#124FB3]"
                                />
                                {loadingImg && <p className="text-blue-500">  جاري رفع الصورة الرئيسية...</p>}
                                {imageUrl && <img src={imageUrl} alt="Uploaded" className="mt-2 w-40" />}
                            </div>
                            <div className="text-right">
                                <label htmlFor="gallery" className="block text-black text-xl mb-2">
                                    صور المعرض
                                </label>
                                <input
                                    type="file"
                                    id="gallery"
                                    name="gallery"
                                    multiple
                                    onChange={handleGalleryUpload}
                                    className="w-full p-2 bg-transparent border border-black rounded-lg focus:outline-[#124FB3]"
                                />
                                {loadingGallery && <p className="text-blue-500"> جاري رفع صور المعرض... </p>}
                                <div className="grid grid-cols-3 gap-2">
                                    {galleryUrls.map((url, index) => (
                                        <div key={index} className="relative">
                                            <img src={url} alt={`Uploaded ${index}`} className="w-32 h-32 object-cover" />
                                            {/* علامة الإكس */}
                                            <TiDelete onClick={() => handleRemoveImage(url)}
                                                className="absolute top-0 right-0  text-black rounded-full p-1 cursor-pointer"
                                                size={40}
                                            />

                                        </div>
                                    ))}
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-gradient-to-l from-[#48BB78] to-[#1A71FF] text-white py-3 rounded-lg"
                            >
                                {loading ? (
                                    <>
                                        <p className="mx-5">
                                            جاري المعالجة
                                        </p>
                                        <div className="w-5 h-5 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
                                    </>
                                ) :
                                    "إضافة الشاليه"

                                }
                            </button>
                        </form>
                    </div >
                    <div className="hidden md:block w-full md:w-[40%]">
                        <img
                            src="/assets/images/login.png"
                            alt="Building"
                            className="w-full h-full object-contain"
                        />
                    </div>
                </div>
                :
                <div className="text-center w-full">
                    <h1 className="text-3xl">
                        برجاء اختيار باقة اولا
                    </h1>
                    <Link to="/ownerdashboard/subscription">
                        <button className="m-5 p-5 text-3xl bg-gradient-to-l from-[#48BB78] to-[#1A71FF] text-white py-3 rounded-lg">
                            ارجع الى الباقات
                        </button>
                    </Link>
                </div>
            }
        </>
    );
}
