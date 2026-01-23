import React from 'react';
import * as icons from 'lucide-react';

const DynamicIcon = ({ name, ...props }) => {
    const LucideIcon = icons[name];

    if (!LucideIcon) {
        // Return a default icon or null if the icon name is invalid
        return <icons.HelpCircle {...props} />;
    }

    return <LucideIcon {...props} />;
};

export default DynamicIcon;
