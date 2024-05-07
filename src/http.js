const BASE_URL = "http://13.209.42.36:4000";

export const fetchBuilding = async () => {
    try {
        const response = await fetch(`${BASE_URL}/api/v1/marker/building/building-list`);
        const resData = await response.json();

        if (resData.code === "SU") {
            return resData.buildingList;
        }
        if (resData.code === "VF" || resData.code === "DBE") {
            alert(resData.message)
        }
    } catch (error) {
        alert(error.message);
    }
    return;

}


export const fetchOffice = async (buildingId) => {
    try {
        const response = await fetch(`${BASE_URL}/api/v1/marker/building/${buildingId}`);
        const resData = await response.json();

        return resData;

    } catch (error) {
        alert(error.message);
    }
    return;
}


export const fetchPosts = async (buildingId) => {
    try {
        const response = await fetch(`${BASE_URL}/api/v1/post/building/${buildingId}`);
        const resData = await response.json();

        return resData;

    } catch (error) {
        alert(error.message);
    }
    return;
}


export const fetchFloorImgs = async (buildingId) => {
    try {
        const response = await fetch(`${BASE_URL}/api/v1/marker/${buildingId}/imagelist`);
        const resData = await response.json();

        return resData;

    } catch (error) {
        alert(error.message);
    }
    return;
}

export const searchBuilding = async (searchword) => {
    try {
        const response = await fetch(`${BASE_URL}/api/v1/marker/search-building/${searchword}`)
        const resData = await response.json();

        return resData;

    } catch (error) {
        alert(error.message);
    }
    return;
}