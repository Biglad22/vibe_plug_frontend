import axiosInstance, { useLocalStorage } from "..";
import {
    isProtectedHeader,
    SERVICE_HEADER_KEYS,
} from "../../constants/services/headers";
import { UserProfile } from "../../types/services/userType";

const userService = {
    getProfile: async () => {
        const { getDeviceId } = useLocalStorage();
        const deviceId = await getDeviceId();

        const res = await axiosInstance.get<UserProfile>("/auth/me", {
            headers: {
                ...isProtectedHeader,
                [SERVICE_HEADER_KEYS.deviceId]: deviceId,
            },
        });
        return res.data;
    },
};

export default userService;
