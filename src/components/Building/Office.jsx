import ConvenInfo from "./ConvenInfo";
import OfficeInformation from "./OfficeInformation";
import Toggle from "./Toggle";
import styled from "styled-components";

export default function Office({ buildingInfo }) {
    let departmentsData;
    let convenientsData;
    if (buildingInfo.departments !== null && buildingInfo.departments.length > 0) {
        const data = JSON.parse(buildingInfo.departments);
        departmentsData = data.filter(d => d.code === 0)
        convenientsData = data.filter(d => d.code !== 0)
    }
    return (
        <>
            {departmentsData !== null && departmentsData?.length !== 0 && <OfficeInformation buildingInfo={buildingInfo} />}
            {departmentsData !== null && departmentsData?.length > 0 && (<>
                {departmentsData.map((departmentsData, index) => (
                    <Toggle key={index} type="office" prop={departmentsData}>{departmentsData.name}</Toggle>
                ))}
                <div id="spacing" style={{ width: "100%", padding: "32px 0px 0px", borderTop: "1px solid #F1F1F5" }}></div>
            </>)
            }
            {convenientsData !== null && convenientsData?.length > 0 && (<>
                <Title><h2>편의시설</h2></Title>
                {convenientsData.map((convenientData, index) => (
                    <ConvenInfo key={index} index={index} prop={convenientData}>{convenientData.name}</ConvenInfo>
                ))}
                <div id="spacing" style={{ width: "100%", padding: "32px 0px 0px" }}></div>
            </>)}
        </>
    );
}

const Title = styled.div`
padding: 24px 16px 24px 16px;

h2 {
    font-weight: 600;
    font-size: 18px;
    margin: 0;
}
`