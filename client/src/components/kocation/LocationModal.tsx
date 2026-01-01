// components/LocationModal.tsx
"use client"

import { useState, useEffect, useMemo } from "react"
import { X } from "lucide-react"

export const cities = [
    "Dhaka",
    "Rajshahi",
    "Sylhet",
    "Chattogram",
]

export const cityThanas: Record<string, string[]> = {
    Dhaka: [
        "Bangsal Thana",
        "Chawkbazar Thana",
        "Demra Thana",
        "Dhanmondi Thana",
        "Gandaria Thana",
        "Hazaribagh Thana",
        "Kadamtali Thana",
        "Kalabagan Thana",
        "Kamrangirchar Thana",
        "Khilgaon Thana",
        "Kotwali Thana",
        "Lalbagh Thana",
        "Motijheel Thana",
        "Mugda Thana",
        "New Market Thana",
        "Paltan Thana",
        "Ramna Thana",
        "Sabujbagh Thana",
        "Shahbagh Thana",
        "Shahjahanpur Thana",
        "Shyampur Thana",
        "Sutrapur Thana",
        "Jatrabari Thana",
        "Wari Thana",
    ],
    Rajshahi: ["Boalia", "Motihar", "Rajpara", "Shah Makhdum", "Chandrima ", "Kashiadanga", "Katakhali", "Belpukur", "Airport", "Karnahar", "Damkura", "Paba"],
    Sylhet: ["Sylhet Sadar", "Zindabazar", "Ambarkhana", "Subidbazar", "Shibganj"],
    Chattogram: ["Chattogram Sadar", "Pahartali", "Panchlaish", "Kotwali", "Double Mooring", "Halishahar", "Chandgaon", "Bayezid"],
}

interface LocationModalProps {
    isOpen?: boolean
    onClose?: () => void
}

export function LocationModal({ isOpen: externalIsOpen, onClose }: LocationModalProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [selectedCity, setSelectedCity] = useState("")
    const [selectedArea, setSelectedArea] = useState("")
    const [currentMap, setCurrentMap] = useState("")

    // Default Bangladesh map
    const defaultMap = `<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3652.0!2d90.4!3d23.8!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sBangladesh!5e0!3m2!1sen!2sbd" width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy"></iframe>`

    // Open modal from external prop
    useEffect(() => {
        if (externalIsOpen !== undefined) setIsOpen(externalIsOpen)
    }, [externalIsOpen])

    // Load saved location from localStorage
    useEffect(() => {
        const savedCity = localStorage.getItem("selectedCity") || ""
        const savedArea = localStorage.getItem("selectedArea") || ""
        setSelectedCity(savedCity)
        setSelectedArea(savedArea)
    }, [])

    // Update map when city/area changes
    useEffect(() => {
        if (!selectedCity) {
            setCurrentMap(defaultMap)
            return
        }

        let query = selectedCity
        if (selectedArea) query += `, ${selectedArea}`

        const mapLink = `<iframe src="https://www.google.com/maps/embed/v1/place?key=YOUR_GOOGLE_MAPS_API_KEY&q=${encodeURIComponent(
            query
        )}" width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy"></iframe>`

        setCurrentMap(mapLink)
    }, [selectedCity, selectedArea])

    const handleConfirm = () => {
        if (selectedCity && selectedArea) {
            localStorage.setItem("selectedCity", selectedCity)
            localStorage.setItem("selectedArea", selectedArea)

            window.dispatchEvent(new Event("locationChanged"))
            setIsOpen(false)
            onClose?.()
        }
    }


    useEffect(() => {
        if (!selectedCity) {
            setCurrentMap(defaultMap)
            return
        }

        let query = selectedCity
        if (selectedArea) query += `, ${selectedCity}`

        const mapLink = `<iframe 
        src="https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed"
        width="100%" 
        height="100%" 
        style="border:0;" 
        allowfullscreen="" 
        loading="lazy">
    </iframe>`

        setCurrentMap(mapLink)
    }, [selectedCity, selectedArea])


    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
            <div className="bg-white rounded-md shadow-md w-full max-w-4xl max-h-[70vh] overflow-y-auto">
                {/* Header */}
                <div className="bg-gradient-to-r from-green-600 to-green-700 px-6 py-4 text-white relative">
                    <button
                        onClick={() => { setIsOpen(false); onClose?.() }}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 rounded-full p-2 transition-colors cursor-pointer"
                    >
                        <X size={24} />
                    </button>
                    <h2 className="text-2xl font-bold text-center">Select Your Delivery Location</h2>
                    <p className="text-center text-green-100 text-sm mt-1">Choose your city and area to continue</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 p-6">
                    {/* Left Form */}
                    <div className="lg:col-span-2 space-y-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Select Your City <span className="text-red-500">*</span></label>
                            <select
                                value={selectedCity}
                                onChange={e => { setSelectedCity(e.target.value); setSelectedArea("") }}
                                className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"
                            >
                                <option value="">Select City</option>
                                {cities.map(city => <option key={city} value={city}>{city}</option>)}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Select Area <span className="text-red-500">*</span></label>
                            <select
                                value={selectedArea}
                                onChange={e => setSelectedArea(e.target.value)}
                                disabled={!selectedCity}
                                className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all disabled:bg-gray-100"
                            >
                                <option value="">Select Area</option>
                                {selectedCity && cityThanas[selectedCity]?.map(area => (
                                    <option key={area} value={area}>{area}</option>
                                ))}
                            </select>
                        </div>

                        <button
                            onClick={handleConfirm}
                            disabled={!selectedCity || !selectedArea}
                            className=" cursor-pointer w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-all"
                        >
                            Confirm Location
                        </button>
                    </div>

                    {/* Map */}
                    <div className="lg:col-span-3 h-[300px] lg:h-[400px] rounded-lg overflow-hidden border-2 border-gray-300 shadow-lg relative">
                        <div dangerouslySetInnerHTML={{ __html: currentMap }} className="w-full h-full" />
                    </div>
                </div>
            </div>
        </div>
    )
}
