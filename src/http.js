const BASE_URL = "http://13.209.42.36:4000";

export const fetchBuilding = async () => {
    try {
        const response = await fetch(`${BASE_URL}/api/v1/marker/building/building-list`);
        const resData = await response.json();

        if (resData.code === "SU") {
            return resData.buildingList;
        }
    } catch (error) {
        if (error.response) {
            alert(error.response.data.message);
        } else {
            alert("오류가 발생했습니다.");
        }
    }

}


export const fetchOffice = async (buildingId) => {
    try {
        const response = await fetch(`${BASE_URL}/api/v1/marker/building/${buildingId}`);
        const resData = await response.json();

        if (resData.code === "SU") {
            return resData;
        }
    } catch (error) {
        if (error.response) {
            alert(error.response.data.message);
        } else {
            alert("오류가 발생했습니다.");
        }
    }
    return;
}


export const fetchPosts = async (buildingId) => {
    try {
        const response = await fetch(`${BASE_URL}/api/v1/post/building/${buildingId}`);
        const resData = await response.json();

        if (resData.code === "SU") {
            return resData;
        }
    } catch (error) {
        if (error.response) {
            alert(error.response.data.message);
        } else {
            alert("오류가 발생했습니다.");
        }
    }
    return;
}
