// useSocialProfile.js

import { useState } from "react";

const useSocialProfiles = (initialProfiles = []) => {
    const [socialProfiles, setSocialProfiles] = useState(initialProfiles);

    const addSocialProfile = (profile) => {
        const isProfileExist = socialProfiles.some(
            (existingProfile) => existingProfile.id === profile.id
        );

        if (!isProfileExist) {
            setSocialProfiles([...socialProfiles, profile]);
            return false;
        }

        removeSocialProfile(profile.id)
    };

    const removeSocialProfile = (id) => {
        const updatedProfiles = socialProfiles.filter(item => item.id !== id)
        setSocialProfiles(updatedProfiles);
    };

    return {
        socialProfiles,
        addSocialProfile,
    };
};

export default useSocialProfiles;
