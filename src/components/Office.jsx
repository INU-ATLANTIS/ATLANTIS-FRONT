import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import OfficeInformation from "./OfficeInformation";
import Toggle from "./Toggle";
import { fetchOffice } from "../http.js";

export default function Office({ buildingInfo }) {
    let departmentsData;

    if (buildingInfo.departments.length > 0) {
        departmentsData = JSON.parse(buildingInfo.departments);
    }
    // const [buildingInfo, setBuildingInfo] = useState(null);
    // const [error, setError] = useState(null);
    // const [departmentsInfo, setDepartmentsInfo] = useState(null);
    // const [isFetching, setIsFetching] = useState(false);

    // const buildingId = useParams().buildingId;

    // useEffect(() => {
    //     setIsFetching(true);
    //     const fetchBuildingInfo = async () => {
    //         try {
    //             const info = await fetchOffice(buildingId);
    //             if (info.code === "SU") {
    //                 if (info.departments.length !== 0) {
    //                     const departmentsData = JSON.parse(info.departments);
    //                     setDepartmentsInfo(departmentsData);
    //                 }
    //                 setBuildingInfo(info);
    //                 setIsFetching(false);
    //             } else {
    //                 setError(info.message);
    //                 setIsFetching(false);
    //             }
    //         } catch (err) {
    //             setError(err);
    //             setIsFetching(false);
    //         }
    //     };

    //     fetchBuildingInfo();
    // }, []);

    // if (error !== null) {
    //     return <div>{error}</div>
    // }

    return (
        <>
            {/* {isFetching && <p>...Loading</p>}

            {!isFetching && error !== null && buildingInfo && (
                <OfficeInformation buildingInfo={buildingInfo} />
            )}
            {!isFetching && error !== null && departmentsInfo !== null && departmentsInfo?.length > 0 && (<>
                {departmentsInfo.map((departmentInfo, index) => (
                    <Toggle key={index} type="office" prop={departmentInfo}>{departmentInfo.name}</Toggle>
                ))}
                <div id="spacing" style={{ width: "100%", padding: "32px 0px 0px", borderTop: "1px solid #F1F1F5" }}></div>
            </>)
            } */}

            {departmentsData !== null && <OfficeInformation buildingInfo={buildingInfo} />}
            {departmentsData !== null && departmentsData?.length > 0 && (<>
                {departmentsData.map((departmentsData, index) => (
                    <Toggle key={index} type="office" prop={departmentsData}>{departmentsData.name}</Toggle>
                ))}
                <div id="spacing" style={{ width: "100%", padding: "32px 0px 0px", borderTop: "1px solid #F1F1F5" }}></div>
            </>)
            }
        </>
    );
}