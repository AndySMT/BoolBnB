export const sectionVariants = {
    initial: { opacity: 0, y: -100 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8 },
};

export const divVariants = {
    initial: { opacity: 0, y: -100 },
    animate: { opacity: 1, y: 0 },
    transition: { delay: 0.3, duration: 0.8 },
};

export const motionVariants = {
    initial: { rotate: 0, top: "2%", left: "15%" },
    animate: { rotate: -10, top: "20%", left: "23%" },
    transition: { delay: 0.9, duration: 0.3 },
};

export const motionVariantsRight = {
    initial: { rotate: 0, top: "2%", right: "10%" },
    animate: { rotate: 3, top: "20%", right: "20%" },
    transition: { delay: 0.6, duration: 0.3 },
};

export const motionVariantsBottomLeft = {
    initial: { rotate: 0, bottom: "1%", left: "15%" },
    animate: { rotate: -7, bottom: "10%", left: "20%" },
    transition: { delay: 0.3, duration: 0.3 },
};

export const motionVariantsBottomRight = {
    initial: { rotate: 0, bottom: "1%", right: "10%" },
    animate: { rotate: 8, bottom: "10%", right: "20%" },
    transition: { delay: 0, duration: 0.3 },
};