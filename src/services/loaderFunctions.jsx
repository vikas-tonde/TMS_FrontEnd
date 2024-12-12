import api from "./api";

export const getModules = async () => {
    try {
        console.log("Calling modules api");
        let response = await api.get("/api/admin/modules");
        return response.data.data;
    } catch (error) {
        return [];
    }
}

export const getBatches = async () => {
    try {
        console.log("Calling Batches api");
        let response = await api.get("/api/admin/batches");
        return response.data.data;
    } catch (error) {
        return [];
    }
}

export const getExam = async ({params}) => {
    const { assessmentId } = params;
    try {
        console.log("Calling Batch api");
        let response = await api.get(`/api/admin/assessments/assessment/${assessmentId}`);
        return response.data.data;
    } catch (error) {
        return {};
    }
}
export const getBatch = async ({params}) => {
    const { batchId } = params;
    console.log(batchId);
    try {
        console.log("Calling Batch api");
        let response = await api.get(`/api/admin/batch/${batchId}`);
        return response.data.data;
    } catch (error) {
        return {};
    }
}


