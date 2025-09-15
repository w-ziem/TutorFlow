import React, { useEffect, useState } from "react";
import { listConfig } from "../utils/listConfig.js";
import ListHeader from "../components/Dashboard/Lists/ListHeader.jsx";
import ListCards from "../components/Dashboard/Lists/ListCards.jsx";
import axiosInstance from "../utils/axiosInstance.jsx";
import {useForm} from "../contexts/FromContext.jsx";
import ListCard from "../components/Dashboard/Lists/ListCard.jsx";
const ListPage = ({ type }) => {
    const config = listConfig[type];
    const [data, setData] = useState([]);
    const {setActiveForm, setOnSuccessRefresh} = useForm();

    const fetchData = async () => {
        try {
            const res = await axiosInstance.get(config.endpoint);
            setData(res.data);
            console.log(res.data);
        } catch (err) {
            console.error("Błąd pobierania:", err);
        }
    };

    useEffect(() => {
        fetchData();
    }, [config.endpoint]);

    return (
        <>
        <div className="absolute w-[700px] h-[500px] bg-gradient-to-r from-secondary/80 to-fuchsia-400/40 rounded-full blur-[250px] bottom-50 right-1/4"></div>
        <div className="p-30 w-[100%] h-screen">
                <div className="w-[100%] mx-auto mb-10">
                    <div className="relative px-12 py-8 rounded-3xl bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-xl border border-white/10 shadow-2xl">
                        <ListHeader
                            heading={config.heading}
                            description={config.description}
                            buttonLabel={config.addButton}
                            onAdd={() => {
                                setActiveForm(type);
                                setOnSuccessRefresh(fetchData);
                            }}
                        />
                    </div>
                </div>

                <ListCards
                    items={data}
                    renderCard={(item, index) => <ListCard key={index} item={item} type={type} />}
                />
        </div>
        </>
    );
};

export default ListPage;

