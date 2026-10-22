import axiosInstance from "..";
import { AllInstitutionResponse } from "../../types/services/institutionTypes";

const institutionService = {
    getAllInstitutions: async (): Promise<AllInstitutionResponse> => {
        const res =
            await axiosInstance.get<AllInstitutionResponse>("/institutions/");
        return res.data;
    },
};

export default institutionService;
