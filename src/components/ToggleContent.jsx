import FloorInformation from "./FloorInfromation.jsx";
import OfficeInformation from "./OfficeInformation.jsx";

export default function ToggleContent({ type, prop }) {

    if (type === "office") {
        return <OfficeInformation buildingInfo={prop} />
    }
    if (type === "floor") {
        return <FloorInformation floorInfo={prop} />
    }
    return <OfficeInformation buildingInfo={prop} />

}