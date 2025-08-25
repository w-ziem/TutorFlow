import React, {useEffect, useState} from 'react';
import axiosInstance from "../../utils/axiosInstance.jsx";
import LessonCard from "./Lists/LessonCard.jsx";



const LatestLessons = () => {
    const [data, setData] = useState(null);

    const fetchRecentLessons = async () => {
        try{
            const response = await axiosInstance.get("/lessons/recent");
            setData(response.data);
        } catch (err) {
            console.log("Error fetching recent lessons: " + err.message);
        }
    }

    useEffect(() => {
        fetchRecentLessons();
    }, []);

    return ( <>
        <section className="group mt-8 relative flex flex-col rounded-lg border border-primary/20 p-5 hover:border-primary transition duration-300">
        <h2 className="text-2xl font-semibold text-gray-600 drop-shadow-2xl transition duration-300 group-hover:text-primary ">ostatnie lekcje</h2>
            <div className="flex gap-6 rounded-lg mt-4">
                {
                    !data || data.length === 0
                        ? <p className="text-2xl text-gray-500 font-semibold">Brak lekcji do wyświetlenia</p>
                        : data.map((item, index) => (
                            <LessonCard item={item} key={index} isMainDashboard={true} />
                        ))
                }
            </div>
        </section>
        </>
    );
};

export default LatestLessons;